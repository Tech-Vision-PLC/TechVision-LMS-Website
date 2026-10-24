"use client";

import { FormEvent, useState } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const initialValues = {
  full_name: "",
  professional_title: "",
  bio: "",
  education: "",
  experience: "",
  expertise: "",
  linkedin: "",
  github: "",
  portfolio: "",
  teaching_reason: "",
  proposed_course: "",
};

type FormValues = typeof initialValues;

const sections = [
  {
    title: "Your Background",
    description: "Tell us about your education and professional experience.",
  },
];

export default function InstructorApplicationForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [cv, setCv] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  function updateField(name: keyof FormValues, value: string) {
    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function validateFile(file: File, type: "image" | "cv") {
    if (file.size > MAX_FILE_SIZE) {
      return "Each file must be smaller than 5 MB.";
    }

    if (
      type === "image" &&
      !["image/jpeg", "image/png", "image/webp"].includes(file.type)
    ) {
      return "Profile photo must be JPG, PNG, or WebP.";
    }

    if (
      type === "cv" &&
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type)
    ) {
      return "CV must be a PDF, DOC, or DOCX file.";
    }

    return "";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setSuccess(false);

    if (!values.full_name.trim()) {
      setMessage("Please enter your full name.");
      return;
    }

    if (!values.professional_title.trim()) {
      setMessage("Please enter your professional title.");
      return;
    }

    if (!values.bio.trim()) {
      setMessage("Please tell us about yourself.");
      return;
    }

    if (!values.proposed_course.trim()) {
      setMessage("Please enter the course you want to teach.");
      return;
    }

    if (profileImage) {
      const error = validateFile(profileImage, "image");
      if (error) {
        setMessage(error);
        return;
      }
    }

    if (cv) {
      const error = validateFile(cv, "cv");
      if (error) {
        setMessage(error);
        return;
      }
    }

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (profileImage) {
      formData.append("profile_image", profileImage);
    }

    if (cv) {
      formData.append("cv", cv);
    }

    setLoading(true);

    try {
      const response = await fetch("/api/instructor-application", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to submit your application."
        );
      }

      setSuccess(true);
      setMessage(
        "Your instructor application has been submitted successfully. Thank you for applying to TechVision!"
      );

      setValues(initialValues);
      setProfileImage(null);
      setCv(null);

      const form = event.currentTarget;
      form.reset();
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

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100";

  const labelClass = "block text-sm font-semibold text-gray-700";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">
            🎓
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
            Teach with TechVision
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Become an Instructor
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
            Share your knowledge, inspire learners, and help build the next
            generation of skilled professionals. Tell us about yourself and
            the course you would like to teach.
          </p>
        </header>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <div>
            <p className="font-semibold text-emerald-950">
              Instructor application
            </p>
            <p className="mt-1 text-sm text-emerald-800">
              No account required to apply.
            </p>
          </div>

          <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800">
            TechVision LMS
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          {/* Personal information */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
            <SectionHeading
              number="01"
              title="Personal Information"
              description="Start with your basic information."
            />

            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="full_name">
                  Full Name *
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  required
                  maxLength={140}
                  autoComplete="name"
                  value={values.full_name}
                  onChange={(e) =>
                    updateField("full_name", e.target.value)
                  }
                  placeholder="Your full name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="professional_title">
                  Professional Title *
                </label>
                <input
                  id="professional_title"
                  name="professional_title"
                  required
                  maxLength={140}
                  value={values.professional_title}
                  onChange={(e) =>
                    updateField("professional_title", e.target.value)
                  }
                  placeholder="e.g. Software Engineer"
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="profile_image">
                  Profile Photo
                </label>
                <input
                  id="profile_image"
                  name="profile_image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) =>
                    setProfileImage(e.target.files?.[0] ?? null)
                  }
                  className="mt-2 block w-full rounded-xl border border-gray-200 p-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:font-semibold file:text-emerald-800"
                />
                <p className="mt-2 text-xs text-gray-500">
                  JPG, PNG, or WebP. Maximum 5 MB.
                </p>
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="bio">
                  About You *
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  required
                  maxLength={5000}
                  rows={5}
                  value={values.bio}
                  onChange={(e) => updateField("bio", e.target.value)}
                  placeholder="Introduce yourself, your background, and what makes you passionate about teaching."
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Education and experience */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
            <SectionHeading
              number="02"
              title="Education & Experience"
              description="Help us understand your qualifications and skills."
            />

            <div className="mt-7 space-y-6">
              <div>
                <label className={labelClass} htmlFor="cv">
                  CV / Resume
                </label>
                <input
                  id="cv"
                  name="cv"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(e) => setCv(e.target.files?.[0] ?? null)}
                  className="mt-2 block w-full rounded-xl border border-gray-200 p-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-4 file:py-2 file:font-semibold file:text-emerald-800"
                />
                <p className="mt-2 text-xs text-gray-500">
                  PDF, DOC, or DOCX. Maximum 5 MB.
                </p>
              </div>

              <div>
                <label className={labelClass} htmlFor="education">
                  Education
                </label>
                <textarea
                  id="education"
                  name="education"
                  rows={3}
                  maxLength={5000}
                  value={values.education}
                  onChange={(e) => updateField("education", e.target.value)}
                  placeholder="Degrees, certifications, institutions, and qualifications."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="experience">
                  Professional Experience
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  rows={4}
                  maxLength={5000}
                  value={values.experience}
                  onChange={(e) => updateField("experience", e.target.value)}
                  placeholder="Describe your work experience and relevant projects."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="expertise">
                  Areas of Expertise
                </label>
                <textarea
                  id="expertise"
                  name="expertise"
                  rows={3}
                  maxLength={5000}
                  value={values.expertise}
                  onChange={(e) => updateField("expertise", e.target.value)}
                  placeholder="e.g. Web Development, Python, Data Structures, Digital Marketing"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Online presence */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
            <SectionHeading
              number="03"
              title="Online Presence"
              description="Share your professional profiles and portfolio."
            />

            <div className="mt-7 space-y-5">
              <UrlField
                id="linkedin"
                label="LinkedIn"
                placeholder="https://www.linkedin.com/in/your-profile"
                value={values.linkedin}
                className={inputClass}
                onChange={(value) => updateField("linkedin", value)}
              />

              <UrlField
                id="github"
                label="GitHub"
                placeholder="https://github.com/your-username"
                value={values.github}
                className={inputClass}
                onChange={(value) => updateField("github", value)}
              />

              <UrlField
                id="portfolio"
                label="Portfolio / Website"
                placeholder="https://yourwebsite.com"
                value={values.portfolio}
                className={inputClass}
                onChange={(value) => updateField("portfolio", value)}
              />
            </div>
          </section>

          {/* Teaching application */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
            <SectionHeading
              number="04"
              title="Teaching Application"
              description="Tell us what you want to teach and why."
            />

            <div className="mt-7 space-y-6">
              <div>
                <label className={labelClass} htmlFor="teaching_reason">
                  Why Do You Want to Teach?
                </label>
                <textarea
                  id="teaching_reason"
                  name="teaching_reason"
                  rows={5}
                  maxLength={5000}
                  value={values.teaching_reason}
                  onChange={(e) =>
                    updateField("teaching_reason", e.target.value)
                  }
                  placeholder="What motivates you to teach on TechVision?"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="proposed_course">
                  Course You Want to Teach *
                </label>
                <input
                  id="proposed_course"
                  name="proposed_course"
                  required
                  maxLength={140}
                  value={values.proposed_course}
                  onChange={(e) =>
                    updateField("proposed_course", e.target.value)
                  }
                  placeholder="e.g. Full-Stack Web Development"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Honeypot field: hidden from ordinary users */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              overflow: "hidden",
              clipPath: "inset(50%)",
            }}
          >
            <label htmlFor="website">Leave this field empty</label>
            <input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {message && (
            <div
              role="status"
              aria-live="polite"
              className={`rounded-xl border p-4 text-sm ${
                success
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <div className="rounded-xl bg-gray-100 p-4 text-sm leading-6 text-gray-600">
            By submitting this application, you confirm that the information
            you provide is accurate and agree that TechVision may use it to
            review your instructor application.
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-emerald-700 px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Submitting Application...
              </>
            ) : (
              <>
                Submit Application
                <span aria-hidden="true">→</span>
              </>
            )}
          </button>

          <p className="text-center text-xs text-gray-500">
            Fields marked with * are required.
          </p>
        </form>

        <footer className="mt-10 text-center text-sm text-gray-500">
          Powered by{" "}
          <span className="font-semibold text-emerald-700">TechVision</span>
        </footer>
      </div>
    </main>
  );
}

function SectionHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 font-bold text-emerald-800">
        {number}
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function UrlField({
  id,
  label,
  placeholder,
  value,
  className,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  className: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type="url"
        maxLength={500}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
}