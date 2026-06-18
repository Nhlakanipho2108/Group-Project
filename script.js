/* =========================
   ELEMENTS
========================= */

const authButtons =
  document.getElementById("authButtons");

const profileMenu =
  document.getElementById("profileMenu");

const profileToggle =
  document.getElementById("profileToggle");

const dropdown =
  document.getElementById("dropdown");

/* =========================
   PAGE LOAD
========================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const isLoggedIn =
      localStorage.getItem("loggedIn");

    const username =
      localStorage.getItem("username");

    /* USER LOGGED IN */

    if (
      isLoggedIn === "true" &&
      username
    ) {

      const userProfile = document.createElement("div");
      userProfile.className = "user-profile";

      const userNameSpan = document.createElement("span");
      userNameSpan.className = "user-name";
      userNameSpan.textContent = `👋 ${username}`;

      const logoutButton = document.createElement("button");
      logoutButton.className = "logout-navbar-btn";
      logoutButton.textContent = "Logout";
      logoutButton.addEventListener("click", logout);

      userProfile.append(userNameSpan, logoutButton);
      authButtons.innerHTML = "";
      authButtons.append(userProfile);

    }

    /* OPTIONAL PROFILE MENU */

    if (
      profileToggle &&
      dropdown
    ) {

      profileToggle.addEventListener(
        "click",
        () => {

          dropdown.classList.toggle(
            "hidden"
          );

        }
      );

    }

  }
);

/* =========================
   LOGOUT
========================= */

function logout() {

  localStorage.removeItem(
    "loggedIn"
  );

  localStorage.removeItem(
    "username"
  );

  window.location.href =
    "Login/index.html";

}