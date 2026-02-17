import mongoose from "mongoose";
import {model, models, Schema} from "mongoose";

const LoignAttemptSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        ipAddress: String,
        location: String,
        status: {
          type: String,
          enum: ["success", "failed", "suspicious"],
        },
        createdAt: { type: Date, default: Date.now },
    }
)

export const LoginAttempt = models.LoginAttempt || model("LoginAttempt", LoignAttemptSchema);
