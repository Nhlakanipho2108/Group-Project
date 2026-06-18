document
  .getElementById("loginForm")
  .addEventListener(
    "submit",
    function (event) {

      event.preventDefault();

      const email =
        document.getElementById(
          "email"
        ).value;

      const password =
        document.getElementById(
          "password"
        ).value;

      /* DEMO LOGIN */

      if (
        email === "admin@gmail.com" &&
        password === "1234"
      ) {

        /* SAVE LOGIN SESSION */

        localStorage.setItem(
          "loggedIn",
          "true"
        );

        /* SAVE USERNAME */

        localStorage.setItem(
          "username",
          email
        );

        /* REDIRECT */

        window.location.href =
          "../opportunities.html";

      } else {

        alert(
          "Invalid email or password"
        );

      }

    }
  );
  // Login form handling
const loginForm = document.getElementById('loginForm'); // Make sure your HTML form has this ID

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Grab values from login input fields (Adjust IDs to match your HTML)
        const emailOrUsername = document.getElementById('login-identifier').value.trim();
        const passwordInput = document.getElementById('login-password').value;

        // 🔍 RETRIEVE SAVED ACCOUNT: Fetch stored details from browser memory
        const savedUsername = localStorage.getItem('username');
        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');

        // Check if an account even exists first
        if (!savedUsername) {
            alert('No account found! Please sign up first.');
            window.location.href = '../Sign up/index.html';
            return;
        }

        // Validate credentials
        if ((emailOrUsername === savedUsername || emailOrUsername === savedEmail) && passwordInput === savedPassword) {
            // Set session states so the main page changes
            localStorage.setItem('loggedIn', 'true');
            
            alert(`Welcome back, ${savedUsername}!`);
            
            // Redirect back to your main home page
            window.location.href = '../opportunities.html';
        } else {
            alert('Oops! Incorrect username/email or password. Try again.');
        }
    });
}
