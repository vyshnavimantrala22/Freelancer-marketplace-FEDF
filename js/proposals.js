/* =================================
    FREELANCEHUB MY PROPOSALS
================================= */

// Check logged-in user

const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {

    window.location.href = "../login.html";

}


// Get proposals from Local Storage

const proposals =
    JSON.parse(
        localStorage.getItem("freelanceProposals")
    ) || [];


// Find container

const proposalsContainer =
    document.getElementById("proposalsContainer");


// Get proposals submitted by current freelancer

const myProposals =
    proposals.filter(function (proposal) {

        return proposal.freelancerEmail ===
            loggedInUser.email;

    });


// Display proposals

if (myProposals.length === 0) {

    proposalsContainer.innerHTML = `

        <div class="job-card">

            <h2>
                No Proposals Yet
            </h2>

            <p class="job-description">
                You have not submitted any proposals yet.
            </p>

            <a
                href="browse-jobs.html"
                class="btn btn-primary"
            >
                Browse Jobs
            </a>

        </div>

    `;

}
else {

    myProposals.forEach(function (proposal) {

        const proposalCard =
            document.createElement("div");

        proposalCard.className =
            "job-card";

        proposalCard.innerHTML = `

            <h2>
                ${proposal.jobTitle}
            </h2>

            <p class="job-description">

                <strong>
                    Cover Letter:
                </strong>

                <br>

                ${proposal.coverLetter}

            </p>

            <div class="job-details">

                <span class="job-tag">
                    Proposed: ₹${proposal.proposedBudget}
                </span>

                <span class="job-tag">
                    Status: ${proposal.status}
                </span>

                <span class="job-tag">
                    Submitted: ${proposal.date}
                </span>

            </div>

        `;

        proposalsContainer.appendChild(
            proposalCard
        );

    });

}


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