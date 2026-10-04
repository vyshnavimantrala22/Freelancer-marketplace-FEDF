/* =================================
    FREELANCEHUB ADMIN DASHBOARD
================================= */


/* =================================
    CHECK ADMIN LOGIN
================================= */

const adminLoggedIn =
    localStorage.getItem("adminLoggedIn");

if (adminLoggedIn !== "true") {

    window.location.href =
        "admin-login.html";

}


/* =================================
    GET DATA FROM LOCAL STORAGE
================================= */

// Registered users

const users =
    JSON.parse(
        localStorage.getItem("freelanceUsers")
    ) || [];


// Posted jobs

const jobs =
    JSON.parse(
        localStorage.getItem("freelanceJobs")
    ) || [];


// Submitted proposals

const proposals =
    JSON.parse(
        localStorage.getItem("freelanceProposals")
    ) || [];


/* =================================
    DISPLAY STATISTICS
================================= */

// Total users

const totalUsers =
    document.getElementById("totalUsers");

if (totalUsers) {

    totalUsers.textContent =
        users.length;

}


// Total jobs

const totalJobs =
    document.getElementById("totalJobs");

if (totalJobs) {

    totalJobs.textContent =
        jobs.length;

}


// Total proposals

const totalProposals =
    document.getElementById("totalProposals");

if (totalProposals) {

    totalProposals.textContent =
        proposals.length;

}


/* =================================
    ADMIN LOGOUT
================================= */

const adminLogoutButton =
    document.getElementById(
        "adminLogoutButton"
    );

if (adminLogoutButton) {

    adminLogoutButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "adminLoggedIn"
            );

            window.location.href =
                "admin-login.html";

        }
    );

}