// Login function that initiates when clicking login buttons //
// Fetch data and see if there is an email and password that match and then if "ok" send to homepage //

const loginForm = async (event) => {
    
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in.');
        }
    }
};

// Same as login but also includes username and creator to add to api data //
// Creator is for future functionality where we can give permissions if creator is checked in sign-up form //

const signupForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const creator = document.querySelector('#creator');

    const isCreator = creator.checked;

    if (email && password && username) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ email, password, username, isCreator }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginForm);
document.querySelector('.signup-form').addEventListener('submit', signupForm);