let vue = new Vue({
    el: '#app', data: {
        teamsList: [], fittersList: [], vehiclesList: [], availableVehicles:[], staffList: [], editStaffModal: {},
        editPasswordModal: {}, activeStaff: {
            FirstName:"",
            surname:"",
            Salary:0,
            Position:"",
            PW:"",
            ConPW:""
        },
        deleteRecordDta: {
            type:"",
            active:""
        }
    },

    created: function () {
        this.initMethod();
    },

    methods: {
        initMethod: function () {
            this.loggedInUsername = localStorage.getItem('firstname');

            let localToken = localStorage.getItem('token');
            var vm = this;
            vm.staffList = [];
            vm.teamsList = [];
            vm.availableVehicles = [];

            axios({
                method: "get", url: `${apiUrl}?getBranchStaff`, headers: {
                    token: localToken,
                },
            }).then((response) => {
                console.log(response.data);
                vm.staffList = response.data;
            });

            let teamsList = [];

            axios({
                method: "get", url: `${apiUrl}?getBranchVehicles`, headers: {
                    token: localToken,
                },
            }).then((response) => {
                console.log(response.data);

                vm.vehiclesList = response.data;
                vm.availableVehicles = structuredClone(vm.vehiclesList);
                axios({
                    method: "get", url: `${apiUrl}?getBranchTeams`, headers: {
                        token: localToken,
                    },
                }).then((response) => {
                    console.log(response.data);
                    teamsList = response.data;

                    teamsList.forEach(x => {
                        console.log(x.staff);
                        if (x.staff.length === 1) {
                            x.staff.push({
                                "StaffNo": null
                            });
                        } else if (x.staff.length === 0) {
                            x.staff.push({
                                "StaffNo": null
                            });
                            x.staff.push({
                                "StaffNo": null
                            });
                        }
                        vm.availableVehicles.forEach((v,index)=>{
                            if (v!==undefined && v.VehicleNo === x.vehicle.id){
                                vm.availableVehicles[index] = undefined;
                            }

                        })
                    });

                    vm.teamsList = teamsList;
                });
            });
        },
        editStaff: function (staffNo) {
            this.activeStaff = structuredClone(this.staffList[staffNo]);
            this.editStaffModal = new bootstrap.Modal('#editStaffModal', {});
            this.editStaffModal.show();
        },
        createStaff: function () {
            this.activeStaff = {
                FirstName:"",
                surname:"",
                Salary:0,
                Position:"",
                StaffNo: "_NEW_",
                PW:"",
                ConPW:""
            };
            this.editStaffModal = new bootstrap.Modal('#editStaffModal', {});
            this.editStaffModal.show();
        },
        createNewTeam: function () {
            let localToken = localStorage.getItem('token');

            let currentCount = this.teamsList.length;
            let newName = `Team ${currentCount + 1}`;

            this.teamsList.push({
                "name": newName,
                "vehicle": {id: null},
                "id": currentCount + 1,
                "staff": [{"StaffNo": null}, {"StaffNo": null}]
            });

            let bodyFormData = new FormData();
            bodyFormData.set("displayName", newName);
            let vm = this;

            axios.post(`${apiUrl}?createTeam`, bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data", "token": localToken
                }
            })
                .then(function (response) {
                    console.log(response);
                    vm.initMethod();
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ackChanges: function () {
            let localToken = localStorage.getItem('token');
            let vm = this;
            if (this.activeStaff.StaffNo === "_NEW_") {
                this.editPasswordModal = new bootstrap.Modal('#editPasswordModal', {});
                this.editPasswordModal.show();
            } else {
                let bodyFormData = new FormData();
                bodyFormData.set("fName", this.activeStaff.FirstName);
                bodyFormData.set("lName", this.activeStaff.Surname);
                bodyFormData.set("position", this.activeStaff.Position);
                bodyFormData.set("salary", this.activeStaff.Salary);
                bodyFormData.set("staffID", this.activeStaff.StaffNo);
                axios.post(`${apiUrl}?updateBranchStaff`, bodyFormData, {
                    headers: {
                        "Content-Type": "multipart/form-data", "token": localToken
                    }
                })
                .then(function (response) {
                    console.log(response);
                    vm.initMethod();
                    vm.editStaffModal.hide();
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
        ackPassword: function () {
            let localToken = localStorage.getItem('token');
            let vm = this;
            let bodyFormData = new FormData();
            bodyFormData.set("fName", this.activeStaff.FirstName);
            bodyFormData.set("lName", this.activeStaff.Surname);
            bodyFormData.set("position", this.activeStaff.Position);
            bodyFormData.set("salary", this.activeStaff.Salary);
            bodyFormData.set("password", this.activeStaff.Password);
            axios.post(`${apiUrl}?createBranchStaff`, bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data", "token": localToken
                }
            })
                .then(function (response) {
                    console.log(response);
                    vm.initMethod();
                    vm.editPasswordModal.hide();
                    vm.editStaffModal.hide();
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ackDelete: function () {
            let localToken = localStorage.getItem('token');
            let vm = this;
            let bodyFormData = new FormData();
            if (this.deleteRecordDta.type === "STAFF") {
                bodyFormData.set("staffID", this.deleteRecordDta.active);
                axios.post(`${apiUrl}?deleteBranchStaff`, bodyFormData, {
                    headers: {
                        "Content-Type": "multipart/form-data", "token": localToken
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        vm.initMethod();
                        vm.confirmModal.hide();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                bodyFormData.set("team", this.deleteRecordDta.active);
                axios.post(`${apiUrl}?deleteTeam`, bodyFormData, {
                    headers: {
                        "Content-Type": "multipart/form-data", "token": localToken
                    }
                })
                    .then(function (response) {
                        console.log(response);
                        vm.initMethod();
                        vm.confirmModal.hide();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        deleteRecord: function (type, record) {
            this.deleteRecordDta.type = type;
            this.deleteRecordDta.active = record;
            this.confirmModal = new bootstrap.Modal('#confirmModal', {});
            this.confirmModal.show();
        },
        updateTeam: function (team) {
            let localToken = localStorage.getItem('token');
            let vm = this;
            let teamDta = {};
            let teamMembers = [];
            this.teamsList.forEach((t)=>{
                if (t.id === team) {
                    teamDta = t;
                    t.staff.forEach((s)=>{
                        if (s.StaffNo !== null)
                            teamMembers.push(s.StaffNo);
                    })
                }
            });
            let bodyFormData = new FormData();
            bodyFormData.set("team", team);
            bodyFormData.set("vehicle", teamDta.vehicle.id);
            bodyFormData.set("teamMembers", JSON.stringify(teamMembers));
            axios.post(`${apiUrl}?updateTeamVehicleAllocationTable`, bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data", "token": localToken
                }
            })
                .then(function (response) {
                    console.log(response);
                    vm.initMethod();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
});
  