"use client";

import { useState } from "react";

export default function HireCourseCreator() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    expertise: "",
    experience: "",
    portfolio: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", form);

    alert("Application submitted successfully 🚀");

    setForm({
      name: "",
      email: "",
      expertise: "",
      experience: "",
      portfolio: "",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-16">
      
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-4">
          Become a Course Creator
        </h1>
        <p className="text-gray-400 text-center mb-10">
          Join TechVision LMS and start earning by creating high-quality courses.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-8 rounded-2xl space-y-6 shadow-lg"
        >
          {/* Name */}
          <div>
            <label className="block mb-2 text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-gray-300">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700"
            />
          </div>

          {/* Expertise */}
          <div>
            <label className="block mb-2 text-gray-300">
              Area of Expertise
            </label>
            <input
              type="text"
              name="expertise"
              placeholder="e.g. Web Development, AI, Design"
              value={form.expertise}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block mb-2 text-gray-300">
              Years of Experience
            </label>
            <select
              name="experience"
              value={form.experience}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700"
            >
              <option value="">Select</option>
              <option>0-1 years</option>
              <option>2-3 years</option>
              <option>4-6 years</option>
              <option>7+ years</option>
            </select>
          </div>

          {/* Portfolio */}
          <div>
            <label className="block mb-2 text-gray-300">
              Portfolio / Links
            </label>
            <input
              type="url"
              name="portfolio"
              placeholder="Website, YouTube, GitHub..."
              value={form.portfolio}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 text-gray-300">
              Tell us about yourself
            </label>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 py-3 rounded-xl text-lg hover:bg-blue-700"
          >
            Apply Now
          </button>
        </form>
      </div>
    </main>
  );
}