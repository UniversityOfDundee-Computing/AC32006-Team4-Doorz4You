let vue = new Vue({
    el: '#app',
    data: {
        jobsList: [],

        teamsList: [],

        loggedInUser: null
    },
  
    created: function() {

      this.loggedInUsername = localStorage.getItem('firstname');

      let localToken = localStorage.getItem('token');
      var vm = this;

        axios({
            method: "get",
            url: `${apiUrl}?getBranchTeams`,
            headers: {
                token: localToken,
            },
        }).then((response) => {
            console.log(response.data);
            vm.teamsList = response.data;
        });

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
          if (job.AllocatedTeam != "null")
            job.Status = "ALLOCATED";
          else if (job.Status != "INVALID")
              job.Status = "OPEN";

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
  