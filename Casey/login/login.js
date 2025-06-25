document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    // Simple validation
    if (username === '' || password === '') {
        message.textContent = 'Please fill in both fields.';
    } else {
        message.textContent = 'Login successful!'; // You can replace this with actual login logic
    }

    // Redirect to the main page after a short delay
    setTimeout(() => {
        window.location.href = '/index.html'; // Adjust the path as necessary
    }, 2000); // Redirect after 2 seconds
});
