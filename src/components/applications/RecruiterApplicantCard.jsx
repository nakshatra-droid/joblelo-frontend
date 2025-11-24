export default function RecruiterApplicantCard({ app, onView }) {
  const statusColors = {
    applied: "bg-blue-100 text-blue-700",
    selected: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900">
        {app.User.full_name}
      </h3>

      <p className="text-sm text-gray-600 mt-1">
        {app.User.email}
      </p>

      <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${statusColors[app.status]}`}>
        {app.status.toUpperCase()}
      </span>

      <button
        onClick={() => onView(app)}
        className="mt-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 w-full py-2 rounded font-semibold"
      >
        View Details
      </button>
    </div>
  );
}
