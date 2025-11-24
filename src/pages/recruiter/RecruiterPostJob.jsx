import { useState } from "react";
import RecruiterLayout from "../../layouts/RecruiterLayout";
import api from "../../api/axios";
import {
    validateJobTitle,
    validateJobDescription,
    validateSalary,
    validateCity,
    validateState,
    validateCountry,
} from "../../utils/validations";

export default function RecruiterPostJob() {
    const [form, setForm] = useState({
        title: "",
        job_description: "",
        salary: "",
        city: "",
        state: "",
        country: "",
        job_type: "full-time",
    });

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const onChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        const titleError = validateJobTitle(form.title);
        if (titleError) {
            setError(titleError);
            return;
        }

        // Validate job description
        const descriptionError = validateJobDescription(form.job_description);
        if (descriptionError) {
            setError(descriptionError);
            return;
        }

        // Validate salary
        const salaryError = validateSalary(form.salary);
        if (salaryError) {
            setError(salaryError);
            return;
        }

        // Validate city/state/country
        const cityError = validateCity(form.city);
        if (cityError) {
            setError(cityError);
            return;
        }

        const stateError = validateState(form.state);
        if (stateError) {
            setError(stateError);
            return;
        }

        const countryError = validateCountry(form.country);
        if (countryError) {
            setError(countryError);
            return;
        }


        try {
            await api.post("/jobs/create", form);
            setSuccess("Job posted successfully!");
            setForm({
                title: "",
                job_description: "",
                salary: "",
                city: "",
                state: "",
                country: "",
                job_type: "full-time",
            });
        } catch (err) {
            const msg = err?.response?.data?.message || "Failed to post job.";
            setError(msg);
        }
    };

    return (
        <RecruiterLayout>
            <h1 className="text-2xl font-bold text-yellow-400 mb-6">Post a New Job</h1>

            {error && <p className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4">{error}</p>}
            {success && <p className="bg-green-100 text-green-600 px-4 py-2 rounded mb-4">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">

                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={onChange}
                        required
                        className="w-full bg-gray-200 px-4 py-3 rounded"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Job Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        name="job_description"
                        value={form.job_description}
                        onChange={onChange}
                        rows={5}
                        className="w-full bg-gray-200 px-4 py-3 rounded"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        CTC <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="salary"
                        value={form.salary}
                        onChange={onChange}
                        className="w-full bg-gray-200 px-4 py-3 rounded"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        City <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="city"
                        value={form.city}
                        onChange={onChange}
                        className="w-full bg-gray-200 px-4 py-3 rounded"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        State <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="state"
                        value={form.state}
                        onChange={onChange}
                        className="w-full bg-gray-200 px-4 py-3 rounded"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Country <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="country"
                        value={form.country}
                        onChange={onChange}
                        className="w-full bg-gray-200 px-4 py-3 rounded"
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Job Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="job_type"
                        value={form.job_type}
                        onChange={onChange}
                        className="w-full bg-gray-200 px-4 py-3 rounded"
                    >
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                    </select>
                </div>

                <button className="bg-yellow-400 px-6 py-3 rounded font-semibold hover:bg-yellow-500">
                    Post Job
                </button>
            </form>
        </RecruiterLayout>
    );
}
