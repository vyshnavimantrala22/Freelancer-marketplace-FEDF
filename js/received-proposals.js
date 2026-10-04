/* =================================
   FREELANCEHUB RECEIVED PROPOSALS
================================= */

const loggedInUser =
    JSON.parse(
        localStorage.getItem("loggedInUser")
    );

if (!loggedInUser) {
    window.location.href =
        "../login.html";
}


let proposals =
    JSON.parse(
        localStorage.getItem(
            "freelanceProposals"
        )
    ) || [];


const proposalsContainer =
    document.getElementById(
        "proposalsContainer"
    );


/* =================================
   DISPLAY PROPOSALS
================================= */

function displayProposals() {

    proposalsContainer.innerHTML = "";


    const myProposals =
        proposals.filter(
            function (proposal) {

                return (
                    proposal.clientEmail ===
                    loggedInUser.email
                );

            }
        );


    /* =================================
       NO PROPOSALS
    ================================= */

    if (myProposals.length === 0) {

        proposalsContainer.innerHTML = `

            <div class="dashboard-card proposals-empty">

                <h2>
                    No Proposals Yet
                </h2>

                <p>
                    You have not received any proposals
                    for your jobs.
                </p>

                <a
                    href="my-posted-jobs.html"
                    class="btn btn-primary"
                >
                    View My Jobs
                </a>

            </div>

        `;

        return;
    }


    /* =================================
       DISPLAY EACH PROPOSAL
    ================================= */

    myProposals.forEach(
        function (proposal) {

            const proposalCard =
                document.createElement("div");


            proposalCard.className =
                "proposal-card";


            /* =================================
               ACCEPTED PROPOSAL
            ================================= */

            if (
                proposal.status ===
                "Accepted"
            ) {

                proposalCard.innerHTML = `

                    <h2>
                        ${proposal.jobTitle}
                    </h2>


                    <div class="proposal-info">

                        <p>
                            <strong>
                                Freelancer:
                            </strong>

                            ${proposal.freelancerName}
                        </p>

                        <p>
                            <strong>
                                Email:
                            </strong>

                            ${proposal.freelancerEmail}
                        </p>

                        <p>
                            <strong>
                                Date:
                            </strong>

                            ${proposal.date}
                        </p>

                    </div>


                    <div class="proposal-cover">

                        <strong>
                            Cover Letter
                        </strong>

                        <p>
                            ${proposal.coverLetter}
                        </p>

                    </div>


                    <p class="proposal-budget">

                        Proposed Budget:
                        ₹${proposal.proposedBudget}

                    </p>


                    <span
                        class="proposal-status accepted"
                    >
                        Accepted
                    </span>

                `;

            }


            /* =================================
               PENDING PROPOSAL
            ================================= */

            else {

                proposalCard.innerHTML = `

                    <h2>
                        ${proposal.jobTitle}
                    </h2>


                    <div class="proposal-info">

                        <p>
                            <strong>
                                Freelancer:
                            </strong>

                            ${proposal.freelancerName}
                        </p>

                        <p>
                            <strong>
                                Email:
                            </strong>

                            ${proposal.freelancerEmail}
                        </p>

                        <p>
                            <strong>
                                Date:
                            </strong>

                            ${proposal.date}
                        </p>

                    </div>


                    <div class="proposal-cover">

                        <strong>
                            Cover Letter
                        </strong>

                        <p>
                            ${proposal.coverLetter}
                        </p>

                    </div>


                    <p class="proposal-budget">

                        Proposed Budget:
                        ₹${proposal.proposedBudget}

                    </p>


                    <span class="proposal-status">

                        Pending

                    </span>


                    <div class="proposal-deadline">

                        <label
                            for="deadline-${proposal.id}"
                        >
                            Project Deadline
                        </label>

                        <input
                            type="date"
                            id="deadline-${proposal.id}"
                        >

                    </div>


                    <div class="proposal-action">

                        <button
                            class="btn btn-primary"
                            onclick="acceptProposal(${proposal.id})"
                        >
                            Accept Proposal
                        </button>

                    </div>

                `;

            }


            proposalsContainer.appendChild(
                proposalCard
            );

        }
    );
}


/* =================================
   ACCEPT PROPOSAL
================================= */

function acceptProposal(
    proposalId
) {

    const proposal =
        proposals.find(
            function (item) {

                return (
                    item.id ===
                    proposalId
                );

            }
        );


    if (!proposal) {

        alert(
            "Proposal not found."
        );

        return;
    }


    const deadlineInput =
        document.getElementById(
            "deadline-" +
            proposalId
        );


    if (!deadlineInput) {

        alert(
            "Deadline field not found."
        );

        return;
    }


    const deadline =
        deadlineInput.value;


    if (!deadline) {

        alert(
            "Please select a project deadline."
        );

        return;
    }


    const confirmAccept =
        confirm(
            "Are you sure you want to accept this proposal?"
        );


    if (!confirmAccept) {
        return;
    }


    proposal.status =
        "Accepted";


    localStorage.setItem(
        "freelanceProposals",
        JSON.stringify(
            proposals
        )
    );


    /* =================================
       CREATE PROJECT
    ================================= */

    let projects =
        JSON.parse(
            localStorage.getItem(
                "freelanceProjects"
            )
        ) || [];


    const existingProject =
        projects.find(
            function (project) {

                return (
                    project.proposalId ===
                    proposal.id
                );

            }
        );


    if (!existingProject) {

        const newProject = {

            id:
                Date.now(),

            proposalId:
                proposal.id,

            jobId:
                proposal.jobId,

            title:
                proposal.jobTitle,

            clientName:
                loggedInUser.name,

            clientEmail:
                loggedInUser.email,

            freelancerName:
                proposal.freelancerName,

            freelancerEmail:
                proposal.freelancerEmail,

            budget:
                proposal.proposedBudget,

            status:
                "Started",

            progress:
                0,

            startDate:
                new Date().toLocaleDateString(),

            deadline:
                deadline

        };


        projects.push(
            newProject
        );


        localStorage.setItem(
            "freelanceProjects",
            JSON.stringify(
                projects
            )
        );

    }


    alert(
        "Proposal accepted! Project created successfully."
    );


    displayProposals();
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

displayProposals();
