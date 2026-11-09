import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUser, logoutUser } from "../utils/auth";

import "../../css/style.css";
import "../../css/dashboard.css";

function MyProjects() {
    const navigate = useNavigate();

    const [user] = useState(() => getLoggedInUser());

    const [projects, setProjects] = useState(() => {
        const storedProjects = JSON.parse(
            localStorage.getItem("freelanceProjects") || "[]"
        );

        return Array.isArray(storedProjects)
            ? storedProjects
            : [];
    });

    const [updates, setUpdates] = useState({});

    if (!user) {
        navigate("/login");
        return null;
    }

    if (user.role !== "freelancer") {
        navigate("/dashboard");
        return null;
    }

    const myProjects = projects.filter(
        (project) => project.freelancerEmail === user.email
    );

    function handleLogout() {
        logoutUser();
        navigate("/login");
    }

    function handleChange(projectId, field, value) {
        setUpdates((previous) => ({
            ...previous,
            [projectId]: {
                ...previous[projectId],
                [field]: value
            }
        }));
    }

    function updateProject(projectId) {
        const updatedProjects = projects.map((project) => {
            if (project.id !== projectId) {
                return project;
            }

            const newStatus =
                updates[projectId]?.status || project.status;

            const newProgress =
                Number(
                    updates[projectId]?.progress ?? project.progress
                );

            let finalStatus = newStatus;

            if (newProgress === 100) {
                finalStatus = "Completed";
            } else if (
                newProgress > 0 &&
                newProgress < 100 &&
                newStatus === "Started"
            ) {
                finalStatus = "In Progress";
            }

            return {
                ...project,
                status: finalStatus,
                progress: newProgress
            };
        });

        setProjects(updatedProjects);

        localStorage.setItem(
            "freelanceProjects",
            JSON.stringify(updatedProjects)
        );

        setUpdates((previous) => ({
            ...previous,
            [projectId]: {}
        }));

        alert("Project updated successfully!");
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
                        FREELANCER ACTIVITY
                    </span>

                    <h1>My Projects</h1>

                    <p>
                        Track your active projects, deadlines,
                        and progress in one place.
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
                                to="/browse-jobs"
                                className="btn btn-primary"
                            >
                                Browse Jobs
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
                                        <strong>Client:</strong>{" "}
                                        {project.clientName}
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

                                    <div className="project-controls">

                                        <div className="project-control">
                                            <label>
                                                Update Status
                                            </label>

                                            <select
                                                value={
                                                    updates[project.id]?.status ??
                                                    project.status
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        project.id,
                                                        "status",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="Started">
                                                    Started
                                                </option>

                                                <option value="In Progress">
                                                    In Progress
                                                </option>

                                                <option value="Completed">
                                                    Completed
                                                </option>
                                            </select>
                                        </div>

                                        <div className="project-control">
                                            <label>
                                                Update Progress
                                            </label>

                                            <select
                                                value={
                                                    updates[project.id]?.progress ??
                                                    project.progress
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        project.id,
                                                        "progress",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="0">0%</option>
                                                <option value="25">25%</option>
                                                <option value="50">50%</option>
                                                <option value="75">75%</option>
                                                <option value="100">100%</option>
                                            </select>
                                        </div>

                                    </div>

                                    <button
                                        className="btn btn-primary project-update-button"
                                        onClick={() =>
                                            updateProject(project.id)
                                        }
                                    >
                                        Update Project
                                    </button>

                                </div>
                            </div>
                        ))
                    )}

                </section>
            </main>
        </>
    );
}

export default MyProjects;