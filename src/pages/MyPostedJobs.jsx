import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUser, logoutUser } from "../utils/auth";

import "../../css/style.css";
import "../../css/jobs.css";

function MyPostedJobs() {
    const navigate = useNavigate();

    const [user] = useState(() => getLoggedInUser());

    // Get all posted jobs from Local Storage
    const storedJobs = JSON.parse(
        localStorage.getItem("freelanceJobs") || "[]"
    );

    const postedJobs = Array.isArray(storedJobs)
        ? storedJobs
        : [];

    // Find jobs posted by the current client
    const myJobs = postedJobs.filter(
        (job) => job.clientEmail === user?.email
    );

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

    if (user.role !== "client") {
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
                        CLIENT ACTIVITY
                    </p>

                    <h1>My Posted Jobs</h1>

                    <p>
                        View and manage the projects you have posted.
                    </p>
                </section>

                <section className="jobs-grid">
                    {myJobs.length === 0 ? (
                        <div className="job-card">
                            <h2>No Jobs Posted Yet</h2>

                            <p className="job-description">
                                You have not posted any jobs yet.
                            </p>

                            <Link
                                to="/post-job"
                                className="btn btn-primary"
                            >
                                Post a Job
                            </Link>
                        </div>
                    ) : (
                        myJobs.map((job) => (
                            <div className="job-card" key={job.id}>
                                <h2>{job.title}</h2>

                                <p className="job-description">
                                    {job.description}
                                </p>

                                <div className="job-details">
                                    {Array.isArray(job.skills) &&
                                        job.skills.map((skill, index) => (
                                            <span
                                                className="job-tag"
                                                key={index}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                </div>

                                <p className="job-budget">
                                    Budget: {job.budget}
                                </p>

                                <p className="job-description">
                                    Posted on: {job.date}
                                </p>
                            </div>
                        ))
                    )}
                </section>
            </main>
        </>
    );
}

export default MyPostedJobs;