/* =================================
    FREELANCEHUB MY PROJECTS
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
        "projectsContainer"
    );


let projects =
    JSON.parse(
        localStorage.getItem(
            "freelanceProjects"
        )
    ) || [];


/* =================================
    DISPLAY PROJECTS
================================= */

function displayProjects() {

    projectsContainer.innerHTML = "";


    const myProjects =
        projects.filter(
            function (project) {

                return (
                    project.freelancerEmail ===
                    loggedInUser.email
                );

            }
        );


    /* =================================
       NO PROJECTS
    ================================= */

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
                    href="browse-jobs.html"
                    class="btn btn-primary"
                >
                    Browse Jobs
                </a>

            </div>

        `;

        return;

    }


    /* =================================
       DISPLAY PROJECTS
    ================================= */

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
                            Client:
                        </strong>

                        ${project.clientName}

                    </p>

                </div>


                <div class="project-details">


                    <div class="project-detail">

                        <span
                            class="project-detail-label"
                        >
                            Budget
                        </span>

                        <span
                            class="project-detail-value"
                        >
                            ₹${project.budget}
                        </span>

                    </div>


                    <div class="project-detail">

                        <span
                            class="project-detail-label"
                        >
                            Start Date
                        </span>

                        <span
                            class="project-detail-value"
                        >
                            ${project.startDate}
                        </span>

                    </div>


                    <div class="project-detail">

                        <span
                            class="project-detail-label"
                        >
                            Deadline
                        </span>

                        <span
                            class="project-detail-value"
                        >
                            ${project.deadline}
                        </span>

                    </div>


                    <div class="project-detail">

                        <span
                            class="project-detail-label"
                        >
                            Project Type
                        </span>

                        <span
                            class="project-detail-value"
                        >
                            Freelance Project
                        </span>

                    </div>


                </div>


                <!-- STATUS -->

                <div class="project-status-row">

                    <span
                        class="project-status-label"
                    >
                        Project Status
                    </span>


                    <span
                        class="project-status"
                    >
                        ${project.status}
                    </span>

                </div>


                <!-- PROGRESS -->

                <div class="project-progress">

                    <div
                        class="project-progress-header"
                    >

                        <strong>
                            Project Progress
                        </strong>


                        <span
                            class="project-progress-percent"
                        >
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


                    <!-- UPDATE CONTROLS -->

                    <div
                        class="project-controls"
                    >

                        <div
                            class="project-control"
                        >

                            <label
                                for="status-${project.id}"
                            >
                                Update Status
                            </label>


                            <select
                                id="status-${project.id}"
                            >

                                <option
                                    value="Started"
                                    ${project.status === "Started" ? "selected" : ""}
                                >
                                    Started
                                </option>


                                <option
                                    value="In Progress"
                                    ${project.status === "In Progress" ? "selected" : ""}
                                >
                                    In Progress
                                </option>


                                <option
                                    value="Completed"
                                    ${project.status === "Completed" ? "selected" : ""}
                                >
                                    Completed
                                </option>

                            </select>

                        </div>


                        <div
                            class="project-control"
                        >

                            <label
                                for="progress-${project.id}"
                            >
                                Update Progress
                            </label>


                            <select
                                id="progress-${project.id}"
                            >

                                <option
                                    value="0"
                                    ${project.progress == 0 ? "selected" : ""}
                                >
                                    0%
                                </option>


                                <option
                                    value="25"
                                    ${project.progress == 25 ? "selected" : ""}
                                >
                                    25%
                                </option>


                                <option
                                    value="50"
                                    ${project.progress == 50 ? "selected" : ""}
                                >
                                    50%
                                </option>


                                <option
                                    value="75"
                                    ${project.progress == 75 ? "selected" : ""}
                                >
                                    75%
                                </option>


                                <option
                                    value="100"
                                    ${project.progress == 100 ? "selected" : ""}
                                >
                                    100%
                                </option>

                            </select>

                        </div>

                    </div>


                    <button
                        class="btn btn-primary project-update-button"
                        onclick="updateProject(${project.id})"
                    >
                        Update Project
                    </button>

                </div>

            `;


            projectsContainer.appendChild(
                projectCard
            );

        }
    );

}


/* =================================
   UPDATE PROJECT
================================= */

function updateProject(projectId) {

    const project =
        projects.find(
            function (item) {

                return (
                    item.id ===
                    projectId
                );

            }
        );


    if (!project) {

        alert(
            "Project not found."
        );

        return;

    }


    const statusSelect =
        document.getElementById(
            "status-" +
            projectId
        );


    const progressSelect =
        document.getElementById(
            "progress-" +
            projectId
        );


    const newStatus =
        statusSelect.value;


    const newProgress =
        Number(
            progressSelect.value
        );


    project.status =
        newStatus;


    project.progress =
        newProgress;


    /* Automatically complete project */

    if (newProgress === 100) {

        project.status =
            "Completed";

    }


    /* Automatically move started project */

    else if (
        newProgress > 0 &&
        newProgress < 100 &&
        newStatus === "Started"
    ) {

        project.status =
            "In Progress";

    }


    localStorage.setItem(
        "freelanceProjects",
        JSON.stringify(
            projects
        )
    );


    alert(
        "Project updated successfully!"
    );


    displayProjects();

}


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


/* =================================
   INITIAL DISPLAY
================================= */

displayProjects();