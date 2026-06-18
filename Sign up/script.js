document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {

    event.preventDefault();

    // Inputs
    const username =
      document
        .getElementById("username")
        .value
        .trim();

    const email =
      document
        .getElementById("email")
        .value
        .trim();

    const password =
      document
        .getElementById("password")
        .value
        .trim();

    // Save user info
    localStorage.setItem(
      "username",
      username
    );

    localStorage.setItem(
      "email",
      email
    );

    localStorage.setItem(
      "password",
      password
    );

    // Success message
    alert("Account created successfully!");

    // Redirect to login page
    window.location.href =
      "../Login/index.html";

});