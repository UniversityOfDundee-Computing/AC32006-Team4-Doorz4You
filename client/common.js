let localApi = 'http://localhost:81/api';
let clientPage = 'http://localhost:81/client'
let rootPage = 'http://localhost:81'
let productionApi = 'https://zeno.computing.dundee.ac.uk/2022-ac32006/team4/api';

// Change this line when deploying
let apiUrl = localApi;

function logOut() {
    localStorage.token = "";
    localStorage.clear();

    window.location.href = (`${rootPage}/index.html`);
}

function redirectStaffIfNotLoggedIn(neededPosition) {
    console.log(`Redirecting staff if position doesn't match ${neededPosition}`);

    if(localStorage.token == "" || localStorage.position.toUpperCase() != neededPosition.toUpperCase()) {
        window.location.href = (`${clientPage}/login.html`);
    }
}

function redirectCustomerIfNotLoggedIn() {
    console.log(`Redirecting customer if position doesn't match Customer`);

    if(localStorage.token == "" || localStorage.position.toUpperCase() != "CUSTOMER") {
        window.location.href = (`${clientPage}/customer-login.html`);
    }
}
