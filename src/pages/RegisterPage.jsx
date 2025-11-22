import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import {
  validateFullName,
  validateEmail,
  validatePhone,
  validatePassword,
  validateWorkMail,
  validateResume,
  validateCity,
  validateState,
  validateCountry,
  validateExperience,
  validateRecruiterCompanyMatch
} from "../utils/validations";

export default function RegisterPage() {
  const [role, setRole] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");


  const [resume, setResume] = useState(null);
  const [experience, setExperience] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [country, setCountry] = useState("");

  const [company, setCompany] = useState("");
  const [customCompany, setCustomCompany] = useState("");
  const [workMail, setWorkMail] = useState("");

  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const [companyError, setCompanyError] = useState("");
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoadingCompanies(true);
      setCompanyError("");
      try {
        const res = await api.get("/companies");
        const list = res.data?.data || [];
        setCompanies(list);
      } catch (err) {
        console.error("Failed to load companies", err);
        setCompanyError("Failed to load companies. You can still type your company manually.");
      } finally {
        setLoadingCompanies(false);
      }
    };

    if (role === "recruiter" && companies.length === 0 && !loadingCompanies) {
      fetchCompanies();
    }
  }, [role, companies.length, loadingCompanies]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!role) {
      setError("Please select a role.");
      return;
    }
    // Validate fullName
    const fullNameError = validateFullName(fullName);
    if (fullNameError) {
      setError(fullNameError);
      return;
    }

    // Validate email
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    // Validate phone
    const phoneError = validatePhone(phone);
    if (phoneError) {
      setError(phoneError);
      return;
    }

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    if (role === "seeker") {
      const resumeError = validateResume(resume);
      if (resumeError) {
        setError(resumeError);
        return;
      }
      const experienceError = validateExperience(experience);
      if (experienceError) {
        setError(experienceError);
        return;
      }

      // Validate city
      const cityError = validateCity(city);
      if (cityError) {
        setError(cityError);
        return;
      }

      const stateError = validateState(stateName);
      if (stateError) {
        setError(stateError);
        return;
      }

      // Validate country
      const countryError = validateCountry(country);
      if (countryError) {
        setError(countryError);
        return;
      }
    }

    // Validate workMail for recruiter
    if (role === "recruiter") {
      const workMailError = validateWorkMail(workMail);
      if (workMailError) {
        setError(workMailError);
        return;
      }
      const comp = company === "other" ? customCompany : company;
      const companyMatchError = validateRecruiterCompanyMatch(comp, workMail);
      if (companyMatchError) {
        setError(companyMatchError);
        return;
      }
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
        fd.append("state", stateName);
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
      console.log(res);

      const registeredUser = res?.data?.user || res?.user;
      if (registeredUser) {
        if (role === "seeker") {
          navigate("/seeker/dashboard");
        } else if (role === "recruiter") {
          navigate("/recruiter/dashboard");
        } else {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
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
          <label className="font-medium text-gray-700">
            Register As <span className="text-red-500">*</span>
          </label>
          <select className="bg-gray-200 px-4 py-3 rounded-lg focus:outline-none" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select Role</option>
            <option value="seeker">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input type="text" placeholder="Your full name" className="bg-gray-200 px-4 py-3 rounded-lg focus:outline-none" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input type="email" placeholder="youremail@gmail.com" className="bg-gray-200 px-4 py-3 rounded-lg focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Phone <span className="text-red-500">*</span>
          </label>
          <input type="text" placeholder="+919876543210" className="bg-gray-200 px-4 py-3 rounded-lg focus:outline-none" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            Password <span className="text-red-500">*</span>
          </label>
          <input type="password" placeholder="Password" className="bg-gray-200 px-4 py-3 rounded-lg focus:outline-none" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        {role === "seeker" && (
          <>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">
                Upload Resume <span className="text-red-500">*</span>
              </label>
              <input type="file" className="bg-gray-200 px-4 py-3 rounded-lg" onChange={(e) => setResume(e.target.files[0])} required />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">
                Years of Experience <span className="text-red-500">*</span>
              </label>
              <input type="number" placeholder="e.g. 2" className="bg-gray-200 px-4 py-3 rounded-lg" value={experience} onChange={(e) => setExperience(e.target.value)} required />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">
                City <span className="text-red-500">*</span>
              </label>
              <input type="text" placeholder="City" className="bg-gray-200 px-4 py-3 rounded-lg" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">
                State <span className="text-red-500">*</span>
              </label>
              <input type="text" placeholder="State" className="bg-gray-200 px-4 py-3 rounded-lg" value={stateName} onChange={(e) => setStateName(e.target.value)} required />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">
                Country <span className="text-red-500">*</span>
              </label>
              <input type="text" placeholder="Country" className="bg-gray-200 px-4 py-3 rounded-lg" value={country} onChange={(e) => setCountry(e.target.value)} required />
            </div>
          </>
        )}

        {role === "recruiter" && (
          <>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">
                Work Mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="workmail@company.com"
                className="bg-gray-200 px-4 py-3 rounded-lg"
                value={workMail}
                onChange={(e) => setWorkMail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">
                Company Name <span className="text-red-500">*</span>
              </label>

              {companyError && (
                <p className="text-xs text-red-500 mb-1">
                  {companyError}
                </p>
              )}

              <select
                className="bg-gray-200 px-4 py-3 rounded-lg focus:outline-none"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              >
                <option value="">
                  {loadingCompanies ? "Loading companies..." : "Select Company"}
                </option>
                {companies.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
                <option value="other">Other</option>
              </select>

              {company === "other" && (
                <input
                  type="text"
                  placeholder="Enter company name"
                  className="bg-gray-200 px-4 py-3 rounded-lg mt-2"
                  value={customCompany}
                  onChange={(e) => setCustomCompany(e.target.value)}
                  required
                />
              )}
            </div>
          </>
        )}

        {error && <p className="text-red-600 text-center py-2 rounded bg-red-100">{error}</p>}
        <button type="submit" className="w-full bg-yellow-400 py-3 rounded-lg font-semibold text-gray-900 hover:bg-yellow-500 transition">Register</button>
      </form>
      <Link to="/login" className="w-full max-w-lg mt-6 inline-block border border-yellow-400 text-yellow-500 py-2 px-6 rounded-lg font-medium hover:bg-yellow-50 text-center">Login</Link>
    </div>
  );
}
