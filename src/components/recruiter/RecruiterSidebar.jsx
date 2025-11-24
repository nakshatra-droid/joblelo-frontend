import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RecruiterSidebar({ onClose }) {
  const { user } = useAuth();

  return (
    <aside className="w-72 md:w-64 p-6 bg-white">
      <div className="mb-8">
        <p className="text-sm text-gray-500">Welcome</p>
        <h3 className="text-lg font-semibold text-yellow-500">{user?.fullName || "Guest"}</h3>
        <p className="text-sm text-gray-500 mt-1 capitalize">{user?.role || (user?.roles?.[0]) || ""}</p>
      </div>

      <nav className="flex flex-col gap-3 text-gray-700">
        <NavLink to="/recruiter/dashboard" className={({ isActive }) => `${isActive ? 'font-semibold text-black' : 'text-gray-500'} py-2`} onClick={onClose}>My Profile</NavLink>
        <NavLink to="/recruiter/update" className={({ isActive }) => `${isActive ? 'font-semibold text-black' : 'text-gray-500'} py-2`} onClick={onClose}>Update Profile / Password</NavLink>
        <NavLink
          to="/recruiter/post-job"
          className={({ isActive }) => `${isActive ? "font-semibold text-black" : "text-gray-500"} py-2`} onClick={onClose}
        >
          Post Job
        </NavLink>

        <NavLink
          to="/recruiter/jobs"
          className={({ isActive }) => `${isActive ? "font-semibold text-black" : "text-gray-500"} py-2`} onClick={onClose}
        >
          My Jobs
        </NavLink>
        <NavLink
          to="/recruiter/applicants"
          className={({ isActive }) => `${isActive ? "font-semibold text-black" : "text-gray-500"} py-2`} onClick={onClose}
        >
          Applications
        </NavLink>

      </nav>
    </aside>
  );
}
