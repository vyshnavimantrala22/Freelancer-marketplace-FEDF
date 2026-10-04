/* =================================
    FREELANCEHUB USER DASHBOARD
================================= */


/* Get logged-in user */

const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));


/* Check whether user is logged in */

if (!loggedInUser) {

    window.location.href = "../login.html";

}


/* Display user information */

if (loggedInUser) {

    document.getElementById("userName").textContent =
        loggedInUser.name;

    document.getElementById("welcomeUser").textContent =
        loggedInUser.name;

    document.getElementById("userRole").textContent =
        "Account Type: " +
        loggedInUser.role.charAt(0).toUpperCase() +
        loggedInUser.role.slice(1);


    /* =================================
        ROLE-BASED DASHBOARD
    ================================= */

    const freelancerCards =
        document.querySelectorAll(".freelancer-card");

    const clientCards =
        document.querySelectorAll(".client-card");


    if (loggedInUser.role === "freelancer") {

        clientCards.forEach(function (card) {
            card.style.display = "none";
        });

    }


    if (loggedInUser.role === "client") {

        freelancerCards.forEach(function (card) {
            card.style.display = "none";
        });

    }

}


/* =================================
    LOGOUT
================================= */

const logoutButton =
    document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", function () {

        localStorage.removeItem("loggedInUser");

        window.location.href = "../login.html";

    });

}