
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUser, logoutUser } from "../utils/auth";
import "../../css/style.css";
import "../../css/jobs.css";

const sampleJobs = [
    {
        id: 1,
        title: "Build a Personal Portfolio Website",
        description:
            "Looking for a freelancer to create a modern and responsive personal portfolio website.",
        skills: ["HTML", "CSS", "JavaScript"],
        budget: "₹5,000 - ₹8,000"
    },
    {
        id: 2,
        title: "Design a Social Media Post",
        description:
            "Need creative social media graphics for a small business marketing campaign.",
        skills: ["Canva", "Graphic Design", "Social Media"],
        budget: "₹1,500 - ₹3,000"
    },
    {
        id: 3,
        title: "Python Data Analysis Project",
        description:
            "Looking for someone to clean and analyze a small dataset and prepare a simple report.",
        skills: ["Python", "Pandas", "Data Analysis"],
        budget: "₹4,000 - ₹7,000"
    },
    {
        id: 4,
        title: "Create a Business Presentation",
        description:
            "Need a professional presentation for a startup business proposal.",
        skills: ["PowerPoint", "Canva", "Presentation Design"],
        budget: "₹2,000 - ₹4,000"
    }
];

function BrowseJobs() {
    const navigate = useNavigate();

    // Get the logged-in user
    const [user] = useState(() => getLoggedInUser());

    // Search state
    const [searchText, setSearchText] = useState("");

    // Load jobs from Local Storage
    const [jobs] = useState(() => {
        const storedJobs = JSON.parse(
            localStorage.getItem("freelanceJobs") || "[]"
        );

        const postedJobs = Array.isArray(storedJobs)
            ? storedJobs
            : [];

        return [...sampleJobs, ...postedJobs];
    });

    // Check login and user role
    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else if (user.role !== "freelancer") {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    // Logout
    function handleLogout() {
        logoutUser();
        navigate("/login");
    }

    // Apply for a job
    function handleApply(jobId) {
        navigate(`/apply-job/${jobId}`);
    }

    // Search and filter jobs
    const filteredJobs = jobs.filter((job) => {
        const search = searchText.toLowerCase();

        return (
            job.title.toLowerCase().includes(search) ||
            job.description.toLowerCase().includes(search) ||
            job.skills.some((skill) =>
                skill.toLowerCase().includes(search)
            )
        );
    });

    // Prevent displaying the page for unauthorized users
    if (!user || user.role !== "freelancer") {
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
                        FREELANCE OPPORTUNITIES
                    </p>

                    <h1>Browse Jobs</h1>

                    <p>
                        Find projects that match your skills and
                        start working with clients.
                    </p>
                </section>

                <section className="job-search">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) =>
                            setSearchText(e.target.value)
                        }
                        placeholder="Search jobs by title or skill..."
                    />
                </section>

                <section className="jobs-grid">
                    {filteredJobs.length === 0 ? (
                        <p>No jobs found.</p>
                    ) : (
                        filteredJobs.map((job) => (
                            <div className="job-card" key={job.id}>
                                <h2>{job.title}</h2>

                                <p className="job-description">
                                    {job.description}
                                </p>

                                <div className="job-details">
                                    {job.skills.map((skill, index) => (
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

                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleApply(job.id)}
                                >
                                    Apply Now
                                </button>
                            </div>
                        ))
                    )}
                </section>
            </main>
        </>
    );
}

export default BrowseJobs;
