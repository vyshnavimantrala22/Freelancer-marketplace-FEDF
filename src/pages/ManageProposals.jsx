import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../css/style.css";
import "../../css/dashboard.css";
import "../../css/admin.css";

function ManageProposals() {

    const navigate = useNavigate();

    const [adminLoggedIn] = useState(
        () => localStorage.getItem("adminLoggedIn")
    );

    const [proposals] = useState(
        () => JSON.parse(localStorage.getItem("freelanceProposals")) || []
    );

    useEffect(() => {
        if (adminLoggedIn !== "true") {
            navigate("/admin-login");
        }
    }, [adminLoggedIn, navigate]);

    function handleLogout() {
        localStorage.removeItem("adminLoggedIn");
        navigate("/admin-login");
    }

    if (adminLoggedIn !== "true") return null;

    return (
        <>
            {/* Navigation */}
            <nav className="navbar">
                <div className="navbar-container">

                    <Link to="/" className="logo">
                        FreelanceHub
                    </Link>

                    <div className="nav-right">

                        <Link
                            to="/admin-dashboard"
                            className="nav-link"
                        >
                            Admin Dashboard
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="btn btn-secondary"
                        >
                            Logout
                        </button>

                    </div>
                </div>
            </nav>

            {/* Manage Proposals */}
            <main className="dashboard-page">

                <section className="dashboard-header">

                    <p className="hero-tag">
                        ADMIN MODULE
                    </p>

                    <h1>Manage Proposals</h1>

                    <p>
                        View all proposals submitted by freelancers.
                    </p>

                </section>

                {/* Proposals Container */}
                <section className="dashboard-grid">

                    {proposals.length === 0 ? (

                        <div className="dashboard-card">
                            <h2>No Proposals Found</h2>
                            <p>
                                No proposals have been submitted yet.
                            </p>
                        </div>

                    ) : (

                        proposals.map(proposal => (

                            <div
                                className="dashboard-card"
                                key={proposal.id}
                            >

                                <h2>{proposal.jobTitle}</h2>

                                <p>
                                    <strong>Freelancer:</strong>{" "}
                                    {proposal.freelancerName}
                                </p>

                                <p>
                                    <strong>Freelancer Email:</strong>{" "}
                                    {proposal.freelancerEmail}
                                </p>

                                <p>
                                    <strong>Client Email:</strong>{" "}
                                    {proposal.clientEmail || "N/A"}
                                </p>

                                <p>
                                    <strong>Cover Letter:</strong>
                                </p>

                                <p>{proposal.coverLetter}</p>

                                <p>
                                    <strong>Proposed Budget:</strong>{" "}
                                    {proposal.proposedBudget}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    {proposal.status}
                                </p>

                                <p>
                                    <strong>Date:</strong>{" "}
                                    {proposal.date}
                                </p>

                            </div>

                        ))

                    )}

                </section>

            </main>
        </>
    );
}

export default ManageProposals;