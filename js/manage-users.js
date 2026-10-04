/* =================================
    FREELANCEHUB MANAGE USERS
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
    GET USERS
================================= */

let users =
    JSON.parse(
        localStorage.getItem("freelanceUsers")
    ) || [];


/* =================================
    DISPLAY USERS
================================= */

const usersContainer =
    document.getElementById(
        "usersContainer"
    );


function displayUsers() {

    usersContainer.innerHTML = "";


    // No users

    if (users.length === 0) {

        usersContainer.innerHTML = `

            <div class="dashboard-card">

                <h2>
                    No Users Found
                </h2>

                <p>
                    No users are currently registered.
                </p>

            </div>

        `;

        return;
    }


    // Display every user

    users.forEach(function (user) {

        const userCard =
            document.createElement("div");

        userCard.className =
            "dashboard-card";


        userCard.innerHTML = `

            <h2>
                ${user.name}
            </h2>

            <p>
                <strong>Email:</strong>
                ${user.email}
            </p>

            <p>
                <strong>Role:</strong>
                ${user.role}
            </p>

            <button
                class="btn btn-primary"
                onclick="deleteUser(${user.id})"
            >
                Delete User
            </button>

        `;


        usersContainer.appendChild(
            userCard
        );

    });

}


/* =================================
    DELETE USER
================================= */

function deleteUser(userId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this user?"
        );


    if (!confirmDelete) {

        return;

    }


    users =
        users.filter(function (user) {

            return user.id !== userId;

        });


    // Update Local Storage

    localStorage.setItem(
        "freelanceUsers",
        JSON.stringify(users)
    );


    // Refresh page display

    displayUsers();

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


/* =================================
    INITIAL DISPLAY
================================= */

displayUsers();