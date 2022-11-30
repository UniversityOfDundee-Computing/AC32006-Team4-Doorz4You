new Vue({
    el: '#app',
    data: {
        teamsList: [{
            teamNo: 1,
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
        ] 
    },
  
    created: function() {
    },
  
    methods: {
      testMethod: function() {
        console.log('yes');
      },

    //   changeTeamAllocation: function(job) {
    //     console.log(job);
    //   },

    //   changeJobStatus: function(job) {
    //     console.log(job);
    //   }
    }
  });
  