new Vue({
  el: '#app',
  data: {
    form: {
      firstname: '',
      surname: '',
      address1: '',
      city: '',
      postcode: '',
      country: 'GB',
      telephone: '',
      email: '',
      password: '',
      confirmpassword: '',
    },
    loginFail: false,
    loginSuccess: false
  },

  methods: {
    submitDetails: function() {

      var vm = this;
      vm.loginFail = false;

      let validate = (this.form.firstname === '')
      validate |= (this.form.surname === '')
      validate |= (this.form.address1 === '')
      validate |= (this.form.city === '')
      validate |= (this.form.postcode === '')
      validate |= (this.form.country === '')
      validate |= (this.form.telephonenumber === '')
      validate |= (this.form.emailaddress === '')
      validate |= (this.form.password === '')

      if (validate)
        alert("Ensure all the fields are completed!");
      else {
        let bodyFormData = new FormData();
        bodyFormData.set("firstName", this.form.firstname);
        bodyFormData.set("Surname", this.form.surname);
        bodyFormData.set("Street", this.form.address1);
        bodyFormData.set("City", this.form.city);
        bodyFormData.set("Post_Code", this.form.postcode);
        bodyFormData.set("Country", this.form.country);
        bodyFormData.set("ContactNo", this.form.telephonenumber);
        bodyFormData.set("Email", this.form.emailaddress);
        bodyFormData.set("password", this.form.password);

        axios.post(`${apiUrl}?registerCustomer`, bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
            .then(function (response) {
              console.log(response);
              vm.loginSuccess = true;

              window.location.href = (`${clientPage}/customer-login.html`);
            })
            .catch(function (error) {
              console.log(error);
              vm.loginFail = true;
            });
      }
    },
  }
});
