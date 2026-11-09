import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../css/style.css";
import "../../css/auth.css";
import "../../css/admin.css";

function AdminLogin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const ADMIN_EMAIL = "admin@freelancehub.com";
    const ADMIN_PASSWORD = "admin123";

    function handleSubmit(e) {
        e.preventDefault();

        if (
            email.trim() === ADMIN_EMAIL &&
            password === ADMIN_PASSWORD
        ) {
            localStorage.setItem("adminLoggedIn", "true");

            setMessage("Login successful!");
            setSuccess(true);

            setTimeout(() => {
                navigate("/admin-dashboard");
            }, 500);

        } else {
            setMessage("Invalid admin email or password.");
            setSuccess(false);
        }
    }

    return (
        <main className="auth-page">

            <section className="auth-card">

                <div className="auth-header">
                    <p className="hero-tag">
                        ADMIN MODULE
                    </p>

                    <h1>Admin Login</h1>

                    <p>
                        Access the FreelanceHub administration panel.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter admin email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter admin password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Login as Admin
                    </button>

                    <p style={{
                        color: success ? "green" : "#dc2626"
                    }}>
                        {message}
                    </p>

                </form>

                <div className="auth-footer">
                    <Link to="/">
                        ← Back to FreelanceHub
                    </Link>
                </div>

            </section>

        </main>
    );
}

export default AdminLogin;