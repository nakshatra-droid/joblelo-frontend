import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [role, setRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");


  const [resume, setResume] = useState(null);
  const [experience, setExperience] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [company, setCompany] = useState("");
  const [customCompany, setCustomCompany] = useState("");
  const [workMail, setWorkMail] = useState("");

  const companies = ["Company A", "Company B"];
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!role) {
      setError("Please select a role.");
      return;
    }
    try {
      const fd = new FormData();
      fd.append("role", role);
      fd.append("full_name", fullName);
      fd.append("email", email);
      fd.append("phone", phone);
      fd.append("password", password);

      if (role === "seeker") {
        fd.append("city", city);
        fd.append("country", country);
        fd.append("experience", experience);
        if (resume) fd.append("resume", resume);
      }

      if (role === "recruiter") {
        const comp = company === "other" ? customCompany : company;
        fd.append("company", comp);
        fd.append("work_email", workMail);
        fd.append("workMail", workMail);
      }

      const res = await register(fd);

      navigate("/login");
      
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Registration failed";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-3xl font-semibold mb-10 text-gray-900">Create your account</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6 bg-white">
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Register As</label>
          <select className="bg-gray-200 px-4 py-3 rounded-lg focus:outline-none" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select Role</option>
            <option value="seeker">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Full Name</label>
          <input type="text" placeholder="Your full name" className="bg-gray-200 px-4 py-3 rounded-lg focus:outline-none" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Email</label>
          <input type="email" placeholder="youremail@gmail.com" className="bg-gray-200 px-4 py-3 rounded-lg focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Phone</label>
          <input type="text" placeholder="Phone number" className="bg-gray-200 px-4 py-3 rounded-lg focus:outline-none" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">Password</label>
          <input type="password" placeholder="Password" className="bg-gray-200 px-4 py-3 rounded-lg focus:outline-none" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        {role === "seeker" && (
          <>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Upload Resume</label>
              <input type="file" className="bg-gray-200 px-4 py-3 rounded-lg" onChange={(e) => setResume(e.target.files[0])} required />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Years of Experience</label>
              <input type="number" placeholder="e.g. 2" className="bg-gray-200 px-4 py-3 rounded-lg" value={experience} onChange={(e) => setExperience(e.target.value)} required />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">City</label>
              <input type="text" placeholder="City" className="bg-gray-200 px-4 py-3 rounded-lg" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Country</label>
              <input type="text" placeholder="Country" className="bg-gray-200 px-4 py-3 rounded-lg" value={country} onChange={(e) => setCountry(e.target.value)} required />
            </div>
          </>
        )}

        {role === "recruiter" && (
          <>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Work Mail</label>
              <input type="email" placeholder="workmail@company.com" className="bg-gray-200 px-4 py-3 rounded-lg" value={workMail} onChange={(e) => setWorkMail(e.target.value)} required />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Company Name</label>
              <select className="bg-gray-200 px-4 py-3 rounded-lg focus:outline-none" value={company} onChange={(e) => setCompany(e.target.value)} required>
                <option value="">Select Company</option>
                {companies.map((c, idx) => (
                  <option key={idx} value={c}>{c}</option>
                ))}
                <option value="other">Other</option>
              </select>

              {company === "other" && (
                <input type="text" placeholder="Enter company name" className="bg-gray-200 px-4 py-3 rounded-lg mt-2" value={customCompany} onChange={(e) => setCustomCompany(e.target.value)} required />
              )}
            </div>
          </>
        )}

        {error && <p className="text-red-600 text-center py-2 rounded bg-red-100">{error}</p>}
        <button type="submit" className="w-full bg-yellow-400 py-3 rounded-lg font-semibold text-gray-900 hover:bg-yellow-500 transition">Register</button>
      </form>
      <Link to="/login" className="mt-6 inline-block border border-yellow-400 text-yellow-500 py-2 px-6 rounded-lg font-medium hover:bg-yellow-50">Already have an account? Login</Link>
    </div>
  );
}
