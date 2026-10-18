import Link from 'next/link'
import { BrandLogo } from '@/components/BrandLogo'

export default function Login() {
  return (
    <main className="min-h-screen bg-[#f7faf8] px-5 py-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <BrandLogo className="h-8" />

        <section className="mx-auto mt-10 max-w-xl rounded-xl border border-[#dce5df] bg-white p-8 shadow-[0_18px_50px_rgba(26,55,40,.08)] sm:mt-14 sm:p-12">
          <div className="text-center">
            <h1 className="text-4xl font-black">Welcome back</h1>
            <p className="mt-3 text-sm text-[#6a756e]">Sign in to continue to your TechVision account.</p>
          </div>

          <form className="mt-10 space-y-6">
            <label className="block text-sm font-bold">
              Email
              <input className="mt-2 w-full rounded-md border border-[#cfd9d3] bg-[#fbfcfb] px-4 py-3.5 font-normal outline-none focus:border-[#00d38d]" placeholder="Enter your email address" type="email" />
            </label>
            <label className="block text-sm font-bold">
              Password
              <input className="mt-2 w-full rounded-md border border-[#cfd9d3] bg-[#fbfcfb] px-4 py-3.5 font-normal outline-none focus:border-[#00d38d]" placeholder="Enter your password" type="password" />
            </label>
            <div className="flex items-center justify-between text-xs text-[#68736d]">
              <label className="flex items-center gap-2"><input type="checkbox" /> Remember me</label>
              <a href="#" className="font-semibold text-[#168452]">Forgot password?</a>
            </div>
  
              <a href="https://learn.techvision.edu.et" className="block rounded-md bg-[#00d38d] py-3.5 text-center font-bold text-[#002333] transition hover:bg-[#00bf80]">
              Login →
            </a>
          </form>

          <p className="mt-8 text-center text-sm text-[#68736d]">
            Don&apos;t have an account? <Link href="/signup" className="font-bold text-[#168452]">Create one</Link>
          </p>
        </section>
      </div>
    </main>
  )
}
