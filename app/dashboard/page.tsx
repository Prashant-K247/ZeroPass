import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/jwt";
import { redirect } from "next/navigation";

async function getAttempts() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  const res = await fetch(
    "http://localhost:3000/api/dashboard/attempts",
    {
      cache: "no-store",
      headers: {
        Cookie: `session=${session?.value}`,
      },
    }
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function Dashboard() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    redirect("/login");
  }

  const payload = verifySessionToken(session.value);

  if (!payload) {
    redirect("/login");
  }
  
  const userId = (payload as any).userId;

  const attempts = await getAttempts();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">
        Login Attempts
      </h1>

      <div className="space-y-2">
        {Array.isArray(attempts) &&
        attempts.map((a: any) => (
        <div key={a._id} className="border p-3 rounded">
        <p>Email: {a.userId?.email}</p>
        <p>Status: {a.status}</p>
        <p>IP: {a.ipAddress}</p>
        <p>Location: {a.location}</p>
      </div>
    ))}
</div>
    </div>
  );
}
