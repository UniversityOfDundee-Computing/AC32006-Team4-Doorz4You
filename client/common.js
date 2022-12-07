let localApi = 'http://localhost:81/api';
let clientPage = 'http://localhost:81/client'
let productionApi = 'placeholder';

// Change this line when deploying
let apiUrl = localApi;

function logOut() {
    localStorage.token = "";

    window.location.href = (`${clientPage}/login.html`);
}