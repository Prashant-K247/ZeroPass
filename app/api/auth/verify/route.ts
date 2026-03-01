import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { LoginAttempt } from "@/models/LoginAttempt";
import { LoginToken } from "@/models/LoginToken";
import { hashToken } from "@/lib/token";
import { createSessionToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET(req: Request){
    await connectDB();
    const forwarded = req.headers.get("x-forwarded-for");

    let ip = forwarded
      ? forwarded.split(",")[0].trim()
      : req.headers.get("x-real-ip") || "8.8.8.8";

    if (ip === "::1" || ip === "127.0.0.1") {
      ip = "8.8.8.8";
    }
  
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token missing" });
    }

    const tokenHash = hashToken(token);

    const loginToken = await LoginToken.findOne({
      token: tokenHash,
    });
    // console.log("TOKEN FROM URL:", token);
    // console.log("HASHED FROM URL:", tokenHash);
    // console.log("DB TOKEN:", loginToken?.token);

    if(!loginToken || loginToken.used){
        return NextResponse.json({ error: "Invalid token" });
    }
    if(loginToken.expiresAt < new Date()){
        return NextResponse.json({ error: "Token expired" });
    }

    loginToken.used=true;
    await loginToken.save();
    await LoginAttempt.create({
        userId: loginToken.userId,
        email: loginToken.email,
        status: "success",
        location: loginToken.location,
        ipAddress:ip,
    });


    // create JWT session
    const sessionToken = createSessionToken(
      loginToken.userId.toString()
    );

    const cookieStore = await cookies();

    cookieStore.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    return NextResponse.redirect(`${process.env.BASE_URL}/dashboard`);
}














