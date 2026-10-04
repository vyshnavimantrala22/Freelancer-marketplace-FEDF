/* =================================
   FREELANCEHUB CLIENT MY PROJECTS
================================= */

const loggedInUser =
    JSON.parse(
        localStorage.getItem(
            "loggedInUser"
        )
    );

if (!loggedInUser) {
    window.location.href =
        "../login.html";
}

const projectsContainer =
    document.getElementById(
        "clientProjectsContainer"
    );

let projects =
    JSON.parse(
        localStorage.getItem(
            "freelanceProjects"
        )
    ) || [];


function displayClientProjects() {

    projectsContainer.innerHTML = "";

    const myProjects =
        projects.filter(
            function (project) {

                return (
                    project.clientEmail ===
                    loggedInUser.email
                );

            }
        );


    if (myProjects.length === 0) {

        projectsContainer.innerHTML = `

            <div class="dashboard-card projects-empty">

                <h2>
                    No Projects Yet
                </h2>

                <p>
                    You currently have no active projects.
                </p>

                <a
                    href="post-job.html"
                    class="btn btn-primary"
                >
                    Post a Job
                </a>

            </div>

        `;

        return;
    }


    myProjects.forEach(
        function (project) {

            const projectCard =
                document.createElement(
                    "div"
                );

            projectCard.className =
                "project-card";


            projectCard.innerHTML = `

                <h2>
                    ${project.title}
                </h2>


                <div class="project-client">

                    <p>

                        <strong>
                            Freelancer:
                        </strong>

                        ${project.freelancerName}

                    </p>

                </div>


                <div class="project-details">


                    <div class="project-detail">

                        <span class="project-detail-label">
                            Budget
                        </span>

                        <span class="project-detail-value">
                            ₹${project.budget}
                        </span>

                    </div>


                    <div class="project-detail">

                        <span class="project-detail-label">
                            Start Date
                        </span>

                        <span class="project-detail-value">
                            ${project.startDate}
                        </span>

                    </div>


                    <div class="project-detail">

                        <span class="project-detail-label">
                            Deadline
                        </span>

                        <span class="project-detail-value">
                            ${project.deadline}
                        </span>

                    </div>


                    <div class="project-detail">

                        <span class="project-detail-label">
                            Project Type
                        </span>

                        <span class="project-detail-value">
                            Freelance Project
                        </span>

                    </div>


                </div>


                <div class="project-status-row">

                    <span class="project-status-label">
                        Project Status
                    </span>

                    <span class="project-status">
                        ${project.status}
                    </span>

                </div>


                <div class="project-progress">

                    <div class="project-progress-header">

                        <strong>
                            Project Progress
                        </strong>

                        <span class="project-progress-percent">
                            ${project.progress}%
                        </span>

                    </div>


                    <div class="progress-bar">

                        <div
                            class="progress-fill"
                            style="width: ${project.progress}%"
                        >
                        </div>

                    </div>

                </div>

            `;


            projectsContainer.appendChild(
                projectCard
            );

        }
    );
}


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


displayClientProjects();