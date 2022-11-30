new Vue({
    el: '#app',
    data: {
        jobsList: [{
            orderNo: 5,
            jobText: 'Handle replacement',
            postcode: 'DD1 5DL',
            jobStatus: 0
        },{
            orderNo: 55,
            jobText: 'Hinge replacement',
            postcode: 'DD1 5DL',
            jobStatus: 1
        },
        ],

        teamsList: [{
            teamNo: 1,
            teamName: 'teamName'
        },{
            teamNo: 2,
            teamName: 'teamName 2'
        }

        ]
    },
  
    created: function() {
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
  