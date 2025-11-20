import { useState } from "react";
import Header from "../components/Header";
import SeekerSidebar from "../components/seeker/SeekerSidebar";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function SeekerLayout({ children }) {
  const [open, setOpen] = useState(false);
  const { user, loadingUser } = useAuth();

  if (loadingUser) return null;

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "seeker") return <Navigate to="/unauthorized" replace />;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="flex flex-col md:flex-row">
        {/* Mobile Header with Hamburger */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <button
            onClick={() => setOpen(!open)}
            className="px-3 py-2 rounded-md border border-gray-200"
          >
            ☰
          </button>
          <h3 className="text-lg font-semibold">Dashboard</h3>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-72 border-r border-gray-100">
          <SeekerSidebar />
        </div>

        {/* Mobile Sidebar */}
        {open && (
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/30"
            onClick={() => setOpen(false)}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-72 bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <SeekerSidebar onClose={() => setOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
