
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../utils/auth";
import "../../css/auth.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    function handleLogin(event) {
        event.preventDefault();

        const result = loginUser(email.trim(), password);

        setMessage(result.message);
        setMessageType(result.success ? "success" : "error");

        if (result.success) {
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Welcome Back</h2>
                <p>Login to your FreelanceHub account</p>

                <form onSubmit={handleLogin}>
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
                        placeholder="Enter your password"
                        required
                    />

                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>

                {message && (
                    <p className={messageType}>{message}</p>
                )}

                <p>
                    Don't have an account?{" "}
                    <Link to="/signup">Sign Up</Link>
                </p>

                <Link to="/">Back to Home</Link>
            </div>
        </div>
    );
}

export default Login;
