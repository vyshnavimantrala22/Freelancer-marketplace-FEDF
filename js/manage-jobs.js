/* =================================
    FREELANCEHUB MANAGE JOBS
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
    GET POSTED JOBS
================================= */

let jobs =
    JSON.parse(
        localStorage.getItem("freelanceJobs")
    ) || [];


/* =================================
    DISPLAY JOBS
================================= */

const jobsContainer =
    document.getElementById(
        "jobsContainer"
    );


function displayJobs() {

    jobsContainer.innerHTML = "";


    // No jobs

    if (jobs.length === 0) {

        jobsContainer.innerHTML = `

            <div class="dashboard-card">

                <h2>
                    No Jobs Found
                </h2>

                <p>
                    No jobs have been posted yet.
                </p>

            </div>

        `;

        return;
    }


    // Display every job

    jobs.forEach(function (job) {

        const jobCard =
            document.createElement("div");

        jobCard.className =
            "dashboard-card";


        jobCard.innerHTML = `

            <h2>
                ${job.title}
            </h2>

            <p>
                ${job.description}
            </p>

            <p>
                <strong>Skills:</strong>
                ${job.skills.join(", ")}
            </p>

            <p>
                <strong>Budget:</strong>
                ${job.budget}
            </p>

            <p>
                <strong>Client:</strong>
                ${job.clientName || "Unknown"}
            </p>

            <p>
                <strong>Posted:</strong>
                ${job.date || "N/A"}
            </p>

            <button
                class="btn btn-primary"
                onclick="deleteJob(${job.id})"
            >
                Delete Job
            </button>

        `;


        jobsContainer.appendChild(
            jobCard
        );

    });

}


/* =================================
    DELETE JOB
================================= */

function deleteJob(jobId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this job?"
        );


    if (!confirmDelete) {

        return;

    }


    jobs =
        jobs.filter(function (job) {

            return job.id !== jobId;

        });


    // Update Local Storage

    localStorage.setItem(
        "freelanceJobs",
        JSON.stringify(jobs)
    );


    // Refresh display

    displayJobs();

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

displayJobs();