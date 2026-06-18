document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".auth-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.querySelector(".toggle-password-visibility");

    // =========================
    // PASSWORD TOGGLE
    // =========================
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", () => {
            const isPassword = passwordInput.type === "password";
            passwordInput.type = isPassword ? "text" : "password";

            togglePassword.classList.toggle("fa-eye");
            togglePassword.classList.toggle("fa-eye-slash");
        });
    }

    // =========================
    // LOGIN FUNCTION
    // =========================
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Find matching user
        const foundUser = users.find(
            user => user.email === email && user.password === password
        );

        if (!foundUser) {
            alert("Invalid email or password!");
            return;
        }

        // Save logged-in user
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

        alert(`Welcome back, ${foundUser.firstName}!`);

        // Redirect to opportunities page
        window.location.href = "opportunities.html";
    });

});