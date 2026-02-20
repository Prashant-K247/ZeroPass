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
  <div className="relative min-h-screen bg-[#0a0a0a] text-gray-100 px-6 py-12 overflow-hidden">
    
    {/* Animated Background Blobs - Adjusted for Dark Mode */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/30 rounded-full mix-blend-screen filter blur-[120px] animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000" />
    </div>

    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Login Attempts
          </h1>
          <p className="text-gray-400 mt-2 font-medium">
            Real-time monitoring of passwordless authentication events.
          </p>
        </div>
        
        <div className="text-sm font-semibold text-gray-500 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
          Total Logs: <span className="text-white">{attempts?.length || 0}</span>
        </div>
      </div>

      {/* Main Content Card - Dark Glassmorphism */}
      <div className="bg-[#111111]/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-gray-500">User / Email</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-gray-500">IP Address</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-gray-500">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {Array.isArray(attempts) && attempts.length > 0 ? (
                attempts.map((a: any) => (
                  <tr key={a._id} className="hover:bg-white/[0.03] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-300 group-hover:border-white/40 transition-all">
                          {a.userId?.email?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                          {a.userId?.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        a.status === 'success' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 ${a.status === 'success' ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse`} />
                        {a.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm font-mono text-gray-400">
                      {a.ipAddress}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <span className="opacity-50 group-hover:opacity-100 transition-opacity">📍</span>
                        {a.location || 'Unknown'}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center text-gray-600 font-medium">
                    No login attempts recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Info */}
      <p className="mt-8 text-center text-[10px] text-gray-600 uppercase tracking-[0.3em] font-bold">
        Data Encrypted & Synced Securely
      </p>
    </div>
  </div>
);
}
