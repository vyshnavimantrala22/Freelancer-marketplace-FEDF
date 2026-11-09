import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../css/style.css";
import "../../css/dashboard.css";
import "../../css/admin.css";

function ManageJobs() {

    const navigate = useNavigate();

    const [adminLoggedIn] = useState(
        () => localStorage.getItem("adminLoggedIn")
    );

    const [jobs, setJobs] = useState(
        () => JSON.parse(localStorage.getItem("freelanceJobs")) || []
    );

    useEffect(() => {
        if (adminLoggedIn !== "true") {
            navigate("/admin-login");
        }
    }, [adminLoggedIn, navigate]);

    function deleteJob(jobId) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) return;

        const updatedJobs = jobs.filter(
            job => job.id !== jobId
        );

        setJobs(updatedJobs);

        localStorage.setItem(
            "freelanceJobs",
            JSON.stringify(updatedJobs)
        );
    }

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

            {/* Manage Jobs */}
            <main className="dashboard-page">

                <section className="dashboard-header">

                    <p className="hero-tag">
                        ADMIN MODULE
                    </p>

                    <h1>Manage Jobs</h1>

                    <p>
                        View and manage all jobs posted on FreelanceHub.
                    </p>

                </section>

                {/* Jobs Container */}
                <section className="dashboard-grid">

                    {jobs.length === 0 ? (

                        <div className="dashboard-card">
                            <h2>No Jobs Found</h2>
                            <p>
                                No jobs have been posted yet.
                            </p>
                        </div>

                    ) : (

                        jobs.map(job => (

                            <div
                                className="dashboard-card"
                                key={job.id}
                            >

                                <h2>{job.title}</h2>

                                <p>{job.description}</p>

                                <p>
                                    <strong>Skills:</strong>{" "}
                                    {Array.isArray(job.skills)
                                        ? job.skills.join(", ")
                                        : job.skills}
                                </p>

                                <p>
                                    <strong>Budget:</strong> {job.budget}
                                </p>

                                <p>
                                    <strong>Client:</strong>{" "}
                                    {job.clientName || "Unknown"}
                                </p>

                                <p>
                                    <strong>Posted:</strong>{" "}
                                    {job.date || "N/A"}
                                </p>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => deleteJob(job.id)}
                                >
                                    Delete Job
                                </button>

                            </div>

                        ))

                    )}

                </section>

            </main>
        </>
    );
}

export default ManageJobs;