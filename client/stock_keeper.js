new Vue({
    el: '#app',
    data: {
         stockList: [{
            part: 'Door Handle',
            PartIdNumber: '12345',
            amount: '25',
            location: 'A7',
            reserved: '0',
            actions: ''
        },
        ],

        stockPreparationTeam1: [{
          required: 'Silver Door Handle',
          quantity: '1',
          collectionStatus: 1
       },{
        required: 'Screws',
        quantity: '10',
        collectionStatus: 0
       },{
        required: 'Blue Paint Tub',
        quantity: '1',
        collectionStatus: 1
       },{
        required: 'Hinges',
        quantity: '4',
        collectionStatus: 0
       },{
        required: 'Sealant',
        quantity: '3',
        collectionStatus: 1
       },
      ],

      stockPreparationTeam2: [{
        required: 'Wood Glue',
        quantity: '1',
        collectionStatus: 0
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

      changeTeamAllocation: function(stock) {
        console.log(stock);
      },

      changeJobStatus: function(stock) {
        console.log(stock);
      }
    }
  });
  