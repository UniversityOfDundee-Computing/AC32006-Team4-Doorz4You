new Vue({
    el: '#app',
    data: {
      form: {
        firstname: '',
        surname: '',
        address: '',
        city: '',
        postcode: '',
        telephone: '',
        email: '',
        selectedService: 0,
        nameOnCard: '',
        cardNumber: '',
        cardCvv: undefined,
        expiryMonth: undefined,
        expiryYear: undefined,
        comments: ''
      },
      selectedServiceDisplay: '',
      services: {
        0: 'Painting/Varnishing',
        1: 'Handle Replacement',
        2: 'Hinge Replacement',
        3: 'Edge Resealing'
      }
    },
  
    created: function() {
      this.selectedServiceDisplay = this.services[0];
    },
  
    methods: {
      submitOrder: function() {
        console.log(this.form);

        axios.post('https://httpbin.org/status/200', {
          form: this.form,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      },

      changeOrderedService: function(service) {
        this.form.selectedService = service;
        this.selectedServiceDisplay = this.services[service];
      }
    }
  });
  