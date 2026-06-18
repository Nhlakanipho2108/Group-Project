const authButtons = document.getElementById("authButtons");
const profileMenu = document.getElementById("profileMenu");

const profileToggle = document.getElementById("profileToggle");
const dropdown = document.getElementById("dropdown");

const logoutBtn = document.getElementById("logoutBtn");

/* SIMULATE LOGIN */

function loginUser() {

  authButtons.classList.add("hidden");

  profileMenu.classList.remove("hidden");
}

/* TOGGLE DROPDOWN */

profileToggle.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});

/* LOGOUT */

logoutBtn.addEventListener("click", () => {

  profileMenu.classList.add("hidden");

  authButtons.classList.remove("hidden");

  dropdown.classList.add("hidden");
});

/* DEMO AUTO LOGIN */
/* REMOVE THIS LATER */

loginUser();

document.addEventListener("DOMContentLoaded", () => {

  // Check login status
  const isLoggedIn =
    localStorage.getItem("loggedIn");

  // If not logged in
  if (isLoggedIn !== "true") {

    // Redirect to login page
    window.location.href =
      "Login/index.html";

  }

});


// Logout function
function logout() {

  // Remove session
  localStorage.removeItem("loggedIn");

  // Redirect to login
  window.location.href =
    "Login/index.html";

}
document.addEventListener("DOMContentLoaded", () => {

  const authButtons =
    document.getElementById("authButtons");

  // Get stored username
  const username =
    localStorage.getItem("username");

  const isLoggedIn =
    localStorage.getItem("loggedIn");

  // If logged in
  if (
    isLoggedIn === "true" &&
    username
  ) {

    authButtons.innerHTML = `

      <div class="user-profile">

        <span class="user-name">
          👋 ${username}
        </span>

        <button
          class="logout-btn"
          onclick="logout()"
        >
          Logout
        </button>

      </div>

    `;
  }

});


// Logout function
function logout() {

  localStorage.removeItem("loggedIn");

  localStorage.removeItem("username");

  window.location.href =
    "Login/index.html";

}