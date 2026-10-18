"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Code2,
  Globe,
  GraduationCap,
  Rocket,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";

const stories = [
  {
    name: "Naol Bekele",
    role: "Frontend Developer",
    company: "Fintech Startup",
    university: "ASTU Graduate",
    category: "self-taught",
    label: "Self-Taught to Employed",
    img: "/ethiopian_student1.png",
    quote:
      "The project-based structure helped me stop only watching tutorials and start building work I could actually show.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
  },
  {
    name: "Hiwot Tesfaye",
    role: "Junior React Developer",
    company: "SaaS Solutions",
    university: "AAU Student",
    category: "university",
    label: "Academic to Developer",
    img: "/ethiopian_student2.png",
    quote:
      "Small cohorts and direct feedback made the difference. My mentor knew where I was struggling and what I needed next.",
    stack: ["React", "Next.js", "REST APIs"],
    featured: true,
  },
  {
    name: "Samuel Girma",
    role: "Freelance Developer",
    company: "Remote Clients",
    university: "Bahir Dar University",
    category: "freelancer",
    label: "Portfolio to Paid Work",
    img: "/ethiopian_student3.png",
    quote:
      "The portfolio projects gave me better work to show clients and made my proposals much stronger.",
    stack: ["Next.js", "Supabase", "Node.js"],
    featured: true,
  },
  {
    name: "Betelhem Alemu",
    role: "UI/UX & Frontend Engineer",
    company: "Creative Tech Agency",
    university: "Jimma University",
    category: "career-switcher",
    label: "Designer to Developer",
    img: "/ethiopian_student4.png",
    quote:
      "Learning to turn my own designs into working interfaces made me much more confident across both design and development.",
    stack: ["Figma", "React", "Tailwind CSS"],
    featured: true,
  },
];

const roadmap = [
  [
    "Weeks 1–4",
    "Strong Foundations",
    "HTML, CSS, JavaScript and Git fundamentals.",
    "Responsive web project",
  ],
  [
    "Weeks 5–8",
    "Modern Frontend",
    "React, components, state and API integration.",
    "Interactive application",
  ],
  [
    "Weeks 9–10",
    "Production Skills",
    "Next.js workflows, debugging and code review.",
    "Team-style project",
  ],
  [
    "Weeks 11–12",
    "Career Readiness",
    "Portfolio polishing, presentation and interview preparation.",
    "Portfolio + final project",
  ],
];

const hiringAreas = [
  ["Fintech", Zap],
  ["Banking", Building2],
  ["Remote Work", Globe],
  ["Startups", Rocket],
  ["SaaS", Code2],
  ["Agencies", Briefcase],
] as const;

