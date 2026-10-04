/* =================================
   FREELANCEHUB AUTHENTICATION
================================= */


/* =================================
   SIGNUP
================================= */

const signupForm = document.getElementById("signupForm");


if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("signupName").value.trim();

        const email =
            document.getElementById("signupEmail").value.trim();

        const password =
            document.getElementById("signupPassword").value;

        const role =
            document.getElementById("signupRole").value;


        const message =
            document.getElementById("signupMessage");


        /* Get existing users */

        let users =
            JSON.parse(localStorage.getItem("freelanceUsers")) || [];


        /* Check whether email already exists */

        const existingUser =
            users.find(function (user) {

                return user.email === email;

            });


        if (existingUser) {

            message.textContent =
                "An account with this email already exists.";

            message.style.color = "red";

            return;
        }


        /* Create new user */

        const newUser = {

            id: Date.now(),

            name: name,

            email: email,

            password: password,

            role: role

        };


        /* Add user */

        users.push(newUser);


        /* Save users */

        localStorage.setItem(
            "freelanceUsers",
            JSON.stringify(users)
        );


        message.textContent =
            "Account created successfully! Redirecting...";

        message.style.color = "green";


        /* Redirect to login */

        setTimeout(function () {

            window.location.href = "login.html";

        }, 1000);

    });

}


/* =================================
   LOGIN
================================= */

const loginForm = document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        const message =
            document.getElementById("loginMessage");


        /* Get users */

        const users =
            JSON.parse(localStorage.getItem("freelanceUsers")) || [];


        /* Find matching user */

        const user =
            users.find(function (account) {

                return (
                    account.email === email &&
                    account.password === password
                );

            });


        /* User not found */

        if (!user) {

            message.textContent =
                "Invalid email or password.";

            message.style.color = "red";

            return;
        }


        /* Save logged-in user */

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );


        message.textContent =
            "Login successful! Redirecting...";

        message.style.color = "green";


        /* Module-wise redirection */

        setTimeout(function () {

            if (user.role === "client") {

                window.location.href =
                    "user/user-dashboard.html";

            }

            else if (user.role === "freelancer") {

                window.location.href =
                    "user/user-dashboard.html";

            }

        }, 1000);

    });

}