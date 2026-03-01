import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendLoginEmail(to: string, token: string) {

  const verifyLink = `${process.env.BASE_URL}/api/auth/verify?token=${token}`;
  const notMeLink = `${process.env.BASE_URL}/api/auth/not-me?token=${token}`;

  await resend.emails.send({
    from: "ZeroPass <onboarding@resend.dev>",
    to: to,
    subject: "Login to your ZeroPass account",
    html: `
    <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:40px 20px;">
        <div style="max-width:480px; margin:0 auto; background:#ffffff; border-radius:12px; padding:32px; box-shadow:0 6px 20px rgba(0,0,0,0.08);">

            <h1 style="margin:0 0 10px; font-size:24px; color:#111827;">
                ZeroPass
            </h1>

            <h2 style="margin:0 0 16px; font-size:20px; color:#111827;">
                Confirm your login
            </h2>

            <p style="font-size:15px; color:#4b5563; line-height:1.6;">
                We received a request to sign in to your ZeroPass account.
                Click the button below to securely continue.
            </p>

            <div style="text-align:center; margin:28px 0;">
                <a href="${verifyLink}" 
                   style="display:inline-block; padding:14px 24px; background:#111827; color:#ffffff; text-decoration:none; font-size:16px; border-radius:8px; font-weight:600;">
                   Yes, it's me
                </a>
            </div>

            <p style="font-size:14px; color:#6b7280; text-align:center;">
                If you didn’t request this, you can secure your account:
            </p>

            <div style="text-align:center; margin:16px 0 24px;">
                <a href="${notMeLink}" 
                   style="display:inline-block; padding:10px 18px; background:#f3f4f6; color:#111827; text-decoration:none; font-size:14px; border-radius:6px; font-weight:500;">
                   No, this wasn’t me
                </a>
            </div>

            <hr style="border:none; border-top:1px solid #e5e7eb; margin:24px 0;" />

            <p style="font-size:12px; color:#9ca3af; text-align:center; line-height:1.5;">
                This login link will expire in 10 minutes for your security.<br/>
                If you didn’t try to sign in / login, you can press not me button provided in this email.
            </p>

        </div>

        <p style="text-align:center; font-size:12px; color:#9ca3af; margin-top:16px;">
            © ${new Date().getFullYear()} ZeroPass. All rights reserved.
        </p>
    </div>
    `,
  });
}