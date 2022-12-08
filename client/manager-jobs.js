let vue = new Vue({
    el: '#app',
    data: {
        jobsList: [],
        filteredJobs: [],

        teamsList: [],

        loggedInUser: null,

        searchQuery: "",

        sortOption: "Order No. (ASC)",

        filterOptions: [
            {
                id: 1,
                value: 'OPEN',
                name: 'Pending allocation',
            },
            {
                id: 2,
                value: 'ALLOCATED',
                name: 'Allocated',
            },
            {
                id: 3,
                value: 'IN PROGRESS',
                name: 'In progress',
            },
            {
                id: 4,
                value: 'COMPLETED',
                name: 'Completed',
            },
            {
                id: 5,
                value: 'INVALID',
                name: 'Invalid',
            },
        ],

        selectedOptions: ['OPEN', 'ALLOCATED', 'IN PROGRESS', 'COMPLETED', 'INVALID']
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
        url: `${apiUrl}?getJobAllocationTable&sort=${vm.sortOption}&selectedOptions=${JSON.stringify(vm.selectedOptions)}`,
        headers: {
          token: localToken,
        },
      }).then((response) => {
        console.log(response.data);
        vm.jobsList = response.data;
        vm.filterJobs();
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

        filterJobs: function() {
            var vm = this;
            var q = this.searchQuery.toLowerCase();
            this.filteredJobs = this.jobsList.filter(s => String(s.JobNo).includes(q) || s.JobName.toLowerCase().includes(q));
            console.log(this.filteredJobs);
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
      },

        applyfilter(){
            this.loggedInUsername = localStorage.getItem('firstname');

            let localToken = localStorage.getItem('token');
            var vm = this;

            axios({
                method: "get",
                url: `${apiUrl}?getJobAllocationTable&sort=${vm.sortOption}&selectedOptions=${JSON.stringify(vm.selectedOptions)}`,
                headers: {
                    token: localToken,
                },
            }).then((response) => {
                console.log(response.data);
                vm.jobsList = response.data;
                vm.filterJobs();
            });
        }
    }
  });
  