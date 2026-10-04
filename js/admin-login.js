/* =================================
    FREELANCEHUB ADMIN LOGIN
================================= */

const ADMIN_EMAIL = "admin@freelancehub.com";
const ADMIN_PASSWORD = "admin123";

const adminLoginForm =
    document.getElementById("adminLoginForm");

adminLoginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const enteredEmail =
        document.getElementById("adminEmail").value.trim();

    const enteredPassword =
        document.getElementById("adminPassword").value;

    const message =
        document.getElementById("adminLoginMessage");

    console.log("Entered Email:", enteredEmail);
    console.log("Entered Password:", enteredPassword);
    console.log("Expected Email:", ADMIN_EMAIL);
    console.log("Expected Password:", ADMIN_PASSWORD);

    if (
        enteredEmail === ADMIN_EMAIL &&
        enteredPassword === ADMIN_PASSWORD
    ) {

        console.log("ADMIN LOGIN SUCCESS");

        localStorage.setItem(
            "adminLoggedIn",
            "true"
        );

        message.textContent =
            "Login successful!";

        message.style.color =
            "green";

        setTimeout(function () {

            window.location.href =
                "admin-dashboard.html";

        }, 500);

    } else {

        console.log("ADMIN LOGIN FAILED");

        message.textContent =
            "Invalid admin email or password.";

        message.style.color =
            "#dc2626";
    }

});