import { useEffect, useState } from "react";
import RecruiterLayout from "../../layouts/RecruiterLayout";
import api from "../../api/axios";

import RecruiterApplicantCard from "../../components/applications/RecruiterApplicantCard";
import RecruiterApplicantModal from "../../components/applications/RecruiterApplicantModal";

export default function ApplicantsPage() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      const res = await api.get("/jobs/my-jobs");
      setJobs(res.data.data || []);
    };
    loadJobs();
  }, []);

  const fetchApplicants = async (jobId) => {
    const res = await api.get(`/applications/job/${jobId}`);
    setApplicants(res.data.data || []);
  };

  return (
    <RecruiterLayout>
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">
        Applicants
      </h1>

      {!selectedJob && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-4 bg-white shadow rounded border border-gray-200 cursor-pointer hover:bg-gray-50"
              onClick={() => {
                setSelectedJob(job);
                fetchApplicants(job.id);
              }}
            >
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.Company?.name}</p>
            </div>
          ))}
        </div>
      )}

      {selectedJob && (
        <>
          <button
            className="mb-4 text-yellow-600 underline"
            onClick={() => {
              setSelectedJob(null);
              setApplicants([]);
            }}
          >
            ← Back to Jobs
          </button>

          <h2 className="text-xl font-semibold mb-4">
            Applicants for {selectedJob.title}
          </h2>

          {applicants.length === 0 ? (
            <p className="text-gray-600">No applications yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {applicants.map((app) => (
                <RecruiterApplicantCard
                  key={app.id}
                  app={app}
                  onView={(a) => setSelectedApplicant(a)}
                />
              ))}
            </div>
          )}
        </>
      )}

      <RecruiterApplicantModal
        app={selectedApplicant}
        onClose={() => setSelectedApplicant(null)}
        onStatusChange={(newStatus) => {
          setApplicants((prev) =>
            prev.map((a) =>
              a.id === selectedApplicant.id ? { ...a, status: newStatus } : a
            )
          );
          setSelectedApplicant(null);
        }}
      />
    </RecruiterLayout>
  );
}
