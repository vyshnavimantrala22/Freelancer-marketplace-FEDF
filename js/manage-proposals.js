/* =================================
    FREELANCEHUB MANAGE PROPOSALS
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
    GET PROPOSALS
================================= */

let proposals =
    JSON.parse(
        localStorage.getItem("freelanceProposals")
    ) || [];


/* =================================
    DISPLAY PROPOSALS
================================= */

const proposalsContainer =
    document.getElementById(
        "proposalsContainer"
    );


function displayProposals() {

    proposalsContainer.innerHTML = "";


    // No proposals

    if (proposals.length === 0) {

        proposalsContainer.innerHTML = `

            <div class="dashboard-card">

                <h2>
                    No Proposals Found
                </h2>

                <p>
                    No proposals have been submitted yet.
                </p>

            </div>

        `;

        return;
    }


    // Display every proposal

    proposals.forEach(function (proposal) {

        const proposalCard =
            document.createElement("div");

        proposalCard.className =
            "dashboard-card";


        proposalCard.innerHTML = `

            <h2>
                ${proposal.jobTitle}
            </h2>

            <p>
                <strong>Freelancer:</strong>
                ${proposal.freelancerName}
            </p>

            <p>
                <strong>Freelancer Email:</strong>
                ${proposal.freelancerEmail}
            </p>

            <p>
                <strong>Client Email:</strong>
                ${proposal.clientEmail || "N/A"}
            </p>

            <p>
                <strong>Cover Letter:</strong>
            </p>

            <p>
                ${proposal.coverLetter}
            </p>

            <p>
                <strong>Proposed Budget:</strong>
                ${proposal.proposedBudget}
            </p>

            <p>
                <strong>Status:</strong>
                ${proposal.status}
            </p>

            <p>
                <strong>Date:</strong>
                ${proposal.date}
            </p>

        `;


        proposalsContainer.appendChild(
            proposalCard
        );

    });

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

displayProposals();