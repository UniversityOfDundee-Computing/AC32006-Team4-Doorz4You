new Vue({
    el: '#app',
    data: {
        jobsList: [{
           
            jobText: 'Handle replacement',
            address : 'DD2 3NQ',
            customerComment : '',
            jobStatus: 1
        },{
            
            jobText: 'Hinge replacement',
            address : 'DD1 5DL',
            customerComment : '',
            jobStatus: 1
        },{
            
            jobText: 'Varnishing',
            address : 'DD6 4DL',
            customerComment : 'Make it slick',
            jobStatus: 1
        },{
            
            jobText: 'Door Re-Painting',
            address : 'DD1 5DL',
            customerComment : 'Would like green paint',
            jobStatus: 0
        },
        {
            
            jobText: 'Door Re-Sealing',
            address : 'DD4 6EP',
            customerComment : '',
            jobStatus: 0
        },{
            
            jobText: 'Door Re-Painting',
            address : 'DD5 2GP',
            customerComment : 'Red paint',
            jobStatus: 2
        },
        ],

    },
  
    created: function() {
        this.loggedInUsername = localStorage.getItem('firstname');
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
  