let vue = new Vue({
    el: '#app',
    data: {
        form: {
            firstname: 'Loa',
            surname: 'Sawson',
            address: 'Sawson 32',
            city: 'Dundee',
            postcode: 'DD1 5DL',
            country: 'GB',
            telephone: '07443964444',
            email: 'andy@sawson.me',
        },
        jobsList: [{
            JobNo: -1,
            JobName: 'placeholder',
            Date: 'place',
            Status: 'placehodler'
        }
        ]
    },

    created: function() {
    },

    methods: {

    }
});
