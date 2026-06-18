// SIGN UP FORM

const signupForm =
  document.getElementById("signupForm");

if (signupForm) {

  signupForm.addEventListener(
    "submit",
    function (e) {

      e.preventDefault();

      // GET INPUT VALUES
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

      // CHECK IF FIELDS ARE EMPTY
      if (
        username === "" ||
        email === "" ||
        password === ""
      ) {

        alert(
          "Please fill in all fields."
        );

        return;
      }

      // SAVE USER DATA
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

      // LOGIN STATUS
      localStorage.setItem(
        "loggedIn",
        "true"
      );

      // SUCCESS MESSAGE
      alert(
        "Account created successfully!"
      );

      // REDIRECT
      window.location.href =
        "../Login/index.html";
    }
  );
}