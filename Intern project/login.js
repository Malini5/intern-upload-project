document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
           
            console.log('User logged in:', userCredential.user);
            window.location.href = 'upload.html'; // Redirect to upload page
        })
        .catch((error) => {
            console.error('Error logging in:', error);
        });
});
