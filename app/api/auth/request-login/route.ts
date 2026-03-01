import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { generateToken } from "@/lib/token";
import { User } from "@/models/Users";
import { LoginToken } from "@/models/LoginToken";
import { sendLoginEmail } from "@/lib/mailer";
import { getLocationFromIP } from "@/lib/location";

export async function POST(req:Request){
    await connectDB();
    const forwarded = req.headers.get("x-forwarded-for");

    let ip = forwarded
      ? forwarded.split(",")[0].trim()
      : req.headers.get("x-real-ip") || "8.8.8.8";
    
    if (ip === "::1" || ip === "127.0.0.1") {
      ip = "8.8.8.8";
    }
    const location = await getLocationFromIP(ip);
    console.log("IP:", ip);
    console.log("Location:", location);

    const body = await req.json();
    const { email } = body;

    let user = await User.findOne({email});

    if(!user){
        user = await User.create({email});
    }
    
    const { token, tokenHash } = generateToken();
    // console.log("PLAIN TOKEN:", token);
    // console.log("HASHED TOKEN:", tokenHash);

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await LoginToken.create({
        userId: user._id,
        token:tokenHash,
        expiresAt,
        used: false,
        ipAddress:ip,
        location,
    });

    await sendLoginEmail(email,token);

    return NextResponse.json({message:"Login email sent"});


}