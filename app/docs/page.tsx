import React from 'react';
import Link from 'next/link'; 

export default function Docs() {
  return (
    <div className="min-h-screen bg-gray-950 text-slate-900 font-sans selection:bg-blue-100">
      {/* Hero Header */}
      <div className="bg- border-b border-slate-200 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">Z</div>
            <Link href="/">
            <h1 className="text-xl font-bold tracking-tight text-white">ZeroPass</h1>
            </Link>
          </div>
          <div className="text-xs font-medium px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
            v1.0.0 Documentation
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Quick Navigation Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block space-y-4 sticky top-24 h-fit">
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-widest">On this page</p>
            <nav className="flex flex-col gap-2 text-sm font-medium text-slate-500">
              <a href="#overview" className="hover:text-blue-600 transition-colors">Overview</a>
              <a href="#features" className="hover:text-blue-600 transition-colors">Core Features</a>
              <a href="#architecture" className="hover:text-blue-600 transition-colors">Architecture</a>
              <a href="#database" className="hover:text-blue-600 transition-colors">Database Schema</a>
              <a href="#security" className="hover:text-blue-600 transition-colors">Security</a>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-20">
            
            {/* Project Overview */}
            <section id="overview">
              <h2 className="text-3xl font-extrabold mb-4 tracking-tight text-slate-100">Project Overview</h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                A high-security, passwordless authentication system built with the modern stack. Instead of vulnerable passwords, users verify identity via cryptographically signed magic links.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "One-time login tokens", "Token hashing (SHA-256)", 
                  "Expiration logic", "Suspicious login detection", 
                  "IP & Location tracking", "JWT session management"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Tech Stack Table */}
            <section id="architecture">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-100">
                <span className="w-6 h-1 bg-blue-600 rounded-full" /> Tech Stack
              </h3>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gray-400">
                <table className="w-full text-left border-collapse">
                  <tbody className="text-sm">
                    <tr className="border-b border-slate-100 group">
                      <td className="py-4 px-6 font-semibold bg-slate-50/50 w-1/3">Frontend</td>
                      <td className="py-4 px-6 text-gray-900">Next.js (App Router), React, Tailwind CSS</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-6 font-semibold bg-slate-50/50">Backend</td>
                      <td className="py-4 px-6 text-gray-900">Node.js, Next.js API routes</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-6 font-semibold bg-slate-50/50">Database</td>
                      <td className="py-4 px-6 text-gray-900">MongoDB with Mongoose</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold bg-slate-50/50">Auth & Mail</td>
                      <td className="py-4 px-6 text-gray-900">JWT, Nodemailer (Gmail SMTP)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Database Schema - Code Style */}
            <section id="database">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-100">
                <span className="w-6 h-1 bg-blue-600 rounded-full" /> Data Models
              </h3>
              <div className="space-y-4">
                {[
                  { name: "User", fields: ["_id", "email", "createdAt"] },
                  { name: "LoginToken", fields: ["userId", "token (hashed)", "expiresAt", "used", "ipAddress"] },
                  { name: "LoginAttempt", fields: ["userId", "ipAddress", "location", "status (success/failed)"] }
                ].map((model) => (
                  <div key={model.name} className="bg-slate-900 rounded-xl p-5 font-mono text-xs shadow-xl">
                    <p className="text-blue-400 mb-2 font-bold">// {model.name} Schema</p>
                    <p className="text-slate-300">{"{"}</p>
                    {model.fields.map(f => <p key={f} className="pl-6 text-slate-400 italic"> {f},</p>)}
                    <p className="text-slate-300">{"}"}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Security Callout */}
            <section id="security" className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Security Mechanisms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-50 text-sm">
                  <div className="space-y-2">
                    <p className="font-bold text-white underline decoration-blue-400 underline-offset-4">Cryptographic Integrity</p>
                    <p>Uses 256-bit entropy via <code>crypto.randomBytes(32)</code>. Even if the DB is leaked, tokens are SHA-256 hashed.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-white underline decoration-blue-400 underline-offset-4">Session Protection</p>
                    <p>JWT sessions are stored in HTTP-only, Secure cookies to prevent XSS-based session hijacking.</p>
                  </div>
                </div>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            </section>

          </main>
        </div>
      </div>
      
      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-400">© 2026 Documentation Portal. All rights reserved.</p>
      </footer>
    </div>
  );
}