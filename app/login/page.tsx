"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("Sending login link...");

    const res = await fetch("/api/auth/request-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    setMessage(data.message || "Check your email");
  };

  return (
  <div className="relative min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-white to-gray-50 px-6 overflow-hidden">
    
    {/* Background Decor */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-40 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
    </div>

    <div className="w-full max-w-md p-8 bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl shadow-gray-300/40">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Welcome back
        </h1>
        <p className="text-gray-500 mt-2">
          Enter your email for a secure magic link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="name@company.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-4 bg-white border border-gray-300 rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-900"
          />
        </div>

        <button
          type="submit"
          className="group relative w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-2xl shadow-xl transition-all active:scale-[0.98] overflow-hidden"
        >
          <span className="relative z-10">Send Magic Link</span>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500" />
        </button>
      </form>

      {/* Success Message */}
      {message && (
        <div className="mt-6 p-4 bg-black rounded-2xl animate-in fade-in slide-in-from-top-2">
          <p className="text-sm text-white text-center font-medium">
            {message}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-10 pt-6 border-t border-gray-200">
        <p className="text-center text-[10px] text-gray-500 uppercase tracking-[0.2em] font-semibold">
          Secure • Passwordless • Fast
        </p>
      </div>
    </div>
  </div>
);

}
