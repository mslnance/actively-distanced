async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    //   const takenUsername = document.querySelector('#taken');

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/login');
        } else {
            // get all users and compare username
            alert(response.statusText + " your username is taken, please try a new username.");
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);