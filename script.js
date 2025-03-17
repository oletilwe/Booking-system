document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const roleSelect = document.getElementById('role');
    const signupButton = document.getElementById('signupButton');
    const loginButton = document.getElementById('loginButton');
    const messageDisplay = document.getElementById('message');

    signupButton.addEventListener('click', function() {
        const email = emailInput.value;
        const password = passwordInput.value;
        const role = roleSelect.value;

        if (!email || !password) {
            messageDisplay.textContent = "Please fill in all fields.";
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || {};

        if (users[email] && users[email].role === role) {
            messageDisplay.textContent = "Email already registered for this role.";
            return;
        }

        users[email] = { password: password, role: role };
        localStorage.setItem('users', JSON.stringify(users));
        messageDisplay.textContent = "Signup successful!";
        emailInput.value = "";
        passwordInput.value = "";
    });

    loginButton.addEventListener('click', function() {
        const email = emailInput.value;
        const password = passwordInput.value;
        const role = roleSelect.value;

        if (!email || !password) {
            messageDisplay.textContent = "Please fill in all fields.";
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || {};

        if (users[email] && users[email].password === password && users[email].role === role) {
            messageDisplay.textContent = "Login successful!";
            if (role === 'user') {
                window.location.href = "about.html"; // Redirect user
            } else if (role === 'trainer') {
                window.location.href = "trainer.html"; // Redirect trainer
            } else if (role === 'admin') {
                window.location.href = "admin.html"; // Redirect admin
            }
        } else {
            messageDisplay.textContent = "Invalid email, password, or role.";
        }
    });
});