export function SuccessStoriesPage() {
  const featured = stories.filter((story) => story.featured);

  return (
    <main className="bg-[#fbfffc] text-[#0b100d]">
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 text-center sm:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="tv-mono text-xs uppercase text-[#00d38d]">
            Student Success
          </div>
          <h1 className="mt-5 text-5xl font-black tracking-tight sm:text-6xl">
            Real Stories, Real <span className="text-[#00d38d]">Progress</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#68736d] sm:text-base">
            Explore how students used practical projects, mentorship and
            consistent practice to move toward real technical work.
          </p>
        </motion.div>
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-5 border-y border-[#dce5df] py-7">
          <div>
            <b className="text-3xl sm:text-4xl">350+</b>
            <p className="mt-1 text-xs text-[#68736d] sm:text-sm">Graduates</p>
          </div>
          <div>
            <b className="text-3xl sm:text-4xl">50+</b>
            <p className="mt-1 text-xs text-[#68736d] sm:text-sm">
              Hiring Partners
            </p>
          </div>
          <div>
            <b className="text-3xl sm:text-4xl">20+</b>
            <p className="mt-1 text-xs text-[#68736d] sm:text-sm">Mentors</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-9 flex items-end justify-between gap-5">
          <div>
            <div className="tv-mono text-[11px] text-[#00d38d]">
              FEATURED STORIES
            </div>
            <h2 className="mt-2 text-3xl font-black">Graduate spotlights</h2>
          </div>
          <Sparkles className="hidden text-[#00d38d] sm:block" size={24} />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((story, index) => (
            <motion.article
              key={story.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="tv-card overflow-hidden  border border-[#dce5df] bg-white "
            >
              <div className="grid sm:grid-cols-[180px_1fr]">
                <div className="relative min-h-56 bg-[#eaf8ef]">
                  <Image
                    src={story.img}
                    alt="Student success profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="tv-mono text-[10px] text-[#00d38d]">
                    {story.label.toUpperCase()}
                  </span>
                  <h3 className="mt-3 text-xl font-black">{story.name}</h3>
                  <p className="mt-1 text-sm text-[#68736d]">
                    {story.role} · {story.company}
                  </p>
                  <p className="mt-5 text-sm leading-6">“{story.quote}”</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {story.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-[#eaf8ef] px-2.5 py-1 text-[10px] font-bold text-[#168452]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
      {/** 
      <section className="border-y border-[#dce5df] bg-[#f7faf8] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div><div className="tv-mono text-[11px] text-[#00d38d]">STUDENT GALLERY</div><h2 className="mt-2 text-3xl font-black">Find a story that feels familiar</h2></div>
            <div className="relative w-full max-w-md"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7e8a83]"/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, role, school or skill" className="w-full rounded-lg border border-[#cfd9d3] bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-[#00d38d]"/></div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">{[['all','All'],['university','University'],['self-taught','Self-taught'],['career-switcher','Career switchers'],['freelancer','Freelancers']].map(([value,label]) => <button key={value} onClick={() => setFilter(value)} className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${filter===value?'border-[#00d38d] bg-[#eaf8ef] text-[#168452]':'border-[#dce5df] bg-white hover:border-[#00d38d]'}`}>{label}</button>)}</div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((story) => <article key={story.name} className="tv-card rounded-xl border border-[#dce5df] bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"><div className="flex items-center gap-3"><div className="relative h-12 w-12 overflow-hidden rounded-full bg-[#eaf8ef]"><Image src={story.img} alt="Student profile" fill className="object-cover"/></div><div><h3 className="font-black">{story.name}</h3><p className="text-xs text-[#68736d]">{story.role}</p></div></div><p className="mt-4 text-xs leading-5 text-[#68736d]">{story.university} · {story.company}</p><div className="mt-4 flex flex-wrap gap-1.5">{story.stack.slice(0,2).map((item)=><span key={item} className="rounded bg-[#f0faf4] px-2 py-1 text-[9px] font-bold text-[#168452]">{item}</span>)}</div></article>)}
          </div>
          {filtered.length === 0 && <div className="mt-8 rounded-xl border border-dashed border-[#cfd9d3] bg-white p-8 text-center text-sm text-[#68736d]">No matching stories. Try another search or filter.</div>}
        </div>
      </section>
*/}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <div className="tv-mono text-[11px] text-[#00d38d]">THE JOURNEY</div>
          <h2 className="mt-2 text-3xl font-black">
            How the transformation is structured
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {roadmap.map(([phase, title, desc, deliverable], index) => (
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="tv-card border border-[#dce5df] bg-white p-6"
            >
              <div className="tv-mono text-[10px] font-bold text-[#00d38d]">
                {phase}
              </div>
              <h3 className="mt-3 text-lg font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#68736d]">{desc}</p>
              <div className="mt-5 border-t border-[#e5ece8] pt-4 text-xs font-bold text-[#168452]">
                {deliverable}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-[#fffff] px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <div className="tv-mono text-[11px] text-[#00d38d]">
            WHERE SKILLS CAN LEAD
          </div>
          <h2 className="mt-2 text-3xl font-black">A wider hiring ecosystem</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#68736d]">
            Students can target different kinds of technical teams depending on
            their skills, interests and portfolio.
          </p>
          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {hiringAreas.map(([name, Icon]) => (
              <div
                key={name}
                className="tv-card rounded-xl border border-[#dce5df] bg-white p-5"
              >
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf8ef] text-[#168452]">
                  <Icon size={18} />
                </div>
                <p className="mt-3 text-xs font-bold">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <GraduationCap className="mx-auto text-[#00d38d]" />
        <h2 className="mt-4 text-3xl font-black">
          Build your own success story
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-[#68736d]">
          Start with practical learning, build projects you can show, and get
          feedback as you improve.
        </p>
        <Link
          href="https://learn.techvision.edu.et/login"
          className="mt-7 inline-block rounded-md bg-[#09b37a] px-7 py-3.5 text-sm font-bold"
        >
          Apply to TechVision →
        </Link>
      </section>
    </main>
  );
}
