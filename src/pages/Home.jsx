import { Link } from "react-router-dom";

function Home() {
    return (
    <>
      {/* Navbar */}
        <header className="navbar">
        <Link to="/" className="logo">FreelanceHub</Link>

        <nav>
            <a href="#home">Home</a>
            <a href="#categories">Categories</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#about">About</a>
        </nav>

        <div className="nav-buttons">
            <Link to="/login" className="btn btn-outline">
            Login
            </Link>
            <Link to="/signup" className="btn btn-primary">
            Get Started
            </Link>
        </div>
        </header>

      {/* Hero */}
        <section className="hero" id="home">
        <div>
            <p className="hero-tag">WELCOME TO FREELANCEHUB</p>

            <h1>
            Find Work.
            <span>Build Your Future.</span>
            </h1>

            <p className="hero-description">
            Connect with talented freelancers and clients.
            Discover opportunities, share your skills and
            turn ideas into successful projects.
            </p>

            <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary">
                Get Started
            </Link>

            <a href="#how-it-works" className="btn btn-outline">
                Explore More
            </a>
            </div>
        </div>

        <div className="hero-card">
            <div className="floating-card">
            <h3>Find Your Next Opportunity</h3>
            <p>
                Explore projects that match your skills
                and build your career.
            </p>
            </div>

            <div className="floating-card second-card">
            <h3>Work With Great Talent</h3>
            <p>
                Connect with skilled professionals
                and bring your ideas to life.
            </p>
            </div>
        </div>
        </section>

      {/* Categories */}
        <section className="categories" id="categories">
        <div className="section-heading">
            <p>EXPLORE OPPORTUNITIES</p>
            <h2>Popular Categories</h2>
        </div>

        <div className="category-grid">
            <div className="category-card">
            <div className="category-icon">💻</div>
            <h3>Web Development</h3>
            <p>Build websites and web applications.</p>
            </div>

            <div className="category-card">
            <div className="category-icon">🎨</div>
            <h3>Graphic Design</h3>
            <p>Create beautiful visual experiences.</p>
            </div>

            <div className="category-card">
            <div className="category-icon">✍️</div>
            <h3>Content Writing</h3>
            <p>Create engaging content and articles.</p>
            </div>

            <div className="category-card">
            <div className="category-icon">📊</div>
            <h3>Digital Marketing</h3>
            <p>Grow businesses through digital strategies.</p>
            </div>
        </div>
        </section>

      {/* How It Works */}
        <section className="how-it-works" id="how-it-works">
        <div className="section-heading">
            <p>SIMPLE PROCESS</p>
            <h2>How It Works</h2>
        </div>

        <div className="steps">
            <div className="step">
            <span>01</span>
            <h3>Create Your Account</h3>
            <p>Sign up as a freelancer or client.</p>
            </div>

            <div className="step">
            <span>02</span>
            <h3>Find Opportunities</h3>
            <p>Browse jobs or post your projects.</p>
            </div>

            <div className="step">
            <span>03</span>
            <h3>Start Collaborating</h3>
            <p>Submit proposals and manage projects.</p>
            </div>
        </div>
        </section>

      {/* About */}
        <section className="about" id="about">
        <div>
            <p className="hero-tag">ABOUT US</p>
            <h2>Connecting Talent With Opportunity</h2>

            <p>
            FreelanceHub is a freelancer marketplace designed
            to connect clients with skilled freelancers.
            Our platform makes it easier to discover jobs,
            manage proposals and track project progress
            in one place.
            </p>
        </div>
        </section>

      {/* Footer */}
        <footer>
        <p>© 2026 FreelanceHub. All rights reserved.</p>
        </footer>
    </>
    );
}

export default Home;
