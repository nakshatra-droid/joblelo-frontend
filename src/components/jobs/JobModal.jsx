import React from "react";

export default function JobModal({ job, onClose, onApply, applying }) {
  if (!job) return null;

  const locationParts = [job.city, job.state, job.country].filter(Boolean);
  const locationText = locationParts.join(", ");

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center px-4 z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 relative shadow-lg">
        
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-xl font-bold text-yellow-500 mb-2">{job.title}</h2>

        <p className="text-gray-700 font-semibold">{job.Company?.name}</p>
        <p className="text-gray-600">
          {locationText || job.location || "Location not specified"}
        </p>

        <div className="mt-4 space-y-2">
          <p>
            <span className="font-semibold">Job Type:</span> {job.job_type}
          </p>
          <p>
            <span className="font-semibold">CTC:</span> {job.salary || "N/A"}
          </p>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-1">Description</h3>
          <p className="text-gray-700 text-sm whitespace-pre-line">
            {job.job_description || "No description available"}
          </p>
        </div>

        <button
          className="w-full mt-6 bg-yellow-400 py-3 rounded font-semibold hover:bg-yellow-500 disabled:bg-gray-300"
          onClick={() => onApply(job.id)}
          disabled={applying}
        >
          {applying ? "Applying..." : "Apply Now"}
        </button>
      </div>
    </div>
  );
}
