/* =================================
    FREELANCEHUB POST JOB
================================= */


// Check logged-in user

const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));


if (!loggedInUser) {

    window.location.href = "../login.html";

}


// Get form

const postJobForm =
    document.getElementById("postJobForm");


postJobForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // Get form values

        const title =
            document.getElementById("jobTitle")
                .value.trim();

        const description =
            document.getElementById("jobDescription")
                .value.trim();

        const skillsText =
            document.getElementById("jobSkills")
                .value.trim();

        const budget =
            document.getElementById("jobBudget")
                .value.trim();


        // Convert skills into an array

        const skills =
            skillsText
                .split(",")
                .map(function (skill) {

                    return skill.trim();

                });


        // Get existing jobs

        let postedJobs =
            JSON.parse(
                localStorage.getItem("freelanceJobs")
            ) || [];


        // Create new job

        const newJob = {

            id: Date.now(),

            title: title,

            description: description,

            skills: skills,

            budget: budget,

            clientEmail: loggedInUser.email,

            clientName: loggedInUser.name,

            date: new Date().toLocaleDateString()

        };


        // Add job to array

        postedJobs.push(newJob);


        // Save jobs

        localStorage.setItem(
            "freelanceJobs",
            JSON.stringify(postedJobs)
        );


        // Show success message

        document.getElementById(
            "jobMessage"
        ).textContent =
            "Job posted successfully!";


        // Clear form

        postJobForm.reset();


        // Return to dashboard

        setTimeout(function () {

            window.location.href =
                "user-dashboard.html";

        }, 1500);

    }
);


// Logout

const logoutButton =
    document.getElementById("logoutButton");


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
