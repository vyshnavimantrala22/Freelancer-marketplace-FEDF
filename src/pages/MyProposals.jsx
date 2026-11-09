import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUser, logoutUser } from "../utils/auth";

import "../../css/style.css";
import "../../css/jobs.css";

function MyProposals() {
    const navigate = useNavigate();

    const [user] = useState(() => getLoggedInUser());

    const proposals = JSON.parse(
        localStorage.getItem("freelanceProposals") || "[]"
    );

    // Get proposals submitted by the logged-in freelancer
    const myProposals = Array.isArray(proposals)
        ? proposals.filter(
            (proposal) => proposal.freelancerEmail === user?.email
        )
        : [];

    // Logout
    function handleLogout() {
        logoutUser();
        navigate("/login");
    }

    // Check login and role
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
                    <Link to="/dashboard" className="btn btn-outline">
                        ← Dashboard
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
                    <p className="hero-tag">
                        FREELANCER ACTIVITY
                    </p>

                    <h1>My Proposals</h1>

                    <p>
                        View and track the proposals you have submitted.
                    </p>
                </section>

                <section className="jobs-grid">
                    {myProposals.length === 0 ? (
                        <div className="job-card">
                            <h2>No Proposals Yet</h2>

                            <p className="job-description">
                                You have not submitted any proposals yet.
                            </p>

                            <Link
                                to="/browse-jobs"
                                className="btn btn-primary"
                            >
                                Browse Jobs
                            </Link>
                        </div>
                    ) : (
                        myProposals.map((proposal) => (
                            <div
                                className="job-card"
                                key={proposal.id}
                            >
                                <h2>{proposal.jobTitle}</h2>

                                <p className="job-description">
                                    <strong>Cover Letter:</strong>
                                    <br />
                                    {proposal.coverLetter}
                                </p>

                                <div className="job-details">
                                    <span className="job-tag">
                                        Proposed: ₹{proposal.proposedBudget}
                                    </span>

                                    <span className="job-tag">
                                        Status: {proposal.status}
                                    </span>

                                    <span className="job-tag">
                                        Submitted: {proposal.date}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </section>
            </main>
        </>
    );
}

export default MyProposals;