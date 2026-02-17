import { model, Schema, models } from "mongoose";
import mongoose from "mongoose";

const LoginTokenSchema=new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        token: String,
        expiresAt: Date,
        used: { type: Boolean, default: false },
        ipAddress: String,
        location: String,
        createdAt: { type: Date, default: Date.now },
    }
)

export const LoginToken = models.LoginToken || model("LoginToken",LoginTokenSchema);