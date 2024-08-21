document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Registration successful
            console.log('User registered:', userCredential.user);
            alert('Registration successful! Please verify your OTP.');

        })
        .catch((error) => {
            console.error('Error registering:', error);
        });
});
