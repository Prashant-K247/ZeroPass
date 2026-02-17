import nodemailer from "nodemailer";

export async function sendLoginEmail(to:string, token:string){

    const Transporter = nodemailer.createTransport(
        {
            service:"gmail",
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        }
    )
    const verifyLink = `${process.env.BASE_URL}/api/auth/verify?token=${token}`;
    const notMeLink = `${process.env.BASE_URL}/api/auth/not-me?token=${token}`;

    await Transporter.sendMail({
        from:process.env.EMAIL_USER,
        to,
        subject:"Login to your Account",
        html:`<h2>Login Request</h2> <p>Click below to confirm:</p> <a href="${verifyLink}">Yes, it's me</a> <br/><br/> <a href="${notMeLink}">No, this wasn't me</a>`,
    })
}