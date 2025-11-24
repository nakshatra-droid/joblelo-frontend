import React from "react";

export default function JobCard({ job, onOpen }) {
  const locationParts = [job.city, job.state, job.country].filter(Boolean);
  const locationText = locationParts.join(", ");
  return (
    <div
      className="border rounded-xl p-5 shadow-sm hover:shadow-md transition bg-white cursor-pointer"
      onClick={() => onOpen(job)}
    >
      <p className="text-xs inline-block px-2 py-1 rounded bg-blue-100 text-blue-600 mb-2">
        Hiring
      </p>

      <h2 className="text-lg font-semibold text-gray-900">{job.title}</h2>
      <p className="text-gray-600">{job.Company?.name}</p>
      <p className="text-gray-500 text-sm">
        {locationText || job.location || "Location not specified"}
      </p>

      <div className="mt-3">
        <p className="text-sm">
          <span className="font-semibold">CTC:</span> {job.salary || "N/A"}
        </p>
        {/* <p className="text-sm">
          <span className="font-semibold">Posted On:</span>{" "}
          {new Date(job.created_at).toLocaleDateString()}
        </p> */}
      </div>

      <button
        className="mt-4 bg-yellow-400 px-4 py-2 rounded font-semibold hover:bg-yellow-500"
        onClick={(e) => {
          e.stopPropagation();
          onOpen(job);
        }}
      >
        View Details
      </button>
    </div>
  );
}
