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
        let bodyFormData = new FormData();
        bodyFormData.set("firstName", this.form.firstname);
        bodyFormData.set("ContactNo", this.form.telephone);
        bodyFormData.set("Email", this.form.email);
        bodyFormData.set("Street", this.form.address);
        bodyFormData.set("City", this.form.city);
        bodyFormData.set("Post_Code", this.form.postcode);
        bodyFormData.set("Country", this.form.country);
        bodyFormData.set("Surname", this.form.surname);
        bodyFormData.set("customerNotes", this.form.comments);
        bodyFormData.set("jobType", this.form.selectedService);

        axios.post(`${apiUrl}?createOrder`, bodyFormData,{
          headers: {
            "Content-Type": "multipart/form-data"
          }
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
  