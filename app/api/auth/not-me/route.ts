import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { LoginAttempt } from "@/models/LoginAttempt";
import { LoginToken } from "@/models/LoginToken";
import { hashToken } from "@/lib/token";

export async function GET(req:Request){
    await connectDB();

    let ip =req.headers.get("x-forwarded-for") ||req.headers.get("x-real-ip") ||"8.8.8.8";
//localhost testing fallback
    if (ip === "::1" || ip === "127.0.0.1") {
      ip = "8.8.8.8";
    }
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    if(!token){
        return NextResponse.json({message:"token not found"})
    }
    const tokenHash = hashToken(token);


    const loginToken = await LoginToken.findOne({ token:tokenHash });
    if (loginToken) {
        loginToken.used = true;
        await loginToken.save();

        await LoginAttempt.create({
            userId: loginToken.userId,
            email: loginToken.email,
            status: "suspicious",
            ipAddress:ip,
            location: loginToken.location,
        });
    }
    return NextResponse.json({message: "Login attempt cancelled"});

}