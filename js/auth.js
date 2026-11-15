
document.addEventListener("DOMContentLoaded", function () {

    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");

    // CUSTOMER REGISTRATION

    if (signupForm) {

        signupForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const data = new FormData(signupForm);

            const name = data.get("name").trim();
            const email = data.get("email").trim().toLowerCase();
            const password = data.get("password");
            const confirmPassword = data.get("confirmPassword");

            const message = document.getElementById("signupMessage");

            if (password !== confirmPassword) {
                message.textContent = "Passwords do not match.";
                return;
            }

            let users = JSON.parse(localStorage.getItem("demoUsers")) || [];

            const existingUser = users.find(user => user.email === email);

            if (existingUser) {
                message.textContent = "Email already registered.";
                return;
            }

            users.push({
                name: name,
                email: email,
                password: password
            });

            localStorage.setItem("demoUsers", JSON.stringify(users));

            message.textContent = "Registration successful! Redirecting...";

            setTimeout(function () {
                window.location.href = "login.html";
            }, 1000);

        });

    }

    // CUSTOMER LOGIN

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const data = new FormData(loginForm);

            const email = data.get("email").trim().toLowerCase();
            const password = data.get("password");

            let users = JSON.parse(localStorage.getItem("demoUsers")) || [];

            const user = users.find(function (entry) {
                return entry.email === email &&
                       entry.password === password;
            });

            const message = document.getElementById("loginMessage");

            if (!user) {
                message.textContent = "Invalid email or password.";
                return;
            }

            localStorage.setItem("currentUser", JSON.stringify({
                name: user.name,
                email: user.email
            }));

            message.textContent = "Login successful!";

            setTimeout(function () {
                window.location.href = "index.html";
            }, 700);

        });

    }

});
