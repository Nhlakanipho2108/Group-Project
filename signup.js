document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const radioButtons = document.querySelectorAll('input[name="user-role"]');
    const formHeading = document.querySelector(".auth-header h2");
    const submitButton = document.querySelector(".btn-auth-submit");
    
    // Form Inputs
    const firstNameInput = document.getElementById("first-name");
    const lastNameInput = document.getElementById("last-name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const termsCheckbox = document.getElementById("terms");
    const togglePassword = document.querySelector(".toggle-password-visibility");
    const authForm = document.querySelector(".auth-form");

    // ==========================================
    // 1. DYNAMIC ROLE CONTENT SWITCHER
    // ==========================================
    const updateFormContent = (role) => {
        if (role === "client") {
            formHeading.textContent = "Sign up to hire young talent";
            emailInput.placeholder = "you@company.com";
            submitButton.textContent = "Create My Client Account";
        } else if (role === "freelancer") {
            formHeading.textContent = "Sign up to find meaningful work";
            emailInput.placeholder = "your.name@gmail.com";
            submitButton.textContent = "Apply as a Freelancer";
        }
    };

    // Listen for role changes and sync to LocalStorage
    radioButtons.forEach((radio) => {
        radio.addEventListener("change", (e) => {
            if (e.target.checked) {
                updateFormContent(e.target.value);
                localStorage.setItem("yc_signup_role", e.target.value);
            }
        });
    });

    // ==========================================
    // 2. LIVE FIELD SAVING (LOCAL STORAGE)
    // ==========================================
    const saveFieldData = () => {
        const formData = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            termsAccepted: termsCheckbox.checked
        };
        localStorage.setItem("yc_signup_data", JSON.stringify(formData));
    };

    // Attach listeners to update LocalStorage on input
    firstNameInput.addEventListener("input", saveFieldData);
    lastNameInput.addEventListener("input", saveFieldData);
    emailInput.addEventListener("input", saveFieldData);
    termsCheckbox.addEventListener("change", saveFieldData);

    // ==========================================
    // 3. PERSISTENCE PERSIST: LOAD SAVED DATA
    // ==========================================
    const loadSavedData = () => {
        // Restore role selection
        const savedRole = localStorage.getItem("yc_signup_role");
        if (savedRole) {
            const targetRadio = document.querySelector(`input[name="user-role"][value="${savedRole}"]`);
            if (targetRadio) {
                targetRadio.checked = true;
                updateFormContent(savedRole);
            }
        } else {
            // Fallback to default checked HTML element if nothing is stored yet
            const defaultChecked = document.querySelector('input[name="user-role"]:checked');
            if (defaultChecked) updateFormContent(defaultChecked.value);
        }

        // Restore textual fields
        const savedFields = localStorage.getItem("yc_signup_data");
        if (savedFields) {
            const data = JSON.parse(savedFields);
            if (data.firstName) firstNameInput.value = data.firstName;
            if (data.lastName) lastNameInput.value = data.lastName;
            if (data.email) emailInput.value = data.email;
            if (data.termsAccepted) termsCheckbox.checked = data.termsAccepted;
        }
    };

    // Initialize state restoration
    loadSavedData();

    // ==========================================
    // 4. PASSWORD VISIBILITY TOGGLE
    // ==========================================
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", () => {
            const isPassword = passwordInput.getAttribute("type") === "password";
            passwordInput.setAttribute("type", isPassword ? "text" : "password");
            togglePassword.classList.toggle("fa-eye-slash", !isPassword);
            togglePassword.classList.toggle("fa-eye", isPassword);
        });
    }

    // ==========================================
    // 5. FORM SUBMISSION CLEANUP
    // ==========================================
authForm.addEventListener("submit", (e) => {
    e.preventDefault(); // stop page reload

    // Get role
    const role =
        document.querySelector('input[name="user-role"]:checked')?.value || "client";

    // Build user object
    const user = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
        role: role
    };

    // Load existing users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Prevent duplicate email
    const exists = users.some(u => u.email === user.email);

    if (exists) {
        alert("This email is already registered!");
        return;
    }

    // Save user
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    // Clean temporary form cache
    localStorage.removeItem("yc_signup_data");
    localStorage.removeItem("yc_signup_role");

    // Success message
    alert("Account created successfully!");

    // Redirect to opportunities page
    window.location.href = "opportunities.html";
});
});