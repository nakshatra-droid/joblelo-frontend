import React from "react";

export default function ApplicationCard({ app, onView }) {
    const statusColors = {
        applied: "bg-blue-100 text-blue-700",
        selected: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
    };

    return (
        <div className="bg-white shadow rounded-lg p-5 flex flex-col gap-3 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{app.Job.title}</h3>

            <p className="text-sm text-gray-600">
                <span className="font-medium">Company:</span> {app.Job.Company.name}
            </p>

            <p className="text-sm text-gray-600">
                <span className="font-medium">Location:</span>{" "}
                {[app.Job.city, app.Job.state, app.Job.country]
                  .filter(Boolean)
                  .join(", ") || app.Job.location || "N/A"}
            </p>

            <span
                className={`px-3 py-1 text-xs font-semibold rounded-full inline-block w-fit ${statusColors[app.status]}`}
            >
                {app.status.toUpperCase()}
            </span>

            <button
                onClick={() => onView(app)}
                className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded"
            >
                View Details
            </button>
        </div>
    );
}
