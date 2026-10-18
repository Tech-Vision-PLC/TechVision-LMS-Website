"use client";
import { useState } from "react";
import Link from "next/link";

const steps = [
  "Basic Info",
  "Skill & Screening",
  "Batch Preference",
  "Review",
  "Complete",
];
export function ApplicationWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    laptop: false,
    internet: false,
    mode: "Online (3500 ETB)",
    schedule: "Evening",
  });
  const set = (k: string, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }));
  return (
    <div className="min-h-screen bg-[#f7faf8] px-5 py-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-[#58655e]">
          ← Back to Home
        </Link>
        <div className="mt-8 flex justify-between overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <div key={s} className="min-w-[120px] text-center">
              <div
                className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full border text-sm ${i <= step ? "border-[#00d38d] bg-[#00d38d] text-white" : "border-[#aeb9b2] bg-white text-[#68736d]"}`}
              >
                {i + 1}
              </div>
              <div
                className={`mt-2 text-xs ${i === step ? "font-bold" : "text-[#68736d]"}`}
              >
                {s}
              </div>
            </div>
          ))}
        </div>
        <section className="mt-8 border border-[#dce5df] bg-white p-7 shadow-[0_16px_50px_rgba(25,54,39,.07)] sm:p-10">
          {step === 0 && (
            <>
              <h1 className="text-3xl font-black">Basic Information</h1>
              <p className="mt-2 text-sm text-[#68736d]">
                Let&apos;s start with your basic details.
              </p>
              <div className="mt-8 space-y-6">
                {[
                  ["name", "Full Name", "Enter your full name"],
                  ["email", "Email", "Enter your email address"],
                  ["phone", "Phone Number", "Enter your phone number"],
                ].map(([k, l, p]) => (
                  <label key={k} className="block text-sm font-bold">
                    {l} *
                    <input
                      value={(form as any)[k]}
                      onChange={(e) => set(k, e.target.value)}
                      className="mt-2 w-full border border-[#cfd9d3] bg-[#fbfcfb] px-4 py-4 font-normal outline-none focus:border-[#00d38d]"
                      placeholder={p}
                    />
                  </label>
                ))}
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <h1 className="text-3xl font-black">Skill & Screening</h1>
              <p className="mt-2 text-sm text-[#68736d]">
                Help us understand your background.
              </p>
              <div className="mt-8 space-y-6">
                <label className="block text-sm font-bold">
                  Education Level
                  <select
                    value={form.education}
                    onChange={(e) => set("education", e.target.value)}
                    className="mt-2 w-full border border-[#cfd9d3] bg-[#fbfcfb] px-4 py-4 font-normal"
                  >
                    <option value="">Select your education level</option>
                    <option>Bachelor&apos;s Degree</option>
                    <option>University Student</option>
                    <option>High School</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="block text-sm font-bold">
                  Experience Level
                  <select
                    value={form.experience}
                    onChange={(e) => set("experience", e.target.value)}
                    className="mt-2 w-full border border-[#cfd9d3] bg-[#fbfcfb] px-4 py-4 font-normal"
                  >
                    <option value="">Select your experience level</option>
                    <option>Beginner</option>
                    <option>Some Experience</option>
                    <option>Intermediate</option>
                  </select>
                </label>
                <label className="flex gap-3 text-sm">
                  <input
                    checked={form.laptop}
                    onChange={(e) => set("laptop", e.target.checked)}
                    type="checkbox"
                  />{" "}
                  Do you have a laptop?
                </label>
                <label className="flex gap-3 text-sm">
                  <input
                    checked={form.internet}
                    onChange={(e) => set("internet", e.target.checked)}
                    type="checkbox"
                  />{" "}
                  Do you have stable internet?
                </label>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <h1 className="text-3xl font-black">Batch Preference</h1>
              <p className="mt-2 text-sm text-[#68736d]">
                Choose your preferred learning mode and schedule.
              </p>
              <div className="mt-8 space-y-6">
                <label className="block text-sm font-bold">
                  Mode *
                  <select
                    value={form.mode}
                    onChange={(e) => set("mode", e.target.value)}
                    className="mt-2 w-full border border-[#cfd9d3] bg-[#fbfcfb] px-4 py-4 font-normal"
                  >
                    <option>Online (3500 ETB)</option>
                    <option>In-person (4000 ETB)</option>
                  </select>
                </label>
                <label className="block text-sm font-bold">
                  Preferred Schedule
                  <select
                    value={form.schedule}
                    onChange={(e) => set("schedule", e.target.value)}
                    className="mt-2 w-full border border-[#cfd9d3] bg-[#fbfcfb] px-4 py-4 font-normal"
                  >
                    <option>Morning</option>
                    <option>Evening</option>
                    <option>Weekend</option>
                  </select>
                </label>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <h1 className="text-3xl font-black">Review Your Application</h1>
              <p className="mt-2 text-sm text-[#68736d]">
                Check your details before submitting.
              </p>
              <div className="mt-8 divide-y divide-[#e0e7e2] text-sm">
                {Object.entries(form).map(([k, v]) => (
                  <div key={k} className="grid grid-cols-2 py-4">
                    <span className="capitalize text-[#68736d]">{k}</span>
                    <b>
                      {typeof v === "boolean"
                        ? v
                          ? "Yes"
                          : "No"
                        : v || "Not provided"}
                    </b>
                  </div>
                ))}
              </div>
            </>
          )}
          {step === 4 && (
            <div className="py-16 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#00d38d] text-4xl text-white">
                ✓
              </div>
              <h1 className="mt-8 text-4xl font-black">
                Application Submitted{" "}
                <span className="text-[#00d38d]">Successfully!</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#68736d]">
                Thank you for applying to TechVision&apos;s Front-End
                Development Bootcamp. We have received your application and will
                review it shortly.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/dashboard/applications/frontend"
                  className="border border-[#66736b] px-7 py-3 text-sm font-bold"
                >
                  View your response
                </Link>
                <Link
                  href="/"
                  className="bg-[#00d38d] px-7 py-3 text-sm font-bold"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          )}
          {step < 4 && (
            <div className="mt-10 flex items-center justify-between">
              <button
                disabled={step === 0}
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="border border-[#d0d8d3] px-5 py-3 text-sm disabled:opacity-30"
              >
                Previous
              </button>
              <button
                onClick={() => setStep((s) => Math.min(4, s + 1))}
                className="bg-[#00d38d] px-7 py-3 text-sm font-bold"
              >
                {step === 3 ? "Submit Application ↗" : "Next →"}
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
