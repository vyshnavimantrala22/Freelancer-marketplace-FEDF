import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUser, logoutUser } from "../utils/auth";
import "../../css/style.css";
import "../../css/dashboard.css";

function Dashboard() {
    const navigate = useNavigate();
    const user = getLoggedInUser();

    // Redirect if user is not logged in
    if (!user) {
        navigate("/login");
        return null;
    }

    function handleLogout() {
        logoutUser();
        navigate("/login");
    }

    const freelancerCards = [
        {
            icon: "📋",
            title: "Browse Jobs",
            description: "Explore available projects and find freelance opportunities.",
            link: "/browse-jobs",
            button: "Browse Jobs"
        },
        {
            icon: "📨",
            title: "My Proposals",
            description: "View and track the proposals you have submitted.",
            link: "/my-proposals",
            button: "My Proposals"
        },
        {
            icon: "👤",
            title: "My Profile",
            description: "Manage your freelancer profile and portfolio.",
            link: "/profile",
            button: "My Profile"
        },
        {
            icon: "💼",
            title: "My Projects",
            description: "Track the projects you are currently working on.",
            link: "/my-projects",
            button: "My Projects"
        }
    ];

    const clientCards = [
        {
            icon: "➕",
            title: "Post a Job",
            description: "Create a project and find skilled freelancers.",
            link: "/post-job",
            button: "Post a Job"
        },
        {
            icon: "📁",
            title: "My Posted Jobs",
            description: "View and manage the jobs you have posted.",
            link: "/my-posted-jobs",
            button: "My Posted Jobs"
        },
        {
            icon: "👤",
            title: "My Profile",
            description: "Manage your client profile and account information.",
            link: "/profile",
            button: "My Profile"
        },
        {
            icon: "📨",
            title: "Received Proposals",
            description: "Review proposals submitted by freelancers.",
            link: "/received-proposals",
            button: "Received Proposals"
        },
        {
            icon: "💼",
            title: "My Projects",
            description: "Track projects you have hired freelancers for.",
            link: "/my-client-projects",
            button: "My Projects"
        }
    ];

    const cards =
        user.role === "freelancer" ? freelancerCards : clientCards;

    return (
        <>
            <header className="navbar">
                <div className="logo">FreelanceHub</div>

                <div className="dashboard-nav">
                    <span>Welcome, {user.name}</span>

                    <button
                        onClick={handleLogout}
                        className="btn btn-outline"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <main className="dashboard-container">
                <section className="dashboard-header">
                    <p className="hero-tag">USER MODULE</p>

                    <h1>
                        Welcome, <span>{user.name}</span> 👋
                    </h1>

                    <p>
                        Account Type: {user.role}
                    </p>
                </section>

                <section className="dashboard-grid">
                    {cards.map((card) => (
                        <div
                            className={`dashboard-card ${user.role}-card`}
                            key={card.title}
                        >
                            <div className="dashboard-icon">
                                {card.icon}
                            </div>

                            <h2>{card.title}</h2>

                            <p>{card.description}</p>

                            <Link to={card.link} className="btn btn-primary">
                                {card.button}
                            </Link>
                        </div>
                    ))}
                </section>
            </main>
        </>
    );
}

export default Dashboard;
