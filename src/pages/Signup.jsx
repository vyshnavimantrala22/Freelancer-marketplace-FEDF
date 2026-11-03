import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../utils/auth";
import "../../css/auth.css";

function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("freelancer");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    function handleSignup(event) {
        event.preventDefault();

        const result = signupUser(
            name.trim(),
            email.trim(),
            password,
            role
        );

        setMessage(result.message);
        setMessageType(result.success ? "success" : "error");

        if (result.success) {
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Create Account</h2>
                <p>Join FreelanceHub today!</p>

                <form onSubmit={handleSignup}>
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        required
                    />

                    <label>Select Account Type</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="freelancer">Freelancer</option>
                        <option value="client">Client</option>
                    </select>

                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </form>

                {message && (
                    <p className={messageType}>
                        {message}
                    </p>
                )}

                <p>
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>

                <Link to="/">Back to Home</Link>
            </div>
        </div>
    );
}

export default Signup;