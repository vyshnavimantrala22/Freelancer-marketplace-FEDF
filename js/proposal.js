/* =================================
    FREELANCEHUB PROPOSAL
================================= */

const loggedInUser =
    JSON.parse(
        localStorage.getItem("loggedInUser")
    );

if (!loggedInUser) {
    window.location.href =
        "../login.html";
}


/* =================================
    GET JOB ID FROM URL
================================= */

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const jobId =
    Number(
        urlParams.get("jobId")
    );


/* =================================
    SAMPLE JOBS
================================= */

const sampleJobs = [
    {
        id: 1,
        title: "Build a Personal Portfolio Website",
        description:
            "Looking for a freelancer to create a modern and responsive personal portfolio website.",
        skills: [
            "HTML",
            "CSS",
            "JavaScript"
        ],
        budget:
            "₹5,000 - ₹8,000"
    },

    {
        id: 2,
        title: "Design a Social Media Post",
        description:
            "Need creative social media graphics for a small business marketing campaign.",
        skills: [
            "Canva",
            "Graphic Design",
            "Social Media"
        ],
        budget:
            "₹1,500 - ₹3,000"
    },

    {
        id: 3,
        title: "Python Data Analysis Project",
        description:
            "Looking for someone to clean and analyze a small dataset and prepare a simple report.",
        skills: [
            "Python",
            "Pandas",
            "Data Analysis"
        ],
        budget:
            "₹4,000 - ₹7,000"
    },

    {
        id: 4,
        title: "Create a Business Presentation",
        description:
            "Need a professional presentation for a startup business proposal.",
        skills: [
            "PowerPoint",
            "Canva",
            "Presentation Design"
        ],
        budget:
            "₹2,000 - ₹4,000"
    }
];


/* =================================
    GET POSTED JOBS
================================= */

const postedJobs =
    JSON.parse(
        localStorage.getItem(
            "freelanceJobs"
        )
    ) || [];


/* =================================
    COMBINE ALL JOBS
================================= */

const allJobs =
    sampleJobs.concat(
        postedJobs
    );


/* =================================
    FIND SELECTED JOB
================================= */

const selectedJob =
    allJobs.find(
        function (job) {
            return job.id === jobId;
        }
    );


/* =================================
    DISPLAY JOB
================================= */

if (selectedJob) {

    document.getElementById(
        "jobTitle"
    ).textContent =
        selectedJob.title;

    document.getElementById(
        "jobDescription"
    ).textContent =
        selectedJob.description;

    document.getElementById(
        "jobBudget"
    ).textContent =
        "Client Budget: " +
        selectedJob.budget;

} else {

    document.getElementById(
        "jobTitle"
    ).textContent =
        "Job Not Found";

    document.getElementById(
        "jobDescription"
    ).textContent =
        "The selected job could not be found.";

    document.getElementById(
        "jobBudget"
    ).textContent =
        "";
}


/* =================================
    PROPOSAL FORM
================================= */

const proposalForm =
    document.getElementById(
        "proposalForm"
    );


proposalForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        /* -----------------------------
            CHECK JOB
        ----------------------------- */

        if (!selectedJob) {

            alert(
                "Job not found."
            );

            return;
        }


        /* -----------------------------
            CHECK CLIENT
        ----------------------------- */

        if (!selectedJob.clientEmail) {

            alert(
                "This is a sample job and does not have a client account. Please apply to a job posted by a client."
            );

            return;
        }


        /* -----------------------------
            GET FORM DATA
        ----------------------------- */

        const coverLetter =
            document.getElementById(
                "coverLetter"
            ).value.trim();


        const proposedBudget =
            document.getElementById(
                "proposedBudget"
            ).value.trim();


        if (!coverLetter) {

            alert(
                "Please enter a cover letter."
            );

            return;
        }


        if (!proposedBudget) {

            alert(
                "Please enter your proposed budget."
            );

            return;
        }


        /* -----------------------------
            GET EXISTING PROPOSALS
        ----------------------------- */

        let proposals =
            JSON.parse(
                localStorage.getItem(
                    "freelanceProposals"
                )
            ) || [];


        /* -----------------------------
            CREATE NEW PROPOSAL
        ----------------------------- */

        const newProposal = {

            id:
                Date.now(),

            jobId:
                selectedJob.id,

            jobTitle:
                selectedJob.title,

            clientEmail:
                selectedJob.clientEmail,

            clientName:
                selectedJob.clientName,

            freelancerEmail:
                loggedInUser.email,

            freelancerName:
                loggedInUser.name,

            coverLetter:
                coverLetter,

            proposedBudget:
                proposedBudget,

            status:
                "Pending",

            date:
                new Date().toLocaleDateString()
        };


        /* -----------------------------
            SAVE PROPOSAL
        ----------------------------- */

        proposals.push(
            newProposal
        );

        localStorage.setItem(
            "freelanceProposals",
            JSON.stringify(
                proposals
            )
        );


        /* -----------------------------
            SUCCESS MESSAGE
        ----------------------------- */

        document.getElementById(
            "proposalMessage"
        ).textContent =
            "Proposal submitted successfully!";


        proposalForm.reset();


        /* -----------------------------
            GO TO DASHBOARD
        ----------------------------- */

        setTimeout(
            function () {

                window.location.href =
                    "user-dashboard.html";

            },
            1500
        );
    }
);


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