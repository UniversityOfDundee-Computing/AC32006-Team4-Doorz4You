var vue = new Vue({
    el: '#app',
    data: {
        jobsList: [],
        teamName: "",
        teamVehicle: "",
        teamMembers: ""

    },
  
    created: function() {
        this.loggedInUsername = localStorage.getItem('firstname');
        let localToken = localStorage.getItem('token');
        var vm = this;

        redirectStaffIfNotLoggedIn('Fitter');

        axios({
            method: "get",
            url: `${apiUrl}?getTeamJobs`,
            headers: {
                token: localToken,
            },
        }).then((response) => {
            console.log(response.data);
            console.log(Object.values(response.data)[0]);
            let details = Object.values(response.data)[0];
            vm.jobsList = details.jobs;
            vm.teamName = details.team.name;
            if (details.team.vehicle != null)
                vm.teamVehicle = `${details.team.vehicle.id} (${details.team.vehicle.model})`;
            let teamMembers = details.team.members;
            vm.teamMembers = `${teamMembers[0].FirstName} ${teamMembers[0].Surname}`;
            if (teamMembers.length === 2)
                vm.teamMembers += `, ${teamMembers[1].FirstName} ${teamMembers[1].Surname}`;
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

          let localToken = localStorage.getItem('token');

          let bodyFormData = new FormData();
          bodyFormData.set("JobNo", job.JobNo);
          bodyFormData.set("status", job.Status);

          console.log(bodyFormData);

          axios.post(`${apiUrl}?updateFitterViewStatus`, bodyFormData,{
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
  