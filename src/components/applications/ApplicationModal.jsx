import React from "react";

export default function ApplicationModal({ app, onClose }) {
    if (!app) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-start pt-20 z-50 px-4">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">

                <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {app.Job.title}
                </h2>

                <p className="mb-2 text-gray-700">
                    <strong>Company:</strong> {app.Job.Company.name}
                </p>

                <p className="mb-2 text-gray-700">
                    <strong>Description:</strong> {app.Job.job_description || "No description"}
                </p>

                <p className="mb-2 text-gray-700">
                    <strong>Salary:</strong> {app.Job.salary || "Not specified"}
                </p>

                <p className="mb-2 text-gray-700">
                    <strong>Location:</strong>{" "}
                    {[app.Job.city, app.Job.state, app.Job.country]
                      .filter(Boolean)
                      .join(", ") || app.Job.location || "N/A"}
                </p>

                <p className="mb-4 text-gray-700">
                    <strong>Status:</strong>{" "}
                    <span className="font-semibold capitalize">{app.status}</span>
                </p>

                {/* Resume */}
                {app.User?.resume_url && (
                    <a
                        href={`${process.env.REACT_APP_API_URL}${app.User.resume_url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-yellow-600 underline font-medium"
                    >
                        View Resume
                    </a>
                )}

                <div className="mt-5 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
