import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import SeekerDashboard from "./pages/seeker/SeekerDashboard"
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard"
import SeekerUpdateProfile from "./pages/seeker/SeekerUpdateProfile"
import SeekerApplications from "./pages/seeker/SeekerApplications"
import RecruiterUpdateProfile from "./pages/recruiter/RecruiterUpdateProfile"
import RecruiterPostJob from "./pages/recruiter/RecruiterPostJob"
import RecruiterMyJobs from "./pages/recruiter/RecruiterMyJobs"
import JobsPage from "./pages/jobs/JobsPage"
import ApplicantsPage from "./pages/recruiter/ApplicantsPage"
import Unauthorized from "./pages/Unauthorized"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Seeker routes */}
        <Route path="/seeker/dashboard" element={<SeekerDashboard />} />
        <Route path="/seeker/update" element={<SeekerUpdateProfile />} />
        <Route path="/seeker/applications" element={<SeekerApplications />} />
        {/* Recruiter routes */}
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/update" element={<RecruiterUpdateProfile />} />
        <Route path="/recruiter/post-job" element={<RecruiterPostJob />} />
        <Route path="/recruiter/jobs" element={<RecruiterMyJobs />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/recruiter/applicants" element={<ApplicantsPage />} />
        {/* Unauthorized Access Page */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>

  )
}

export default App
