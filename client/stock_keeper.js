let vue = new Vue({
    el: '#app',
    data: {
         // stockList: [
         //     {
         //         "PartNo": "part_12145678914345678912411",
         //         "PartType": "White Paint",
         //         "Location": "01",
         //         "NoInStock": "50",
         //         "WarehouseLocation": "A1",
         //         "StockReserved": null
         //     },
         //     {
         //         "PartNo": "part_12345744582828282828345",
         //         "PartType": "Red Paint",
         //         "Location": "01",
         //         "NoInStock": "50",
         //         "WarehouseLocation": "A1",
         //         "StockReserved": null
         //     },
         //     {
         //         "PartNo": "part_12345678912345678912555",
         //         "PartType": "Wood Varnish",
         //         "Location": "01",
         //         "NoInStock": "50",
         //         "WarehouseLocation": "A2",
         //         "StockReserved": null
         //     },
         //     {
         //         "PartNo": "part_12345678912345678912446",
         //         "PartType": "Door Hinge (Red)",
         //         "Location": "01",
         //         "NoInStock": "40",
         //         "WarehouseLocation": "A4",
         //         "StockReserved": null
         //     },
         //     {
         //         "PartNo": "part_12345678912345678912445",
         //         "PartType": "Door Hinge (Silver)",
         //         "Location": "01",
         //         "NoInStock": "40",
         //         "WarehouseLocation": "A4",
         //         "StockReserved": null
         //     },
         //     {
         //         "PartNo": "part_12345678912345678912348",
         //         "PartType": "Screws",
         //         "Location": "01",
         //         "NoInStock": "5000",
         //         "WarehouseLocation": "A2",
         //         "StockReserved": null
         //     },
         //     {
         //         "PartNo": "part_12345678912345678912346",
         //         "PartType": "WD-40",
         //         "Location": "01",
         //         "NoInStock": "100",
         //         "WarehouseLocation": "A2",
         //         "StockReserved": null
         //     },
         //     {
         //         "PartNo": "part_123456789123456789123444",
         //         "PartType": "Door Hinge (Gold)",
         //         "Location": "01",
         //         "NoInStock": "40",
         //         "WarehouseLocation": "A4",
         //         "StockReserved": null
         //     },
         //     {
         //         "PartNo": "part_12345678912345678112708",
         //         "PartType": "Blue Paint",
         //         "Location": "01",
         //         "NoInStock": "50",
         //         "WarehouseLocation": "A1",
         //         "StockReserved": null
         //     },
         //     {
         //         "PartNo": "part_12345678912345608912274",
         //         "PartType": "Black Paint",
         //         "Location": "01",
         //         "NoInStock": "50",
         //         "WarehouseLocation": "A1",
         //         "StockReserved": null
         //     },
         //     {
         //         "PartNo": "part_12345638912345678912345",
         //         "PartType": "Door Handle (Silver)",
         //         "Location": "01",
         //         "NoInStock": "40",
         //         "WarehouseLocation": "A3",
         //         "StockReserved": null
         //     },
         //     {
         //         "PartNo": "part_12245678912345678912343",
         //         "PartType": "Door Handle (Red)",
         //         "Location": "01",
         //         "NoInStock": "40",
         //         "WarehouseLocation": "A3",
         //         "StockReserved": null
         //     },
         //     {
         //         "PartNo": "part_12245671912345678912000",
         //         "PartType": "Sandpaper",
         //         "Location": "01",
         //         "NoInStock": "500",
         //         "WarehouseLocation": "A2",
         //         "StockReserved": null
         //     },
         //     {
         //         "PartNo": "part_41495784938274149384123",
         //         "PartType": "Door Handle (Gold)",
         //         "Location": "01",
         //         "NoInStock": "40",
         //         "WarehouseLocation": "A3",
         //         "StockReserved": null
         //     }
         // ],

        stockList: [],
        filteredStockList: [],

        searchQuery: "",

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
        let localToken = localStorage.getItem('token');
        var vm = this;

        axios({
            method: "get",
            url: `${apiUrl}?getBranchStock`,
            headers: {
                token: localToken,
            },
        }).then((response) => {
            console.log(response.data);
            vm.stockList = response.data;
            vm.filterStockList();
        });
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
      },

      filterStockList: function() {
          var vm = this;
          var q = this.searchQuery.toLowerCase();
          this.filteredStockList = this.stockList.filter(s => s.PartType.toLowerCase().includes(q) || s.PartNo.toLowerCase().includes(q) || s.WarehouseLocation.toLowerCase().includes(q));
          console.log(this.filteredStockList);
      }
    }
  });
  