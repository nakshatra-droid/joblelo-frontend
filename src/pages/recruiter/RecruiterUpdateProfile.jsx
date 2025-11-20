import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import RecruiterLayout from "../../layouts/RecruiterLayout";
import api from "../../api/axios";
import { 
  validateFullName,  
  validatePhone, 
  validatePassword, 
  validateWorkMail,
} from "../../utils/validations";

export default function RecruiterUpdateProfile() {
  const { user, updateUser,fetchCurrentUser } = useAuth();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    workEmail: "",
    company: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        phone: user.phone || "",
        workEmail: user.workEmail || "",
        company: user.company || "",
      });
    }
  }, [user]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onPasswordChange = (e) =>
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Validate fullName
        const fullNameError = validateFullName(form.fullName);
        if (fullNameError) {
          setError(fullNameError);
          return;
        }
    
    
        // Validate phone
        const phoneError = validatePhone(form.phone);
        if (phoneError) {
          setError(phoneError);
          return;
        }
    
        
        // Validate workMail for recruiter
        
          const workMailError = validateWorkMail(form.workEmail);
          if (workMailError) {
            setError(workMailError);
            return;
          }
        

    try {
      const fd = new FormData();
      fd.append("full_name", form.fullName);
      fd.append("phone", form.phone);
      fd.append("work_email", form.workEmail);
      fd.append("company", form.company);

      const res = await api.put("/users/update-profile", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const payload = res.data?.data ?? res.data ?? {};
      await fetchCurrentUser();

      setSuccess("Profile updated successfully.");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Update failed.";
      setError(msg);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Validate password
        const passwordError = validatePassword(passwordForm.newPassword);
        if (passwordError) {
          setError(passwordError);
          return;
        }

    try {
      await api.put("/users/change-password", passwordForm);
      setSuccess("Password updated!");
      setPasswordForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      const msg = err?.response?.data?.message || "Password update failed.";
      setError(msg);
    }
  };

  return (
    <RecruiterLayout>
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">
        Update Profile
      </h1>

      {error && (
        <p className="text-red-600 bg-red-100 px-4 py-2 rounded mb-4">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-600 bg-green-100 px-4 py-2 rounded mb-4">
          {success}
        </p>
      )}

      <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-xl">
        <div>
          <label className="text-sm text-gray-700">
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
          <label className="text-sm text-gray-700">
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
          <label className="text-sm text-gray-700">
            Work Email <span className="text-red-500">*</span>
          </label>
          <input
            name="workEmail"
            value={form.workEmail}
            onChange={onChange}
            className="w-full bg-gray-200 px-4 py-3 rounded"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-700">
            Company <span className="text-red-500">*</span>
          </label>
          <input
            name="company"
            value={form.company}
            onChange={onChange}
            className="w-full bg-gray-200 px-4 py-3 rounded"
            required
          />
        </div>

        <button className="bg-yellow-400 px-6 py-3 rounded font-semibold">
          Save Changes
        </button>
      </form>

      <h2 className="text-2xl font-bold text-yellow-400 mt-12 mb-4">
        Update Password
      </h2>

      <form
        onSubmit={handlePasswordSubmit}
        className="space-y-6 max-w-xl"
      >
        <div>
          <label className="text-sm text-gray-700">
            Old Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="oldPassword"
            value={passwordForm.oldPassword}
            onChange={onPasswordChange}
            className="w-full bg-gray-200 px-4 py-3 rounded"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-700">
            New Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="newPassword"
            value={passwordForm.newPassword}
            onChange={onPasswordChange}
            className="w-full bg-gray-200 px-4 py-3 rounded"
            required
          />
        </div>

        <button className="bg-yellow-400 px-6 py-3 rounded font-semibold">
          Update Password
        </button>
      </form>
    </RecruiterLayout>
  );
}
