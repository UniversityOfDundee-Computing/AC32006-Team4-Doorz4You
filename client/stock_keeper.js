let vue = new Vue({
    el: '#app',
    data: {
        stockList: [],
        filteredStockList: [],
        stockPreparationList: [],
        active: {
            team: "",
            jobs: []
        },
        searchQuery: "",
        confirmModal: {},
        setStockModal: {},
        currentStock: 0,
        activePart: ""
    },
  
    created: function() {
        this.initMethod();
    },
  
    methods: {
        initMethod: function () {
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
            axios({
                method: "get",
                url: `${apiUrl}?getTeamStockItems`,
                headers: {
                    token: localToken,
                },
            }).then((response) => {
                vm.stockPreparationList = response.data;
            });
        },
        updateStock: function(part, currStock) {
            this.activePart = part;
            this.currentStock = currStock;
            this.setStockModal = new bootstrap.Modal('#setStockModal', {});
            this.setStockModal.show();
        },

      changeTeamAllocation: function(stock) {
        console.log(stock);
      },
        filterStockList: function() {
            var vm = this;
            var q = this.searchQuery.toLowerCase();
            this.filteredStockList = this.stockList.filter(s => s.PartType.toLowerCase().includes(q) || s.PartNo.toLowerCase().includes(q) || s.WarehouseLocation.toLowerCase().includes(q));
            console.log(this.filteredStockList);
        },

      changeJobStatus: function(stock) {
        console.log(stock);
      },
        markCollected: function(team, jobs) {
            this.active.team = team;
            this.active.jobs = jobs;
            this.confirmModal = new bootstrap.Modal('#confirmModal', {});
            this.confirmModal.show();
        },
        ackStock: function () {
            var vm = this;
            let bodyFormData = new FormData();
            bodyFormData.set("part", this.activePart);
            bodyFormData.set("quantity", this.currentStock);
            let localToken = localStorage.getItem('token');

            axios.post(`${apiUrl}?setStockState`, bodyFormData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    token: localToken,
                }
            }).then(()=>{
                vm.initMethod();
                vm.setStockModal.hide();
            })
        },
        ackCollected: function () {
            var vm = this;
            let bodyFormData = new FormData();
            bodyFormData.set("team", this.active.team);
            bodyFormData.set("jobs", JSON.stringify(this.active.jobs));
            let localToken = localStorage.getItem('token');

            axios.post(`${apiUrl}?markCollected`, bodyFormData,{
                headers: {
                    "Content-Type": "multipart/form-data",
                    token: localToken,
                }
            }).then(()=>{
                axios({
                    method: "get",
                    url: `${apiUrl}?getTeamStockItems`,
                    headers: {
                        token: localToken,
                    },
                }).then((response) => {
                    vm.stockPreparationList = response.data;
                    vm.initMethod();
                    vm.confirmModal.hide();
                });
            })
        }
    }
  });
  