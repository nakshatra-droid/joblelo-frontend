import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

function normalizeUser(raw) {
  if (!raw) return null;
  const u = raw.user || raw;
  const id = u.id ?? u.user_id ?? null;
  const fullName = u.fullName || u.full_name || u.name || "";
  const email = u.email || "";
  const phone = u.phone || "";
  const city = u.city || u.location?.city || "";
  const country = u.country || u.location?.country || "";
  const experience = u.experience ?? u.years_experience ?? 0;
  const resumeUrl = u.resumeUrl || u.resume_url || u.cv || "";
  const roles = u.roles || (u.Roles ? u.Roles.map((r) => (r.name ? r.name : r)) : []);
  const role = u.role || roles?.[0] || "";

  const workEmail = u.workEmail || u.work_email || "";
  const company = u.company || "";

  return {
    id,
    fullName,
    email,
    phone,
    city,
    country,
    experience,
    resumeUrl,
    roles,
    role,
    workEmail,
    company,
    _raw: u,
  };
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const res = await api.get("/users/me");
      const payload = res.data?.data ?? null;
      setUser(normalizeUser(payload));
    } catch (err) {
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const register = async (formData) => {
    const res = await api.post("/users/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const payload = res.data?.data ?? res.data;
    setUser(normalizeUser(payload.user ?? payload));
    return res.data;
  };

  const login = async (credentials) => {
    const res = await api.post("/users/login", credentials);
    const payload = res.data?.data ?? res.data;
    setUser(normalizeUser(payload.user ?? payload));
    return res.data;
  };

  const logout = async () => {
    try {
      await api.post("/users/logout");
    } catch (err) {
    } finally {
      setUser(null);
    }
  };

  const updateUser = (updated) => {
    setUser((prev) => {
      const newUser = { ...(prev || {}), ...(normalizeUser(updated) || {}) };
      return newUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loadingUser,
        login,
        register,
        logout,
        updateUser,
        fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
