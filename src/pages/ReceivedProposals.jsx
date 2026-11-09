import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUser, logoutUser } from "../utils/auth";

import "../../css/style.css";
import "../../css/dashboard.css";
import "../../css/jobs.css";

function ReceivedProposals() {
    const navigate = useNavigate();

    const [user] = useState(() => getLoggedInUser());

    // Get proposals from Local Storage
    const [proposals, setProposals] = useState(() => {
        const storedProposals = JSON.parse(
            localStorage.getItem("freelanceProposals") || "[]"
        );

        return Array.isArray(storedProposals)
            ? storedProposals
            : [];
    });

    // Store project deadlines for individual proposals
    const [deadlines, setDeadlines] = useState({});

    // Check login and role
    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else if (user.role !== "client") {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    // Get proposals received by the current client
    const myProposals = proposals.filter(
        (proposal) => proposal.clientEmail === user?.email
    );

    // Logout
    function handleLogout() {
        logoutUser();
        navigate("/login");
    }

    // Update deadline
    function handleDeadlineChange(proposalId, value) {
        setDeadlines((previousDeadlines) => ({
            ...previousDeadlines,
            [proposalId]: value
        }));
    }

    // Accept proposal and create project
    function acceptProposal(proposalId) {
        const proposal = proposals.find(
            (item) => item.id === proposalId
        );

        if (!proposal) {
            alert("Proposal not found.");
            return;
        }

        const deadline = deadlines[proposalId];

        if (!deadline) {
            alert("Please select a project deadline.");
            return;
        }

        const confirmAccept = window.confirm(
            "Are you sure you want to accept this proposal?"
        );

        if (!confirmAccept) {
            return;
        }

        // Update proposal status
        const updatedProposals = proposals.map((item) =>
            item.id === proposalId
                ? { ...item, status: "Accepted" }
                : item
        );

        localStorage.setItem(
            "freelanceProposals",
            JSON.stringify(updatedProposals)
        );

        setProposals(updatedProposals);

        // Get existing projects
        const storedProjects = JSON.parse(
            localStorage.getItem("freelanceProjects") || "[]"
        );

        const projects = Array.isArray(storedProjects)
            ? storedProjects
            : [];

        // Check whether project already exists
        const existingProject = projects.find(
            (project) => project.proposalId === proposal.id
        );

        // Create a new project if it does not exist
        if (!existingProject) {
            const newProject = {
                id: Date.now(),
                proposalId: proposal.id,
                jobId: proposal.jobId,
                title: proposal.jobTitle,
                clientName: user.name,
                clientEmail: user.email,
                freelancerName: proposal.freelancerName,
                freelancerEmail: proposal.freelancerEmail,
                budget: proposal.proposedBudget,
                status: "Started",
                progress: 0,
                startDate: new Date().toLocaleDateString(),
                deadline: deadline
            };

            projects.push(newProject);

            localStorage.setItem(
                "freelanceProjects",
                JSON.stringify(projects)
            );
        }

        alert(
            "Proposal accepted! Project created successfully."
        );
    }

    // Prevent unauthorized users from viewing the page
    if (!user || user.role !== "client") {
        return null;
    }

    return (
        <>
            <nav className="navbar">
                <div className="container nav-container">
                    <Link to="/dashboard" className="logo">
                        FreelanceHub
                    </Link>

                    <div className="nav-links">
                        <Link to="/dashboard">
                            Dashboard
                        </Link>

                        <button
                            id="logoutButton"
                            className="btn btn-outline"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="dashboard-page">
                <section className="proposal-page-header">
                    <span className="proposal-page-label">
                        CLIENT ACTIVITY
                    </span>

                    <h1>Received Proposals</h1>

                    <p>
                        Review proposals submitted by freelancers
                        for your posted jobs.
                    </p>
                </section>

                <section className="proposals-grid">
                    {myProposals.length === 0 ? (
                        <div className="dashboard-card proposals-empty">
                            <h2>No Proposals Yet</h2>

                            <p>
                                You have not received any proposals
                                for your jobs.
                            </p>

                            <Link
                                to="/my-posted-jobs"
                                className="btn btn-primary"
                            >
                                View My Jobs
                            </Link>
                        </div>
                    ) : (
                        myProposals.map((proposal) => (
                            <div
                                className="proposal-card"
                                key={proposal.id}
                            >
                                <h2>{proposal.jobTitle}</h2>

                                <div className="proposal-info">
                                    <p>
                                        <strong>Freelancer:</strong>{" "}
                                        {proposal.freelancerName}
                                    </p>

                                    <p>
                                        <strong>Email:</strong>{" "}
                                        {proposal.freelancerEmail}
                                    </p>

                                    <p>
                                        <strong>Date:</strong>{" "}
                                        {proposal.date}
                                    </p>
                                </div>

                                <div className="proposal-cover">
                                    <strong>Cover Letter</strong>

                                    <p>{proposal.coverLetter}</p>
                                </div>

                                <p className="proposal-budget">
                                    Proposed Budget: ₹
                                    {proposal.proposedBudget}
                                </p>

                                {proposal.status === "Accepted" ? (
                                    <span className="proposal-status accepted">
                                        Accepted
                                    </span>
                                ) : (
                                    <>
                                        <span className="proposal-status">
                                            {proposal.status || "Pending"}
                                        </span>

                                        <div className="proposal-deadline">
                                            <label
                                                htmlFor={`deadline-${proposal.id}`}
                                            >
                                                Project Deadline
                                            </label>

                                            <input
                                                type="date"
                                                id={`deadline-${proposal.id}`}
                                                min={new Date()
                                                    .toLocaleDateString("en-CA")}
                                                value={
                                                    deadlines[proposal.id] || ""
                                                }
                                                onChange={(e) =>
                                                    handleDeadlineChange(
                                                        proposal.id,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="proposal-action">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    acceptProposal(proposal.id)
                                                }
                                            >
                                                Accept Proposal
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </section>
            </main>
        </>
    );
}

export default ReceivedProposals;
