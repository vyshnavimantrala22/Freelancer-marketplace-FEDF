import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../index.css";
import "../../css/style.css";
import "../../css/dashboard.css";
import "../../css/admin.css";

function AdminDashboard() {

    const navigate = useNavigate();

    const adminLoggedIn =
        localStorage.getItem("adminLoggedIn");

    const users =
        JSON.parse(localStorage.getItem("freelanceUsers")) || [];

    const jobs =
        JSON.parse(localStorage.getItem("freelanceJobs")) || [];

    const proposals =
        JSON.parse(localStorage.getItem("freelanceProposals")) || [];

    useEffect(() => {
        if (adminLoggedIn !== "true") {
            navigate("/admin-login");
        }
    }, [adminLoggedIn, navigate]);

    function handleLogout() {
        localStorage.removeItem("adminLoggedIn");
        navigate("/admin-login");
    }

    if (adminLoggedIn !== "true") {
        return null;
    }

    return (
        <>
            {/* Navigation */}
            <nav className="navbar">
                <div className="navbar-container">

                    <Link to="/" className="logo">
                        FreelanceHub
                    </Link>

                    <div className="nav-right">
                        <span>Admin Panel</span>

                        <button
                            onClick={handleLogout}
                            className="btn btn-secondary"
                        >
                            Logout
                        </button>
                    </div>

                </div>
            </nav>

            {/* Admin Dashboard */}
            <main className="dashboard-page">

                <section className="dashboard-header">

                    <p className="hero-tag">
                        ADMIN MODULE
                    </p>

                    <h1>Admin Dashboard</h1>

                    <p>
                        Manage users, jobs, and proposals on FreelanceHub.
                    </p>

                </section>

                {/* Statistics */}
                <section className="dashboard-grid">

                    <div className="dashboard-card">
                        <h2>Total Users</h2>
                        <p className="dashboard-number">
                            {users.length}
                        </p>
                    </div>

                    <div className="dashboard-card">
                        <h2>Total Jobs</h2>
                        <p className="dashboard-number">
                            {jobs.length}
                        </p>
                    </div>

                    <div className="dashboard-card">
                        <h2>Total Proposals</h2>
                        <p className="dashboard-number">
                            {proposals.length}
                        </p>
                    </div>

                </section>

                {/* Admin Actions */}
                <section className="dashboard-section">

                    <h2>Administration</h2>

                    <div className="dashboard-grid">

                        <div className="dashboard-card">
                            <h2>Manage Users</h2>
                            <p>
                                View and manage registered users.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/manage-users")}
                            >
                                Manage Users
                            </button>
                        </div>

                        <div className="dashboard-card">
                            <h2>Manage Jobs</h2>
                            <p>
                                View and manage posted jobs.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/manage-jobs")}
                            >
                                Manage Jobs
                            </button>
                        </div>

                        <div className="dashboard-card">
                            <h2>View Proposals</h2>
                            <p>
                                View proposals submitted by freelancers.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/manage-proposals")}
                            >
                                View Proposals
                            </button>
                        </div>

                    </div>

                </section>

            </main>
        </>
    );
}

export default AdminDashboard;