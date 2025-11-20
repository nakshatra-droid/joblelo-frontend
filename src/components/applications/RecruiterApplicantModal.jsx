import api from "../../api/axios";

export default function RecruiterApplicantModal({ app, onClose, onStatusChange }) {
  if (!app) return null;

  const updateStatus = async (status) => {
    try {
      await api.put(`/applications/${app.id}/status`, { status });
      onStatusChange(status);
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-20 z-50 px-4">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-600 hover:text-black"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-900">
          {app.User.full_name}
        </h2>

        <p className="text-gray-700 mb-2">
          <strong>Email:</strong> {app.User.email}
        </p>

        <p className="text-gray-700 mb-2">
          <strong>Phone:</strong> {app.User.phone || "N/A"}
        </p>

        <p className="text-gray-700 mb-2">
          <strong>Experience:</strong> {app.User.experience || "0"} years
        </p>

        {app.User.resume_url ? (
          <a
            href={`${import.meta.env.VITE_API_URL}${app.User.resume_url}`}
            target="_blank"
            className="text-yellow-600 underline font-semibold"
          >
            View Resume
          </a>
        ) : (
          <p className="text-gray-500">No resume uploaded</p>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => updateStatus("selected")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Select
          </button>

          <button
            onClick={() => updateStatus("rejected")}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
