var vue = new Vue({
    el: '#app',
    data: {
      form: {
        firstname: '',
        surname: '',
        address: '',
        city: '',
        postcode: '',
        country: '',
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
        0: 'Varnishing',
        1: 'Handle Replacement',
        2: 'Hinge Replacement',
        3: 'Edge Resealing',
      },
      prices: {
        0: '£59',
        1: '£29',
        2: '£99',
        3: '£79',
      },
      loggedInUsername: '',
      customerNo: '',
    },
  
    created: function() {
      this.selectedServiceDisplay = this.services[0];
      this.selectedServicePrice = this.prices[0];

      let localToken = localStorage.getItem('token');

      this.loggedInUsername = localStorage.getItem('firstname');

      redirectCustomerIfNotLoggedIn();

      var vm = this;

      axios({
        method: "get",
        url: `${apiUrl}?getCustomerDetails`,
        headers: {
          token: localToken,
        },
      }).then((response) => {
        console.log(response.data[0]);

        var response = response.data[0];

        vm.form.firstname = response.FirstName;
        vm.form.surname = response.Surname;
        vm.form.address = response.Street;
        vm.form.city = response.City;
        vm.form.postcode = response.PostCode;
        vm.form.country = response.Country;
        vm.form.telephone = response.ContactNo;
        vm.form.email = response.Email;

        vm.customerNo = response.CustomerNo;

        // vm.form.selectedService = 0;

        var form = document.getElementById("detailsform");
        var elements = form.elements;
        for (var i = 0, len = elements.length; i < len; ++i) {
          elements[i].disabled = true;
        }
      });
    },
  
    methods: {
      submitOrder: function() {
        console.log(this.form);

        let bodyFormData = new FormData();

        var element1 = document.getElementById("inputFirstName");
        if (element1.disabled) {
          bodyFormData.set("customerNo", this.customerNo);
          bodyFormData.set("jobType", this.form.selectedService);
          bodyFormData.set("customerNotes", this.form.comments);
        }
        else {
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
        }

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
        this.selectedServicePrice = this.prices[service];
      }
    }
  });
  