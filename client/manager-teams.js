new Vue({
    el: '#app',
    data: {
        teamsList: [{
            TeamID: 1,
            allocatedfitterOneId: 0,
            allocatedfitterTwoId: 1,
            allocatedvehicleId: 0,
        },{
            teamNo: 2,
            allocatedfitterOneId: 1,
            allocatedfitterTwoId: 0,
            allocatedvehicleId: 1,
        }
        ],

        fittersList: [{
            id: 0,
            name: 'fitter1'
        },{
            id: 1,
            name: 'fitter2'
        }
        ],

        vehiclesList: [{
            id: 0,
            name: 'vehicle 1'
        },{
            id: 1,
            name: 'vehicle 2'
        }
        ],

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
    },
  
    methods: {
      testMethod: function() {
        console.log('yes');
      }
    }
  });
  