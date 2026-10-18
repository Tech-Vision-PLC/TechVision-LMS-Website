import Link from "next/link";
import { Navbar } from "@/components/home/Navbar";
export default function Signup() {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-62px)] bg-[#f7faf8] px-5 py-14">
        <section className="mx-auto max-w-2xl border border-[#dce5df] bg-white p-8 sm:p-12">
          <div className="text-center">
            <span className="tv-mono text-xs text-[#00d38d]">
              CREATE ACCOUNT
            </span>
            <h1 className="mt-3 text-4xl font-black">
              Start learning with TechVision
            </h1>
            <p className="mt-3 text-sm text-[#68736d]">
              Create your student account. You can apply to a batch after
              signing in.
            </p>
          </div>
          <form className="mt-10 grid gap-6 sm:grid-cols-2">
            <label className="text-sm font-bold">
              First Name
              <input
                className="mt-2 w-full border border-[#cfd9d3] px-4 py-4 font-normal"
                placeholder="First name"
              />
            </label>
            <label className="text-sm font-bold">
              Last Name
              <input
                className="mt-2 w-full border border-[#cfd9d3] px-4 py-4 font-normal"
                placeholder="Last name"
              />
            </label>
            <label className="text-sm font-bold sm:col-span-2">
              Email
              <input
                className="mt-2 w-full border border-[#cfd9d3] px-4 py-4 font-normal"
                type="email"
                placeholder="you@example.com"
              />
            </label>
            <label className="text-sm font-bold">
              Password
              <input
                className="mt-2 w-full border border-[#cfd9d3] px-4 py-4 font-normal"
                type="password"
                placeholder="Create password"
              />
            </label>
            <label className="text-sm font-bold">
              Confirm Password
              <input
                className="mt-2 w-full border border-[#cfd9d3] px-4 py-4 font-normal"
                type="password"
                placeholder="Repeat password"
              />
            </label>
            <label className="flex items-start gap-3 text-xs text-[#68736d] sm:col-span-2">
              <input className="mt-1" type="checkbox" />I agree to
              TechVision&apos;s terms and privacy policy.
            </label>
            <Link
              href="/dashboard"
              className="bg-[#00d38d] py-4 text-center font-bold sm:col-span-2"
            >
              Create Account →
            </Link>
          </form>
          <p className="mt-7 text-center text-sm text-[#68736d]">
            Already have an account?{" "}
            <Link className="font-bold text-[#168452]" href="/login">
              Login
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}
