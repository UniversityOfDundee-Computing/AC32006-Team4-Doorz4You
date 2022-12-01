new Vue({
    el: '#app',
    data: {
      form: {
        username: '',
        password: '',
      },
      loginFail: false,
      loginSuccess: false
    },
  
    created: function() {
    },
  
    methods: {
      login: function() {
        console.log(this.form);
        
        var vm = this;
        vm.loginFail = false;

        let bodyFormData = new FormData();
        bodyFormData.set("username", this.form.username);
        bodyFormData.set("password", this.form.password);


        axios.post(`${apiUrl}?userConnect`, bodyFormData,{
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function (response) {
          vm.loginSuccess = true;

          console.log(response);
          console.log(response.data.token);

          localStorage.token = response.data.token;
          localStorage.position = response.data.position;
          localStorage.firstname = response.data.firstname;
        })
        .catch(function (error) {
          console.log(error);
          vm.loginFail = true;
        });
      }
    }
  });
  