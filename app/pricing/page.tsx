import Link from "next/link";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";

const plans = [
  {
    name: "Free",
    price: "0",
    unit: "ETB",
    note: "Forever free",
    features: [
      "HTML & CSS Basics",
      "JavaScript Fundamentals",
      "Practice exercises",
      "Self-paced learning",
    ],
    cta: "GET STARTED",
    href: "https://learn.techvision.edu.et/login?redirect-to=/lms/courses/#login",
    soon:false,
  },
  {
    name: "Online Bootcamp",
    price: "3,500",
    unit: "ETB /month",
    note: "12 weeks duration",
    features: [
      "12 Weeks Live Training",
      "4 Classes / Week (2 hrs each)",
      "React + Next.js curriculum",
      "Real-world projects",
      "Instructor-led sessions",
      "Max 20 students per batch",
    ],
    cta: "APPLY NOW",
    href: "https://learn.techvision.edu.et/batch-application/new",
    popular: true,
    soon:false,
  },
  {
    name: "In-Person",
    price: "6,000",
    unit: "ETB /month",
    note: "12 weeks duration",
    features: [
      "Everything in Online",
      "Physical classroom sessions",
      "Direct in-person support",
      "Better peer networking",
    ],
    cta: "COMING SOON",
    href: "",
    soon:true,
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-white px-6 pb-20 pt-20 text-[#111613]">
        <div className="mx-auto max-w-6xl text-center">
          <span className="tv-mono border border-[#77d7a0] px-4 py-1 text-xs text-[#00d38d]">
            PRICING
          </span>
          <h1 className="mt-7 text-4xl font-black sm:text-5xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-5 text-[#9aa39e]">
            Start free. Upgrade when you're ready to go pro.
          </p>
        </div>
        <div className="mx-auto mt-20 grid max-w-6xl gap-6 md:grid-cols-3 ">
          {plans.map((p) => (
            <article
              key={p.name}
              className={`relative flex min-h-[480px] flex-col border p-8 ${p.popular ? "border-[#00d38d] bg-[#0e241a] text-white" : "border-[#fffff] bg-white"}`}
            >
              {p.popular && (
                <span className="tv-mono absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00d38d] px-4 py-2 text-lg font-bold text-white">
                  MOST POPULAR
                </span>
              )}
              {p.soon && (
                <span className="tv-mono absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0e241a] px-4 py-2  font-bold text-lg text-white">
                 COMING SOON
                </span>
              )}
              <h2 className="text-lg font-bold">{p.name}</h2>
              <div className="mt-6 flex items-end gap-2">
                <span
                  className={`text-4xl font-black ${p.popular ? "text-[#00d38d]" : ""}`}
                >
                  {p.price}
                </span>
                <span className="pb-1 text-sm text-[#9aa39e]">{p.unit}</span>
              </div>
              <p className="mt-4 text-sm text-[#9aa39e]">{p.note}</p>
              <ul className="mt-12 flex-1 space-y-4 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="text-[#00d38d]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={p.href}
                className={`tv-mono mt-8 block py-3 text-center text-xs font-bold ${p.popular ? "bg-[#00d38d] text-white" : "border border-[#69736d] text-[#00d38d]"}`}
              >
                {p.cta}
              </Link>
            </article>
          ))}
        </div>

        <section className="mx-auto mt-24 max-w-6xl">
          <h2 className="text-center text-3xl font-black">Compare Plans</h2>
          <div className="mt-10 overflow-x-auto border border-[#606c65]">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-[#aeb8b2] text-left">
                  <th className="p-5">Feature</th>
                  <th className="p-5 text-center text-[#9aa39e]">Free</th>
                  <th className="p-5 text-center text-[#00d38d]">Online</th>
                  <th className="p-5 text-center text-[#9aa39e]">In-Person</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["HTML / CSS & JavaScript", "✓", "✓", "✓"],
                  ["Live Classes", "–", "✓", "✓"],
                  ["Projects", "Basic", "Advanced", "Advanced"],
                  ["Instructor Support", "–", "✓", "✓"],
                  ["Classroom Access", "–", "–", "✓"],
                ].map((r) => (
                  <tr
                    key={r[0]}
                    className="border-b border-[#cbd3ce] last:border-0"
                  >
                    <td className="p-5 font-semibold">{r[0]}</td>
                    <td className="p-5 text-center text-[#9aa39e]">{r[1]}</td>
                    <td className="p-5 text-center text-[#00d38d]">{r[2]}</td>
                    <td className="p-5 text-center text-[#9aa39e]">{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="mx-auto mt-24 max-w-4xl text-center">
          <h2 className="text-3xl font-black">
            Ready to Become a Frontend Developer?
          </h2>
          <p className="mt-5 text-[#9aa39e]">
            Limited to 20 students per batch. Secure your spot now.
          </p>
          <Link
            href="https://learn.techvision.edu.et/batch-application/new"
            className="tv-mono mt-8 inline-block bg-[#00d38d] px-8 py-4 text-xs font-bold"
          >
            APPLY FOR NEXT BATCH
          </Link>
        </section>
        <section className="mx-auto mt-24 flex max-w-6xl flex-col gap-8 border border-[#657069] p-10 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="tv-mono rounded-full border border-[#77d7a0] px-3 py-1 text-[10px] text-[#00d38d]">
              JOIN TECHVISION
            </span>
            <h2 className="mt-5 text-3xl font-black">
              Start your software engineering journey today.
            </h2>
            <p className="mt-3 text-sm text-[#9aa39e]">
              Learn from industry mentors, build real-world projects, and
              prepare for tech careers.
            </p>
          </div>
          <Link
            href="https://learn.techvision.edu.et/login"
            className="tv-mono bg-[#00d38d] px-8 py-4 text-xs font-bold"
          >
            APPLY NOW →
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
