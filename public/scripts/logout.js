// Create a function "logout" that runs asynchronously
// Fetches the /api/users/logout route
// Creates post method that is sending JSON data
// If "response" or POST is "ok" it will logout and send us to the home page

const logout = async () => {

    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log out.');
    }
};

// On click of logout button, it will initiate a logout //

document.querySelector('#logout').addEventListener('click', logout);