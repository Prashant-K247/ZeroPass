import Link from "next/link";

export default function Home() {
  return (
  <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-white to-gray-50 px-6">
    <div className="text-center max-w-2xl">
      {/* Decorative Badge */}
      <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-black uppercase bg-gray-300 rounded-full">
        Next-Gen Security
      </span>

      {/* Hero Text */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-400 tracking-tight mb-6">ZeroPass</h1>
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
        <span className="text-slate-100">Passwordless</span> <span className="text-gray-400 italic">Auth Demo</span>
      </h1>

      <p className="text-lg text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
        Experience a friction-free login flow. No passwords to remember, 
        just secure magic links delivered straight to your inbox.
      </p>

      {/* Primary CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/login" className="group relative inline-flex items-center justify-center bg-white text-black px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-gray-600 hover:shadow-2xl active:scale-95 overflow-hidden">
          <span className="relative z-10">Get Started Now</span>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-500" />
        </Link>
        <Link href="/docs">
        <button className="px-8 py-4 text-gray-500 font-medium hover:text-white transition-colors">
          View Docs →
        </button>
        </Link>
      </div>

      {/* Background Decor (Optional) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
         <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
         <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      </div>
    </div>
  </div>
);
}
