import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

import JobCard from "../../components/jobs/JobCard";
import JobModal from "../../components/jobs/JobModal";
import Header from "../../components/Header";

export default function JobsPage() {
    const { user } = useAuth(); 

    const [jobs, setJobs] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [selectedJob, setSelectedJob] = useState(null);
    const [applying, setApplying] = useState(false);

    useEffect(() => {
        const loadJobs = async () => {
            try {
                const res = await api.get("/jobs/all");
                setJobs(res.data.data);
                setFiltered(res.data.data);
            } catch (err) {
                console.error("Error fetching jobs:", err);
            } finally {
                setLoading(false);
            }
        };

        loadJobs();
    }, []);

    useEffect(() => {
        const q = search.toLowerCase();
        setFiltered(
            jobs.filter(
                (j) =>
                    j.title.toLowerCase().includes(q) ||
                    j.Company?.name.toLowerCase().includes(q)
            )
        );
    }, [search, jobs]);

    const handleApply = async (jobId) => {
        if (!user) {
            window.location.href = "/login";
            return;
        }

        if (user.role !== "seeker") {
            alert("Only job seekers can apply!");
            return;
        }

        setApplying(true);

        try {
            await api.post(`/jobs/${jobId}/apply`);
            alert("Applied successfully!");
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message || "Failed to apply");
        } finally {
            setApplying(false);
            setSelectedJob(null);
        }
    };

    return (
        <>
            <Header />
            <div className="px-4 md:px-8 py-8">
                <div className="flex justify-center mb-8">
                    <div className="flex w-full max-w-xl">
                        <input
                            type="text"
                            placeholder="Search jobs by title or company..."
                            className="w-full border px-4 py-3 rounded-l-full focus:outline-none bg-gray-100"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="bg-yellow-400 px-6 rounded-r-full font-semibold">
                            Find Job
                        </button>
                    </div>
                </div>

                {loading && <p className="text-center text-gray-600">Loading jobs...</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filtered.map((job) => (
                        <JobCard key={job.id} job={job} onOpen={setSelectedJob} />
                    ))}
                </div>

                <JobModal
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                    onApply={handleApply}
                    applying={applying}
                />
            </div>
        </>
    );
}
