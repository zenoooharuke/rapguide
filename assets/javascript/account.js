document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the default form submission

            // Select inputs by their order in the HTML
            const inputs = registerForm.querySelectorAll('input');
            const username = inputs[0].value.trim();
            const email = inputs[1].value.trim();
            const password = inputs[2].value;
            const confirmPassword = inputs[3].value;

            // Simple Validation
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            if (password.length < 6) {
                alert("Password should be at least 6 characters long.");
                return;
            }

            // Store user data in localStorage
            const user = {
                username: username,
                email: email,
                password: password
                // WARNING: Storing passwords in plaintext is insecure. This is for demonstration only.
            };
            localStorage.setItem('registeredUser', JSON.stringify(user));

            alert("Account created successfully! Redirecting to login...");
            window.location.href = "login-section.html";
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            const inputs = loginForm.querySelectorAll('input');
            // inputs[0] is Email, inputs[1] is Password based on login-section.html
            const email = inputs[0].value.trim();
            const password = inputs[1].value;

            // Retrieve stored user data
            const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

            if (storedUser && storedUser.email === email && storedUser.password === password) {
                localStorage.setItem('isLoggedIn', 'true');
                alert("Login successful! Redirecting to dashboard...");
                window.location.href = "main-webpage.html";
            } else {
                alert("Invalid email or password. Please try again.");
            }
        });
    }

    // Disable "Forgot Password?" link
    const forgotPasswordLink = document.querySelector('.container-login .label > a');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
        });
        forgotPasswordLink.style.cursor = 'not-allowed';
        forgotPasswordLink.style.opacity = '0.5';
    }
});