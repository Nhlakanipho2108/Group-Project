document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {

    event.preventDefault();

    const email =
      document.getElementById("email").value;

    const password =
      document.getElementById("password").value;

    // Demo login
    if (
      email === "admin@gmail.com" &&
      password === "1234"
    ) {

      // save login session
      localStorage.setItem("loggedIn", "true");

      // redirect
      window.location.href = "../opportunities.html";

    } else {

      alert("Invalid email or password");

    }

});

      localStorage.setItem(
  "username",
  email
);