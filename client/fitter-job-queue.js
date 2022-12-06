var vue = new Vue({
    el: '#app',
    data: {
        // jobsList: [
        //     {
        //         "CustomerNo": "CUST_63861ca3515366.28040455",
        //         "PostCode": "DD1 1PJ",
        //         "TeamName": "Team 01",
        //         "JobNo": 2,
        //         "Status": "OPEN",
        //         "StartDate": "0000-00-00 00:00:00",
        //         "EndDate": null,
        //         "JobType": "1",
        //         "JobName": "Door Handle Replacement",
        //         "AllocatedTeam": "01",
        //         "Location": "01"
        //     },
        //     {
        //         "CustomerNo": "cust_48392847586958473829222",
        //         "PostCode": "DD21RQ",
        //         "TeamName": "Team 01",
        //         "JobNo": 4,
        //         "Status": "ALLOCATED",
        //         "StartDate": "2017-07-23 13:10:11",
        //         "EndDate": null,
        //         "JobType": "2",
        //         "JobName": "Door Hinge Replacement",
        //         "AllocatedTeam": "01",
        //         "Location": "01"
        //     }
        // ],

        jobsList: []

    },
  
    created: function() {
        this.loggedInUsername = localStorage.getItem('firstname');
        let localToken = localStorage.getItem('token');
        var vm = this;

        axios({
            method: "get",
            url: `${apiUrl}?getTeamJobs`,
            headers: {
                token: localToken,
            },
        }).then((response) => {
            console.log(response.data);
            console.log(Object.values(response.data)[0]);
            vm.jobsList = Object.values(response.data)[0].jobs;
            // console.log(response.data[0]);
        });
    },
  
    methods: {
      testMethod: function() {
        console.log('yes');
      },

      changeTeamAllocation: function(job) {
        console.log(job);
      },

      changeJobStatus: function(job) {
        console.log(job);
      }
    }
  });
  