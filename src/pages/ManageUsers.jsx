import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../css/style.css";
import "../../css/dashboard.css";
import "../../css/admin.css";

function ManageUsers() {

    const navigate = useNavigate();

    const [adminLoggedIn] = useState(
        () => localStorage.getItem("adminLoggedIn")
    );

    const [users, setUsers] = useState(
        () => JSON.parse(localStorage.getItem("freelanceUsers")) || []
    );

    useEffect(() => {
        if (adminLoggedIn !== "true") {
            navigate("/admin-login");
        }
    }, [adminLoggedIn, navigate]);

    function deleteUser(userId) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        const updatedUsers = users.filter(
            user => user.id !== userId
        );

        setUsers(updatedUsers);

        localStorage.setItem(
            "freelanceUsers",
            JSON.stringify(updatedUsers)
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

            {/* Manage Users */}
            <main className="dashboard-page">

                <section className="dashboard-header">

                    <p className="hero-tag">
                        ADMIN MODULE
                    </p>

                    <h1>Manage Users</h1>

                    <p>
                        View and manage all registered FreelanceHub users.
                    </p>

                </section>

                {/* Users Container */}
                <section className="dashboard-grid">

                    {users.length === 0 ? (

                        <div className="dashboard-card">
                            <h2>No Users Found</h2>
                            <p>
                                No users are currently registered.
                            </p>
                        </div>

                    ) : (

                        users.map(user => (

                            <div
                                className="dashboard-card"
                                key={user.id}
                            >

                                <h2>{user.name}</h2>

                                <p>
                                    <strong>Email:</strong> {user.email}
                                </p>

                                <p>
                                    <strong>Role:</strong> {user.role}
                                </p>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Delete User
                                </button>

                            </div>

                        ))

                    )}

                </section>

            </main>
        </>
    );
}

export default ManageUsers;