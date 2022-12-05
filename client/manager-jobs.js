new Vue({
    el: '#app',
    data: {
        jobsList: [
          {
              "CustomerNo": "cust_48392847586958473829222",
              "PostCode": "Placeholder",
              "TeamName": "Team 01",
              "JobNo": -1,
              "Status": "OPEN",
              "JobType": "2",
              "JobName": "Placeholder, fetching data...",
              "AllocatedTeam": null,
              "Location": "01"
          }
      ],

        teamsList: [{
            teamNo: '01',
            teamName: 'teamName'
        },{
            teamNo: '02',
            teamName: 'teamName 2'
        }

        ]
    },
  
    created: function() {

      let localToken = localStorage.getItem('token');
      var vm = this;

      axios({
        method: "get",
        url: `${apiUrl}?getJobAllocationTable`,
        headers: {
          token: localToken,
        },
      }).then((response) => {
        console.log(response.data);
        vm.jobsList = response.data;
      });
    },
  
    methods: {
      testMethod: function() {
        console.log('yes');
      },

      changeTeamAllocation: function(job) {
        console.log(job);
        this.sendEditsToApi(job);
      },

      changeJobStatus: function(job) {
        console.log(job);
        this.sendEditsToApi(job);
      },

      sendEditsToApi: function(job) {

        let localToken = localStorage.getItem('token');

        let bodyFormData = new FormData();
        bodyFormData.set("JobNo", job.JobNo);
        bodyFormData.set("status", job.Status);
        bodyFormData.set("team", job.AllocatedTeam);

        axios.post(`${apiUrl}?updateJobAllocationTable`, bodyFormData,{
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
  