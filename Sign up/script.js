
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(email && password) {
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Please fill in all fields.");
    }
});
