import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUser, logoutUser } from "../utils/auth";

import "../../css/style.css";
import "../../css/dashboard.css";

function Profile() {
    const navigate = useNavigate();

    const [user] = useState(() => getLoggedInUser());

    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState(() => {
        if (!user) return {
            name: "",
            bio: "",
            skills: "",
            portfolio: "",
            company: ""
        };

        const profiles = JSON.parse(
            localStorage.getItem("freelanceProfiles") || "{}"
        );

        const savedProfile = profiles[user.email] || {};

        return {
            name: savedProfile.name || user.name || "",
            bio: savedProfile.bio || "",
            skills: savedProfile.skills || "",
            portfolio: savedProfile.portfolio || "",
            company: savedProfile.company || ""
        };
    });

    if (!user) {
        navigate("/login");
        return null;
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const profileData = {
            name: formData.name.trim(),
            email: user.email,
            role: user.role,
            bio: formData.bio.trim(),
            skills: user.role === "freelancer"
                ? formData.skills.trim() : "",
            portfolio: user.role === "freelancer"
                ? formData.portfolio.trim() : "",
            company: user.role === "client"
                ? formData.company.trim() : ""
        };

        const profiles = JSON.parse(
            localStorage.getItem("freelanceProfiles") || "{}"
        );

        profiles[user.email] = profileData;

        localStorage.setItem(
            "freelanceProfiles",
            JSON.stringify(profiles)
        );

        const updatedUser = {
            ...user,
            name: profileData.name
        };

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(updatedUser)
        );

        const users = JSON.parse(
            localStorage.getItem("freelanceUsers") || "[]"
        );

        const updatedUsers = users.map((item) =>
            item.email === user.email
                ? { ...item, name: profileData.name }
                : item
        );

        localStorage.setItem(
            "freelanceUsers",
            JSON.stringify(updatedUsers)
        );

        setMessage("Profile saved successfully!");

        setTimeout(() => {
            setMessage("");
        }, 3000);
    }

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
                        <Link to="/dashboard">Dashboard</Link>

                        <button
                            className="btn btn-secondary"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="dashboard-page">
                <section className="dashboard-header">
                    <p className="hero-tag">USER MODULE</p>
                    <h1>My Profile</h1>
                    <p>
                        Manage your FreelanceHub profile information.
                    </p>
                </section>

                <section className="dashboard-section">
                    <div className="dashboard-card profile-card">
                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <label>Account Type</label>
                                <input
                                    type="text"
                                    value={
                                        user.role.charAt(0).toUpperCase() +
                                        user.role.slice(1)
                                    }
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <label>About Me</label>
                                <textarea
                                    name="bio"
                                    rows="5"
                                    placeholder="Tell us a little about yourself..."
                                    value={formData.bio}
                                    onChange={handleChange}
                                />
                            </div>

                            {user.role === "freelancer" && (
                                <>
                                    <div className="form-group">
                                        <label>Skills</label>
                                        <input
                                            type="text"
                                            name="skills"
                                            placeholder="Example: HTML, CSS, JavaScript, Python"
                                            value={formData.skills}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Portfolio Information</label>
                                        <textarea
                                            name="portfolio"
                                            rows="4"
                                            placeholder="Describe your projects, portfolio, or previous work..."
                                            value={formData.portfolio}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}

                            {user.role === "client" && (
                                <div className="form-group">
                                    <label>Company / Organization</label>
                                    <input
                                        type="text"
                                        name="company"
                                        placeholder="Enter company or organization name"
                                        value={formData.company}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            <p style={{ color: "green" }}>
                                {message}
                            </p>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Save Profile
                            </button>

                        </form>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Profile;