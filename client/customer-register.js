new Vue({
  el: '#app',
  data: {
    form: {
      firstname: '',
      surname: '',
      address1: '',
      city: '',
      postcode: '',
      country: '',
      telephone: '',
      email: '',
      password: '',
      confirmpassword: '',
    }
  },

  methods: {
    submitDetails: function() {
      console.log(this.form);
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

      axios.post(`${apiUrl}?registerCustomer`, bodyFormData,{
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
  }
});
