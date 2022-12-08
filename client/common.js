let localApi = 'http://localhost:81/api';
let clientPage = 'http://localhost:81/client'
let productionApi = 'https://zeno.computing.dundee.ac.uk/2022-ac32006/team4/api';

// Change this line when deploying
let apiUrl = localApi;

function logOut() {
    localStorage.token = "";

    window.location.href = (`${clientPage}/login.html`);
}