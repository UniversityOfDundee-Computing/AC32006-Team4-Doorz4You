let vue = new Vue({
    el: '#app',
    data: {
        form: {},
        jobsList: []
    },

    created: function() {
        var vm = this;
        let localToken = localStorage.getItem('token');

        axios({
            method: "get",
            url: `${apiUrl}?getPastJobs`,
            headers: {
                token: localToken,
            },
        }).then((response) => {
            console.log(response.data);
            vm.jobsList = response.data;
        });

        axios({
            method: "get",
            url: `${apiUrl}?getCustomerDetails`,
            headers: {
                token: localToken,
            },
        }).then((response) => {
            console.log(response.data[0]);
            vm.form = response.data[0];
        });
    },

    methods: {

    }
});
