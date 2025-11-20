import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import SeekerLayout from "../../layouts/SeekerLayout";
import api from "../../api/axios";
import {
  validateFullName,
  validatePhone,
  validateCity,
  validateState,
  validateCountry,
  validateExperience,
  validatePassword,
} from "../../utils/validations";

export default function SeekerUpdateProfile() {
  const { user, updateUser, fetchCurrentUser } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    experience: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordForm, setPasswordForm] = useState({ oldPassword: "", newPassword: "" });

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        phone: user.phone || "",
        city: user.city || "",
        state: user.state || "",
        country: user.country || "",
        experience: user.experience ?? "",
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const fullNameError = validateFullName(form.fullName);
    if (fullNameError) {
      setError(fullNameError);
      return;
    }

    if (form.phone) {
      const phoneError = validatePhone(form.phone);
      if (phoneError) {
        setError(phoneError);
        return;
      }
    }

    const cityError = validateCity(form.city || "");
    if (cityError) {
      setError(cityError);
      return;
    }

    const stateError = validateState(form.state || "");
    if (stateError) {
      setError(stateError);
      return;
    }

    const countryError = validateCountry(form.country || "");
    if (countryError) {
      setError(countryError);
      return;
    }

    const experienceError = validateExperience(form.experience ?? "");
    if (experienceError) {
      setError(experienceError);
      return;
    }

    try {
      const fd = new FormData();
      fd.append("full_name", form.fullName);
      fd.append("phone", form.phone);
      fd.append("city", form.city);
      fd.append("state", form.state);
      fd.append("country", form.country);
      fd.append("experience", form.experience);

      if (resumeFile) fd.append("resume", resumeFile);

      const res = await api.put("/users/update-profile", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const payload = res.data?.data ?? res.data ?? {};
      // updateUser(payload.user ?? payload);
      await fetchCurrentUser();
      setSuccess("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Failed to update profile.";
      setError(msg);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const oldPasswordError = validatePassword(passwordForm.oldPassword);
    if (oldPasswordError) {
      setError(oldPasswordError);
      return;
    }

    const newPasswordError = validatePassword(passwordForm.newPassword);
    if (newPasswordError) {
      setError(newPasswordError);
      return;
    }

    try {
      await api.put("/users/change-password", passwordForm);
      setSuccess("Password updated successfully.");
      setPasswordForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      const msg = err?.response?.data?.message || "Password update failed.";
      setError(msg);
    }
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onPasswordChange = (e) => setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

  return (
    <SeekerLayout>
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">Update Profile</h1>

      {error && <p className="text-red-600 bg-red-100 px-4 py-2 rounded mb-4">{error}</p>}
      {success && <p className="text-green-600 bg-green-100 px-4 py-2 rounded mb-4">{success}</p>}

      <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-xl">
        <div>
          <label className="text-sm text-gray-700 mb-1 block">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            className="w-full bg-gray-200 px-4 py-3 rounded"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 mb-1 block">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            className="w-full bg-gray-200 px-4 py-3 rounded"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 mb-1 block">
            City <span className="text-red-500">*</span>
          </label>
          <input
            name="city"
            value={form.city}
            onChange={onChange}
            className="w-full bg-gray-200 px-4 py-3 rounded"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 mb-1 block">
            State <span className="text-red-500">*</span>
          </label>
          <input
            name="state"
            value={form.state}
            onChange={onChange}
            className="w-full bg-gray-200 px-4 py-3 rounded"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 mb-1 block">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            name="country"
            value={form.country}
            onChange={onChange}
            className="w-full bg-gray-200 px-4 py-3 rounded"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 mb-1 block">
            Experience (Years) <span className="text-red-500">*</span>
          </label>
          <input
            name="experience"
            type="number"
            value={form.experience}
            onChange={onChange}
            className="w-full bg-gray-200 px-4 py-3 rounded"
            required
            min="0"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 mb-2 block">Upload / Replace Resume</label>
          {user?.resumeUrl && (
            <p className="text-xs text-gray-500 mb-2">
              Current resume:{" "}
              <a href={`http://localhost:5001${user.resumeUrl}`} target="_blank" rel="noreferrer" className="underline text-yellow-600">View Resume</a>
            </p>
          )}
          <input type="file" className="w-full bg-gray-200 px-4 py-3 rounded" onChange={(e) => setResumeFile(e.target.files[0])} />
        </div>

        <button type="submit" className="bg-yellow-400 px-6 py-3 rounded font-semibold hover:bg-yellow-500">Save Changes</button>
      </form>

      <h2 className="text-2xl font-bold text-yellow-400 mt-12 mb-4">Update Password</h2>

      <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-xl">
        <div>
          <label className="text-sm text-gray-700 mb-1 block">
            Old Password <span className="text-red-500">*</span>
          </label>
          <input name="oldPassword" type="password" value={passwordForm.oldPassword} onChange={onPasswordChange} className="w-full bg-gray-200 px-4 py-3 rounded" required />
        </div>

        <div>
          <label className="text-sm text-gray-700 mb-1 block">
            New Password <span className="text-red-500">*</span>
          </label>
          <input name="newPassword" type="password" value={passwordForm.newPassword} onChange={onPasswordChange} className="w-full bg-gray-200 px-4 py-3 rounded" required />
        </div>

        <button type="submit" className="bg-yellow-400 px-6 py-3 rounded font-semibold hover:bg-yellow-500">Update Password</button>
      </form>
    </SeekerLayout>
  );
}
