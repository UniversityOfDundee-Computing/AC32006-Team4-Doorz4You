window.addEventListener("pageshow", function() {
    console.log('page shown');
    redirectCustomerIfNotLoggedIn();
}, false);

let vue = new Vue({
    el: '#app',
    data: {
        form: {},
        jobsList: [],
        loggedInUsername: ''
    },

    created: function() {
        var vm = this;
        let localToken = localStorage.getItem('token');

        this.loggedInUsername = localStorage.getItem('firstname');

        redirectCustomerIfNotLoggedIn();

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
