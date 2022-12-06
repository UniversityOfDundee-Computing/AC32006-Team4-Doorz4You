let vue = new Vue({
    el: '#app',
    data: {
        teamsList: [],

        // teamsList: [
        //     {
        //         "name": "Team 01",
        //         "vehicle": {
        //             "id": "Dundee01",
        //             "brand": "Ford",
        //             "model": "Transit Connect"
        //         },
        //         "id": "01",
        //         "staff": [
        //             {
        //                 "StaffNo": "01"
        //                 // "FirstName": "Niamh",
        //                 // "Surname": "Gedge",
        //                 // "TeamID": "01"
        //             }
        //         ]
        //     }
        // ]

        fittersList: [{
            id: 0,
            name: 'fitter1'
        },{
            id: 1,
            name: 'fitter2'
        }
        ],

        vehiclesList: [],

        // vehiclesList: [
        //     {
        //         "VehicleNo": "Dundee01",
        //         "Brand": "Ford",
        //         "Model": "Transit Connect",
        //         "AcquisitionDate": "2008-02-27",
        //         "GreenTier": "Euro 4",
        //         "HomeLocation": "01",
        //         "Status": "Available",
        //         "Plate": "SP57 CNA"
        //     },
        //     {
        //         "VehicleNo": "Dundee02",
        //         "Brand": "Ford",
        //         "Model": "Transit Connect",
        //         "AcquisitionDate": "2008-02-27",
        //         "GreenTier": "Euro 4",
        //         "HomeLocation": "01",
        //         "Status": "Available",
        //         "Plate": "SP57 CNB"
        //     },
        //     {
        //         "VehicleNo": "Dundee03",
        //         "Brand": "Ford",
        //         "Model": "Transit Connect",
        //         "AcquisitionDate": "2008-02-27",
        //         "GreenTier": "Euro 4",
        //         "HomeLocation": "01",
        //         "Status": "Available",
        //         "Plate": "SP57 CNC"
        //     },
        //     {
        //         "VehicleNo": "Dundee04",
        //         "Brand": "Ford",
        //         "Model": "Transit Connect",
        //         "AcquisitionDate": "2008-02-27",
        //         "GreenTier": "Euro 4",
        //         "HomeLocation": "01",
        //         "Status": "Available",
        //         "Plate": "SP57 CNE"
        //     },
        //     {
        //         "VehicleNo": "Dundee05",
        //         "Brand": "Ford",
        //         "Model": "Transit Connect",
        //         "AcquisitionDate": "2008-02-27",
        //         "GreenTier": "Euro 4",
        //         "HomeLocation": "01",
        //         "Status": "Available",
        //         "Plate": "SP57 CNF"
        //     },
        //     {
        //         "VehicleNo": "Dundee06",
        //         "Brand": "Peugeot",
        //         "Model": "Expert",
        //         "AcquisitionDate": "2001-03-25",
        //         "GreenTier": "Euro 4",
        //         "HomeLocation": "01",
        //         "Status": "AwayForRepairs",
        //         "Plate": "Y626 RSA"
        //     },
        //     {
        //         "VehicleNo": "Dundee07",
        //         "Brand": "Peugeot",
        //         "Model": "Expert",
        //         "AcquisitionDate": "2001-03-25",
        //         "GreenTier": "Euro 4",
        //         "HomeLocation": "01",
        //         "Status": "AwayForRepairs",
        //         "Plate": "Y627 RSA"
        //     },
        //     {
        //         "VehicleNo": "Dundee08",
        //         "Brand": "Peugeot",
        //         "Model": "Expert",
        //         "AcquisitionDate": "2001-03-25",
        //         "GreenTier": "Euro 4",
        //         "HomeLocation": "01",
        //         "Status": "Available",
        //         "Plate": "Y628 RSA"
        //     }
        // ],

        staffList: [
            {
                "StaffNo": "-1",
                "FirstName": "Placeholder",
                "Surname": "",
                "Position": "",
                "Salary": 0,
                "EmployeeLocation": "01",
                "DateOff": null,
                "TeamID": "01"
            }
        ]
    },
  
    created: function() {
        this.loggedInUsername = localStorage.getItem('firstname');

        let localToken = localStorage.getItem('token');
        var vm = this;

        axios({
            method: "get",
            url: `${apiUrl}?getBranchStaff`,
            headers: {
                token: localToken,
            },
        }).then((response) => {
            console.log(response.data);
            vm.staffList = response.data;
        });

        let teamsList = [];

        axios({
            method: "get",
            url: `${apiUrl}?getBranchTeams`,
            headers: {
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
                }
                else if (x.staff.length == 0) {
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
            method: "get",
            url: `${apiUrl}?getBranchVehicles`,
            headers: {
                token: localToken,
            },
        }).then((response) => {
            console.log(response.data);

            vm.vehiclesList = response.data;
        });
    },
  
    methods: {
      testMethod: function() {
        console.log('yes');
      },

      createNewTeam: function() {
          let localToken = localStorage.getItem('token');

          let currentCount = this.teamsList.length;
          let newName = `Team ${currentCount+1}`;

          this.teamsList.push({
                  "name": newName,
                  "vehicle": { id: null },
                  "id": currentCount+1,
                  "staff": [{"StaffNo": null}, {"StaffNo": null}]
              });

          let bodyFormData = new FormData();
          bodyFormData.set("displayName", newName);

          axios.post(`${apiUrl}?createTeam`, bodyFormData,{
              headers: {
                  "Content-Type": "multipart/form-data",
                  "token": localToken
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
  