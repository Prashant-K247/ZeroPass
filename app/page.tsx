import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">
          Passwordless Auth Demo
        </h1>

        <Link
          href="/login"
          className="inline-block bg-black text-white px-6 py-2 rounded"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}
