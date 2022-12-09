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

          vm.redirect(response.data.position);
        })
        .catch(function (error) {
          console.log(error);
          vm.loginFail = true;
        });
      },

      redirect: function(position) {
        if (position.toUpperCase() == "MANAGER" || position.toUpperCase() == "CEO")
          window.location.href = (`${clientPage}/manager-jobs.html`);
        else if (position.toUpperCase() == "FITTER")
          window.location.href = (`${clientPage}/fitter-job-queue.html`);
        else if (position.toUpperCase() == "STOCK KEEPER")
          window.location.href = (`${clientPage}/stock-keeper.html`);
        // todo: position: customer
      }
    }
  });
  