import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUser, logoutUser } from "../utils/auth";
import "../../css/style.css";
import "../../css/jobs.css";

function PostJob() {
    const navigate = useNavigate();
    const user = getLoggedInUser();

    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [jobSkills, setJobSkills] = useState("");
    const [jobBudget, setJobBudget] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else if (user.role !== "client") {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    function handleLogout() {
        logoutUser();
        navigate("/login");
    }

    function handlePostJob(event) {
        event.preventDefault();

        const jobs = JSON.parse(
            localStorage.getItem("freelanceJobs")
        ) || [];

        const skillsArray = jobSkills
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "");

        const newJob = {
            id: Date.now(),
            title: jobTitle.trim(),
            description: jobDescription.trim(),
            skills: skillsArray,
            budget: jobBudget.trim(),
            clientEmail: user.email,
            clientName: user.name,
            date: new Date().toLocaleDateString()
        };

        jobs.push(newJob);

        localStorage.setItem(
            "freelanceJobs",
            JSON.stringify(jobs)
        );

        setMessage("Job posted successfully!");

        setJobTitle("");
        setJobDescription("");
        setJobSkills("");
        setJobBudget("");

        setTimeout(() => {
            navigate("/dashboard");
        }, 1500);
    }

    if (!user || user.role !== "client") {
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
                    <p className="hero-tag">CLIENT MODULE</p>

                    <h1>Post a New Job</h1>

                    <p>
                        Describe your project and find the right freelancer.
                    </p>
                </section>

                <section className="proposal-card">
                    <form onSubmit={handlePostJob}>
                        <div className="form-group">
                            <label>Job Title</label>

                            <input
                                type="text"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                placeholder="Example: Build a Website for My Business"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Job Description</label>

                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                rows="7"
                                placeholder="Describe what you need the freelancer to do..."
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Required Skills</label>

                            <input
                                type="text"
                                value={jobSkills}
                                onChange={(e) => setJobSkills(e.target.value)}
                                placeholder="Example: HTML, CSS, JavaScript"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Budget</label>

                            <input
                                type="text"
                                value={jobBudget}
                                onChange={(e) => setJobBudget(e.target.value)}
                                placeholder="Example: ₹5,000 - ₹10,000"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Post Job
                        </button>

                        {message && (
                            <p className="success">{message}</p>
                        )}
                    </form>
                </section>
            </main>
        </>
    );
}

export default PostJob;