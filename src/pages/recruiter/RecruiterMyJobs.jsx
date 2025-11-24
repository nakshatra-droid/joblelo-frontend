import { useEffect, useState } from "react";
import api from "../../api/axios";
import RecruiterLayout from "../../layouts/RecruiterLayout";

export default function RecruiterMyJobs() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs/my-jobs");
      setJobs(res.data.data || []);
    } catch (err) {
      setError("Failed to load jobs");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      await api.delete(`/jobs/${id}`);
      fetchJobs();
    } catch (err) {
      alert("Failed to delete job");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <RecruiterLayout>
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">My Posted Jobs</h1>

      {error && <p className="text-red-600 bg-red-100 px-4 py-2 rounded">{error}</p>}

      <div className="space-y-4">
        {jobs.length === 0 && <p>No jobs posted yet.</p>}

        {jobs.map((job) => (
          <div key={job.id} className="border p-4 rounded shadow bg-white">
            <h3 className="font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-600">
              {[job.city, job.state, job.country].filter(Boolean).join(", ") ||
                job.location ||
                "Location not specified"}
            </p>
            <p className="mt-2 text-gray-700">{job.job_description}</p>

            <div className="mt-4 flex gap-4">
              <button
                onClick={() => handleDelete(job.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </RecruiterLayout>
  );
}
