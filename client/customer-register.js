new Vue({
  el: '#app',
  data: {
    form: {
      firstname: '',
      surname: '',
      address1: '',
      address2: '',
      address3: '',
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
      bodyFormData.set("address1", this.form.address1);
      bodyFormData.set("address2", this.form.address2);
      bodyFormData.set("address3", this.form.address3);
      bodyFormData.set("City", this.form.city);
      bodyFormData.set("Post_Code", this.form.postcode);
      bodyFormData.set("Country", this.form.country);
      bodyFormData.set("telephoneNumber", this.form.telephonenumber);
      bodyFormData.set("e-mail", this.form.emailaddress);
      bodyFormData.set("password", this.form.password);
      bodyFormData.set("confirmPassword", this.form.confirmpassword);

      axios.post(`${apiUrl}?createAccount`, bodyFormData,{
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
