import { useEffect, useState } from "react";
import SeekerLayout from "../../layouts/SeekerLayout";
import api from "../../api/axios";

import ApplicationCard from "../../components/applications/ApplicationCard";
import ApplicationModal from "../../components/applications/ApplicationModal";

export default function SeekerApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState(null);

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const res = await api.get("/applications/my");
                setApplications(res.data.data || []);
                console.log(applications)
            } catch (err) {
                console.error("Failed to fetch applications:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchApps();
    }, []);

    return (
        <SeekerLayout>
            <h1 className="text-2xl font-bold text-yellow-400 mb-6">My Applications</h1>

            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : applications.length === 0 ? (
                <p className="text-gray-600">You haven't applied to any jobs yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {applications.map((app) => (
                        <ApplicationCard
                            key={app.id}
                            app={app}
                            onView={(ap) => setSelectedApp(ap)}
                        />
                    ))}
                </div>
            )}

            <ApplicationModal app={selectedApp} onClose={() => setSelectedApp(null)} />
        </SeekerLayout>
    );
}
