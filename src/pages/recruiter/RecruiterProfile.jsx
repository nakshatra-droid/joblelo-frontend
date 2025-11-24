import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function RecruiterProfile() {
  const { user } = useAuth();

  if (!user) return <p className="text-gray-600">Loading...</p>;

  return (
    <div className="px-4 md:px-8 py-6">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">
        My Profile
      </h2>

      <div className="space-y-6 max-w-3xl">

        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Full Name
          </label>
          <div className="bg-gray-200 px-4 py-3 rounded">{user.fullName}</div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Email
          </label>
          <div className="bg-gray-200 px-4 py-3 rounded">{user.email}</div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Phone
          </label>
          <div className="bg-gray-200 px-4 py-3 rounded">{user.phone}</div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Work Email
          </label>
          <div className="bg-gray-200 px-4 py-3 rounded">
            {user.workEmail || "—"}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Company
          </label>
          <div className="bg-gray-200 px-4 py-3 rounded">
            {user.company || "—"}
          </div>
        </div>

      </div>
    </div>
  );
}
