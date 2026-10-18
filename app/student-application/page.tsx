"use client";

import { FormEvent, useState } from "react";

export default function StudentApplicationPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    mode: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // Replace these with the exact options configured in Frappe.
  const modes = [
    "Front-End",
    "Data structure & Algo",
    "Back-End",
  ];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const response = await fetch("/api/student-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to submit your application."
        );
      }

      setSuccess(true);
      setMessage(result.message);

      setFormData({
        full_name: "",
        email: "",
        phone_number: "",
        mode: "",
      });
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 sm:py-20">
      <div className="mx-auto max-w-xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-700">
            TechVision LMS
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Student Application
          </h1>

          <p className="mt-3 text-gray-600">
            Complete the form below to apply for a TechVision course.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <label
              htmlFor="full_name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Full Name <span className="text-red-500">*</span>
            </label>

            <input
              id="full_name"
              name="full_name"
              type="text"
              placeholder="Enter your full name"
              value={formData.full_name}
              onChange={handleChange}
              autoComplete="name"
              required
              maxLength={140}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email Address <span className="text-red-500">*</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              maxLength={254}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="phone_number"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>

            <input
              id="phone_number"
              name="phone_number"
              type="tel"
              placeholder="+251 9XX XXX XXX"
              value={formData.phone_number}
              onChange={handleChange}
              autoComplete="tel"
              required
              maxLength={30}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="mode"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Mode <span className="text-red-500">*</span>
            </label>

            <select
              id="mode"
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            >
              <option value="">Select your preferred mode</option>

              {modes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </div>

          {message && (
            <div
              role="status"
              aria-live="polite"
              className={`rounded-lg p-4 text-sm ${
                success
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 px-5 py-3.5 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Submitting Application..." : "Submit Application"}
          </button>

          <p className="text-center text-xs text-gray-500">
            Please ensure your contact details are correct before submitting.
          </p>
        </form>
      </div>
    </main>
  );
}