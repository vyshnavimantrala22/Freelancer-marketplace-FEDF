/* =================================
    FREELANCEHUB JOBS
================================= */

// Sample jobs

const sampleJobs = [
    {
        id: 1,
        title: "Build a Personal Portfolio Website",
        description:
            "Looking for a freelancer to create a modern and responsive personal portfolio website.",
        skills: ["HTML", "CSS", "JavaScript"],
        budget: "₹5,000 - ₹8,000"
    },

    {
        id: 2,
        title: "Design a Social Media Post",
        description:
            "Need creative social media graphics for a small business marketing campaign.",
        skills: ["Canva", "Graphic Design", "Social Media"],
        budget: "₹1,500 - ₹3,000"
    },

    {
        id: 3,
        title: "Python Data Analysis Project",
        description:
            "Looking for someone to clean and analyze a small dataset and prepare a simple report.",
        skills: ["Python", "Pandas", "Data Analysis"],
        budget: "₹4,000 - ₹7,000"
    },

    {
        id: 4,
        title: "Create a Business Presentation",
        description:
            "Need a professional presentation for a startup business proposal.",
        skills: ["PowerPoint", "Canva", "Presentation Design"],
        budget: "₹2,000 - ₹4,000"
    }
];


// Get jobs posted by clients

const postedJobs =
    JSON.parse(
        localStorage.getItem("freelanceJobs")
    ) || [];


// Combine sample jobs and client-posted jobs

const jobs =
    sampleJobs.concat(postedJobs);


// Get the jobs container from HTML

const jobsContainer =
    document.getElementById("jobsContainer");


// Display jobs

function displayJobs(jobList) {

    jobsContainer.innerHTML = "";


    if (jobList.length === 0) {

        jobsContainer.innerHTML = `
            <p>No jobs found.</p>
        `;

        return;
    }


    jobList.forEach(function (job) {

        const jobCard =
            document.createElement("div");


        jobCard.className = "job-card";


        jobCard.innerHTML = `

            <h2>
                ${job.title}
            </h2>

            <p class="job-description">
                ${job.description}
            </p>

            <div class="job-details">

                ${job.skills.map(function (skill) {

                    return `
                        <span class="job-tag">
                            ${skill}
                        </span>
                    `;

                }).join("")}

            </div>

            <p class="job-budget">
                Budget: ${job.budget}
            </p>

            <button
                class="btn btn-primary"
                onclick="applyForJob(${job.id})"
            >
                Apply Now
            </button>

        `;


        jobsContainer.appendChild(jobCard);

    });

}


// Display all jobs when page loads

displayJobs(jobs);


// Search jobs

const jobSearch =
    document.getElementById("jobSearch");


jobSearch.addEventListener(
    "input",
    function () {

        const searchText =
            jobSearch.value.toLowerCase();


        const filteredJobs =
            jobs.filter(function (job) {

                return (

                    job.title
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    job.description
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    job.skills.some(function (skill) {

                        return skill
                            .toLowerCase()
                            .includes(searchText);

                    })

                );

            });


        displayJobs(filteredJobs);

    }
);


// Apply for a job

function applyForJob(jobId) {

    window.location.href =
        "apply-job.html?jobId=" + jobId;

}