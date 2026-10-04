/* =================================
    FREELANCEHUB MY POSTED JOBS
================================= */


// Check logged-in user

const loggedInUser =
    JSON.parse(
        localStorage.getItem("loggedInUser")
    );


if (!loggedInUser) {

    window.location.href =
        "../login.html";

}


// Get all posted jobs

const postedJobs =
    JSON.parse(
        localStorage.getItem("freelanceJobs")
    ) || [];


// Get container

const postedJobsContainer =
    document.getElementById(
        "postedJobsContainer"
    );


// Find jobs posted by current client

const myJobs =
    postedJobs.filter(
        function (job) {

            return (
                job.clientEmail ===
                loggedInUser.email
            );

        }
    );


// Display jobs

if (myJobs.length === 0) {

    postedJobsContainer.innerHTML = `

        <div class="job-card">

            <h2>
                No Jobs Posted Yet
            </h2>

            <p class="job-description">
                You have not posted any jobs yet.
            </p>

            <a
                href="post-job.html"
                class="btn btn-primary"
            >
                Post a Job
            </a>

        </div>

    `;

}
else {

    myJobs.forEach(
        function (job) {

            const jobCard =
                document.createElement("div");


            jobCard.className =
                "job-card";


            jobCard.innerHTML = `

                <h2>
                    ${job.title}
                </h2>


                <p class="job-description">
                    ${job.description}
                </p>


                <div class="job-details">

                    ${job.skills.map(
                        function (skill) {

                            return `
                                <span class="job-tag">
                                    ${skill}
                                </span>
                            `;

                        }
                    ).join("")}

                </div>


                <p class="job-budget">

                    Budget:
                    ${job.budget}

                </p>


                <p class="job-description">

                    Posted on:
                    ${job.date}

                </p>

            `;


            postedJobsContainer.appendChild(
                jobCard
            );

        }
    );

}


// Logout

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