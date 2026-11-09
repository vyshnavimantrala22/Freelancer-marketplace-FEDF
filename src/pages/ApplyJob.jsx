
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getLoggedInUser, logoutUser } from "../utils/auth";

import "../../css/style.css";
import "../../css/jobs.css";

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

function ApplyJob() {
    const navigate = useNavigate();
    const { jobId } = useParams();

    const [user] = useState(() => getLoggedInUser());

    const [coverLetter, setCoverLetter] = useState("");
    const [proposedBudget, setProposedBudget] = useState("");
    const [message, setMessage] = useState("");

    const storedJobs = JSON.parse(
        localStorage.getItem("freelanceJobs") || "[]"
    );

    const postedJobs = Array.isArray(storedJobs) ? storedJobs : [];

    const allJobs = [...sampleJobs, ...postedJobs];

    const selectedJob = allJobs.find(
        (job) => String(job.id) === String(jobId)
    );

    // Logout
    function handleLogout() {
        logoutUser();
        navigate("/login");
    }

    // Submit proposal
    function handleSubmit(event) {
        event.preventDefault();

        if (!selectedJob) {
            setMessage("Job not found.");
            return;
        }

        if (!selectedJob.clientEmail) {
            setMessage(
                "This is a sample job and does not have a client account. Please apply to a job posted by a client."
            );
            return;
        }

        if (!coverLetter.trim()) {
            setMessage("Please enter a cover letter.");
            return;
        }

        if (!proposedBudget || Number(proposedBudget) <= 0) {
            setMessage("Please enter a valid proposed budget.");
            return;
        }

        const storedProposals = JSON.parse(
            localStorage.getItem("freelanceProposals") || "[]"
        );

        const proposals = Array.isArray(storedProposals)
            ? storedProposals
            : [];

        const newProposal = {
            id: Date.now(),
            jobId: selectedJob.id,
            jobTitle: selectedJob.title,
            clientEmail: selectedJob.clientEmail,
            clientName: selectedJob.clientName,
            freelancerEmail: user.email,
            freelancerName: user.name,
            coverLetter: coverLetter.trim(),
            proposedBudget: proposedBudget,
            status: "Pending",
            date: new Date().toLocaleDateString()
        };

        proposals.push(newProposal);

        localStorage.setItem(
            "freelanceProposals",
            JSON.stringify(proposals)
        );

        setMessage("Proposal submitted successfully!");

        setCoverLetter("");
        setProposedBudget("");

        setTimeout(() => {
            navigate("/dashboard");
        }, 1500);
    }

    if (!user) {
        navigate("/login");
        return null;
    }

    if (user.role !== "freelancer") {
        navigate("/dashboard");
        return null;
    }

    return (
        <>
            <header className="navbar">
                <div className="logo">FreelanceHub</div>

                <div className="dashboard-nav">
                    <Link to="/browse-jobs" className="btn btn-outline">
                        ← Browse Jobs
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="btn btn-outline"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="jobs-container">
                <section className="jobs-header">
                    <p className="hero-tag">JOB APPLICATION</p>

                    <h1>Submit Your Proposal</h1>

                    <p>
                        Tell the client why you are the right freelancer
                        for this project.
                    </p>
                </section>

                <section className="proposal-card">
                    <div className="selected-job">
                        {selectedJob ? (
                            <>
                                <h2>{selectedJob.title}</h2>

                                <p>{selectedJob.description}</p>

                                <p className="job-budget">
                                    Client Budget: {selectedJob.budget}
                                </p>
                            </>
                        ) : (
                            <>
                                <h2>Job Not Found</h2>

                                <p>
                                    The selected job could not be found.
                                </p>
                            </>
                        )}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="coverLetter">
                                Cover Letter
                            </label>

                            <textarea
                                id="coverLetter"
                                rows="7"
                                value={coverLetter}
                                onChange={(e) =>
                                    setCoverLetter(e.target.value)
                                }
                                placeholder="Explain your skills, experience and why you are suitable for this project..."
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="proposedBudget">
                                Your Proposed Budget
                            </label>

                            <input
                                type="number"
                                id="proposedBudget"
                                min="1"
                                value={proposedBudget}
                                onChange={(e) =>
                                    setProposedBudget(e.target.value)
                                }
                                placeholder="Enter amount in ₹"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!selectedJob}
                        >
                            Submit Proposal
                        </button>

                        <p id="proposalMessage">{message}</p>
                    </form>
                </section>
            </main>
        </>
    );
}

export default ApplyJob;
