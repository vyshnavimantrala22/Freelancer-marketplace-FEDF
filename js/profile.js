/* =================================
FREELANCEHUB PROFILE
================================= */

/* =================================
CHECK LOGGED-IN USER
================================= */

const loggedInUser =
JSON.parse(
localStorage.getItem("loggedInUser")
);

if (!loggedInUser) {

window.location.href =
    "../login.html";

}

/* =================================
GET PROFILE ELEMENTS
================================= */

const profileName =
document.getElementById("profileName");

const profileEmail =
document.getElementById("profileEmail");

const profileRole =
document.getElementById("profileRole");

const profileBio =
document.getElementById("profileBio");

const profileSkills =
document.getElementById("profileSkills");

const profilePortfolio =
document.getElementById("profilePortfolio");

const profileCompany =
document.getElementById("profileCompany");

const freelancerFields =
document.getElementById("freelancerFields");

const clientFields =
document.getElementById("clientFields");

const profileForm =
document.getElementById("profileForm");

const profileMessage =
document.getElementById("profileMessage");

/* =================================
DISPLAY BASIC USER INFORMATION
================================= */

if (loggedInUser) {

profileName.value =
    loggedInUser.name;

profileEmail.value =
    loggedInUser.email;

profileRole.value =
    loggedInUser.role.charAt(0).toUpperCase() +
    loggedInUser.role.slice(1);


}

/* =================================
GET SAVED PROFILE
================================= */

let profiles =
JSON.parse(
localStorage.getItem("freelanceProfiles")
) || {};

/* =================================
LOAD SAVED PROFILE
================================= */

const savedProfile =
profiles[loggedInUser.email];

if (savedProfile) {


profileName.value =
    savedProfile.name || loggedInUser.name;

profileBio.value =
    savedProfile.bio || "";

if (loggedInUser.role === "freelancer") {

    profileSkills.value =
        savedProfile.skills || "";

    profilePortfolio.value =
        savedProfile.portfolio || "";

}


if (loggedInUser.role === "client") {

    profileCompany.value =
        savedProfile.company || "";

}


}

/* =================================
SHOW ROLE-SPECIFIC FIELDS
================================= */

if (loggedInUser.role === "freelancer") {


freelancerFields.style.display =
    "block";

clientFields.style.display =
    "none";


}

if (loggedInUser.role === "client") {


freelancerFields.style.display =
    "none";

clientFields.style.display =
    "block";


}

/* =================================
SAVE PROFILE
================================= */

profileForm.addEventListener(
"submit",
function (event) {


    event.preventDefault();


    const profileData = {

        name:
            profileName.value.trim(),

        email:
            loggedInUser.email,

        role:
            loggedInUser.role,

        bio:
            profileBio.value.trim(),

        skills:
            loggedInUser.role === "freelancer"
                ? profileSkills.value.trim()
                : "",

        portfolio:
            loggedInUser.role === "freelancer"
                ? profilePortfolio.value.trim()
                : "",

        company:
            loggedInUser.role === "client"
                ? profileCompany.value.trim()
                : ""

    };


    /* Save profile */

    profiles[loggedInUser.email] =
        profileData;


    localStorage.setItem(
        "freelanceProfiles",
        JSON.stringify(profiles)
    );


    /* Update logged-in user's name */

    loggedInUser.name =
        profileData.name;

    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(loggedInUser)
    );


    /* Update registered user's name */

    let users =
        JSON.parse(
            localStorage.getItem("freelanceUsers")
        ) || [];


    users =
        users.map(function (user) {

            if (
                user.email ===
                loggedInUser.email
            ) {

                user.name =
                    profileData.name;

            }

            return user;

        });


    localStorage.setItem(
        "freelanceUsers",
        JSON.stringify(users)
    );


    /* Success message */

    profileMessage.textContent =
        "Profile saved successfully!";

    profileMessage.style.color =
        "green";


    /* Remove message after a few seconds */

    setTimeout(function () {

        profileMessage.textContent =
            "";

    }, 3000);

}


);

/* =================================
LOGOUT
================================= */

const logoutButton =
document.getElementById(
"logoutButton"
);

if (logoutButton) {


logoutButton.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "loggedInUser"
        );

        window.location.href =
            "../login.html";

    }
);


}