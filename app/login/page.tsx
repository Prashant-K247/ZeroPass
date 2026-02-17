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
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 border rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded"
          >
            Send Login Link
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-gray-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
