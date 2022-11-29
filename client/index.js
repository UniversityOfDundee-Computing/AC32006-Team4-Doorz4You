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

        axios.post(`${apiUrl}?createOrder`, {
          form: this.form,
          firstName: this.form.firstname,
          ContactNo: this.form.telephone,
          Email: this.form.email,
          Street: this.form.address,
          City: this.form.city,
          Post_Code: this.form.postcode,
          Country: this.form.country,
          Surname: this.form.surname,
          customerNotes: this.form.comments,
          jobType: this.form.selectedService

          //  $_POST['Email'], $_POST['Street'], $_POST['City'], $_POST['Post_Code'], $_POST['Country'], $_POST['Surname']]
          //  $_POST['customerNotes']
          // $_POST['jobType']
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
  