let vue = new Vue({
    el: '#app', data: {
        teamsList: [], fittersList: [], vehiclesList: [], staffList: [], editStaffModal: {}, activeStaff: {
            FirstName:"",
            LastName:"",
            Salary:0,
            Position:""
        }
    },

    created: function () {
        this.loggedInUsername = localStorage.getItem('firstname');

        let localToken = localStorage.getItem('token');
        var vm = this;

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
            method: "get", url: `${apiUrl}?getBranchTeams`, headers: {
                token: localToken,
            },
        }).then((response) => {
            console.log(response.data);
            teamsList = response.data;

            teamsList.forEach(x => {
                console.log(x.staff);
                if (x.staff.length == 1) {
                    x.staff.push({
                        "StaffNo": null
                    });
                } else if (x.staff.length == 0) {
                    x.staff.push({
                        "StaffNo": null
                    });
                    x.staff.push({
                        "StaffNo": null
                    });
                }
            });

            vm.teamsList = teamsList;
        });

        axios({
            method: "get", url: `${apiUrl}?getBranchVehicles`, headers: {
                token: localToken,
            },
        }).then((response) => {
            console.log(response.data);

            vm.vehiclesList = response.data;
        });
    },

    methods: {
        testMethod: function () {
            console.log('yes');
        }, editStaff: function (staffNo) {
            this.activeStaff = this.staffList[staffNo];
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

            axios.post(`${apiUrl}?createTeam`, bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data", "token": localToken
                }
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
});
  