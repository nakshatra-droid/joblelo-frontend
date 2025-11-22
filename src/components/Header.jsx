import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="w-full flex justify-between items-center px-6 md:px-10 py-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        {/* <span className="text-yellow-500 text-3xl">👥</span> */}
        <Link to={"/"}>
        <h1 className="text-lg md:text-2xl font-semibold text-gray-900">Joblelo</h1>
        </Link>
      </div>

      <nav className="flex items-center gap-2 md:gap-6 text-gray-800 font-medium">
        <Link to="/" className="text-xs md:text-base md:inline hover:text-black transition">HOME</Link>
        <Link to="/jobs" className="text-xs md:text-base md:inline hover:text-black transition">JOBS</Link>

        {!user ? (
          <Link to="/login" className="px-4 py-2 bg-yellow-400 rounded-md text-sm md:text-base font-medium hover:brightness-95">
            Login
          </Link>
        ) : (
          <>
            <Link to={user.role === "seeker" ? "/seeker/dashboard" : "/recruiter/dashboard"}
                  className="text-xs md:text-base hover:text-black transition">
              DASHBOARD
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-2 text-sm md:text-base rounded-md border border-gray-200 hover:bg-gray-50"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
