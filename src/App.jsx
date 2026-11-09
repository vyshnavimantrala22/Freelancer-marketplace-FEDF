import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import PostJob from "./pages/PostJob";
import BrowseJobs from "./pages/BrowseJobs";
import ApplyJob from "./pages/ApplyJob";
import MyProposals from "./pages/MyProposals";
import MyPostedJobs from "./pages/MyPostedJobs";
import ReceivedProposals from "./pages/ReceivedProposals";
import Profile from "./pages/Profile";
import MyProjects from "./pages/MyProjects";
import MyClientProjects from "./pages/MyClientProjects";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageJobs from "./pages/ManageJobs";
import ManageProposals from "./pages/ManageProposals";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Home */}
                <Route path="/" element={<Home />} />

                {/* Authentication */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                {/* Dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Client Pages */}
                <Route path="/post-job" element={<PostJob />} />
                <Route
                    path="/my-posted-jobs"
                    element={<MyPostedJobs />}
                />
                <Route
                    path="/received-proposals"
                    element={<ReceivedProposals />}
                />

                {/* Freelancer Pages */}
                <Route
                    path="/browse-jobs"
                    element={<BrowseJobs />}
                />
                <Route
                    path="/apply-job/:jobId"
                    element={<ApplyJob />}
                />
                <Route
                    path="/my-proposals"
                    element={<MyProposals />}
                />

                {/* Profile */}
                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/my-projects"
                    element={<MyProjects />}
                />

                <Route
                    path="/my-client-projects"
                    element={<MyClientProjects />}
                />

                <Route 
                    path="/admin-login" 
                    element={<AdminLogin />} 
                />

                <Route
                    path="/admin-dashboard"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/manage-users"
                    element={<ManageUsers />}
                />

                <Route
                    path="/manage-jobs"
                    element={<ManageJobs />}
                />

                <Route
                    path="/manage-proposals"
                    element={<ManageProposals />}
                />

            </Routes>   
        </BrowserRouter>
    );
}

export default App;