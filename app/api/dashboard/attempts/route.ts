import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { LoginAttempt } from "@/models/LoginAttempt";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/jwt";

export async function GET() {
  await connectDB();

  // get session cookie
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const payload = verifySessionToken(session.value);

  if (!payload) {
    return NextResponse.json(
      { error: "Invalid session" },
      { status: 401 }
    );
  }

  const userId = (payload as any).userId;

  const attempts = await LoginAttempt.find({ userId })
    .populate("userId", "email")
    .sort({ createdAt: -1 })
    .limit(10);

  return NextResponse.json(attempts);
}
