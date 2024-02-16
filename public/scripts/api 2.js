// let firstName = document.getElementById('firstName');
// let lastName = document.getElementById('lastName');
// let email = document.getElementById('email');
// let username = document.getElementById('username');
// let password = document.getElementById('password');
// let phoneNumber = document.getElementById('phoneNumber');
// let resultTotal = document.getElementById('resultTotal');

async function getApi(results) {
    //The documentation 
    // https://randomuser.me/documentation
    const requestUrl = `https://randomuser.me/api/?results=${results}`;

    const response = await fetch(requestUrl);

    const data = await response.json();
    console.log(data);
}


getApi(10);
