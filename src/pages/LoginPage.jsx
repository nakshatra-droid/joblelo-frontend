import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { 
  validateEmail, 
  validatePassword, 
  validateWorkMail 
} from "../utils/validations";

export default function LoginPage() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, fetchCurrentUser, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!role) {
      setError("Please select a role to login as.");
      return;
    }
    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }
    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    try {
      const res = await login({ email, password, role });
      const backendRoles = res.data.user.roles;
      console.log(role)
      console.log(backendRoles)

      if (!backendRoles.includes(role)) {
        setError(`You are not registered as a ${role}.`);
        return;
      }
      // if (backendRoles.length > 1) {
      //   // In future: Show popup here if required
      // }
      await fetchCurrentUser();

      if (role === "seeker") navigate("/seeker/dashboard");
      else navigate("/recruiter/dashboard");

    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Login failed";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-3xl font-semibold mb-10 text-gray-900">
        Login to your account
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Login As</label>
          <div className="flex">
            <select
              className="w-full bg-gray-200 px-4 py-3 rounded-l-lg focus:outline-none"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="seeker">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
            </select>
            <span className="bg-yellow-400 px-4 flex items-center justify-center rounded-r-lg text-xl">
              👤
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Email</label>
          <div className="flex">
            <input
              type="email"
              placeholder="youremail@gmail.com"
              className="w-full bg-gray-200 px-4 py-3 rounded-l-lg focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="bg-yellow-400 px-4 flex items-center justify-center rounded-r-lg text-xl">
              📧
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-medium">Password</label>
          <div className="flex">
            <input
              type="password"
              placeholder="Your Password"
              className="w-full bg-gray-200 px-4 py-3 rounded-l-lg focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="bg-yellow-400 px-4 flex items-center justify-center rounded-r-lg text-xl">
              🔒
            </span>
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-center bg-red-100 py-2 rounded">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-yellow-400 py-3 rounded-lg font-semibold text-gray-900 hover:bg-yellow-500 transition"
        >
          Login
        </button>
      </form>

      <Link
        to="/register"
        className="mt-6 inline-block border border-yellow-400 text-yellow-500 py-2 px-6 rounded-lg font-medium hover:bg-yellow-50 w-full max-w-md text-center"
      >
        Register
      </Link>
    </div>
  );
}
