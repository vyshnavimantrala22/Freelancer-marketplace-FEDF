import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUser, logoutUser } from "../utils/auth";

import "../../css/style.css";
import "../../css/dashboard.css";

function MyClientProjects() {
    const navigate = useNavigate();

    const [user] = useState(() => getLoggedInUser());

    const [projects] = useState(() => {
        const storedProjects = JSON.parse(
            localStorage.getItem("freelanceProjects") || "[]"
        );

        return Array.isArray(storedProjects)
            ? storedProjects
            : [];
    });

    if (!user) {
        navigate("/login");
        return null;
    }

    if (user.role !== "client") {
        navigate("/dashboard");
        return null;
    }

    const myProjects = projects.filter(
        (project) => project.clientEmail === user.email
    );

    function handleLogout() {
        logoutUser();
        navigate("/login");
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

                <section className="projects-page-header">
                    <span className="projects-page-label">
                        CLIENT ACTIVITY
                    </span>

                    <h1>My Projects</h1>

                    <p>
                        Track the projects you have hired
                        freelancers for, including deadlines,
                        status, and progress.
                    </p>
                </section>

                <section className="projects-grid">

                    {myProjects.length === 0 ? (
                        <div className="dashboard-card projects-empty">
                            <h2>No Projects Yet</h2>

                            <p>
                                You currently have no active projects.
                            </p>

                            <Link
                                to="/post-job"
                                className="btn btn-primary"
                            >
                                Post a Job
                            </Link>
                        </div>
                    ) : (
                        myProjects.map((project) => (
                            <div
                                className="project-card"
                                key={project.id}
                            >

                                <h2>{project.title}</h2>

                                <div className="project-client">
                                    <p>
                                        <strong>Freelancer:</strong>{" "}
                                        {project.freelancerName}
                                    </p>
                                </div>

                                <div className="project-details">

                                    <div className="project-detail">
                                        <span className="project-detail-label">
                                            Budget
                                        </span>

                                        <span className="project-detail-value">
                                            ₹{project.budget}
                                        </span>
                                    </div>

                                    <div className="project-detail">
                                        <span className="project-detail-label">
                                            Start Date
                                        </span>

                                        <span className="project-detail-value">
                                            {project.startDate}
                                        </span>
                                    </div>

                                    <div className="project-detail">
                                        <span className="project-detail-label">
                                            Deadline
                                        </span>

                                        <span className="project-detail-value">
                                            {project.deadline}
                                        </span>
                                    </div>

                                    <div className="project-detail">
                                        <span className="project-detail-label">
                                            Project Type
                                        </span>

                                        <span className="project-detail-value">
                                            Freelance Project
                                        </span>
                                    </div>

                                </div>

                                <div className="project-status-row">
                                    <span className="project-status-label">
                                        Project Status
                                    </span>

                                    <span className="project-status">
                                        {project.status}
                                    </span>
                                </div>

                                <div className="project-progress">

                                    <div className="project-progress-header">
                                        <strong>Project Progress</strong>

                                        <span className="project-progress-percent">
                                            {project.progress}%
                                        </span>
                                    </div>

                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{
                                                width: `${project.progress}%`
                                            }}
                                        />
                                    </div>

                                </div>

                            </div>
                        ))
                    )}

                </section>

            </main>
        </>
    );
}

export default MyClientProjects;