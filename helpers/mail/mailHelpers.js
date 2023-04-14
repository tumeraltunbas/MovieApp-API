import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { createToken } from "../utils/tokenHelpers.js";

dotenv.config({path: "./config/config.env"});

const {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS} = process.env;

export const sendMail = (mailOptions) => {

    const transport = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
        }
    });

    transport.sendMail(mailOptions);
}




export const sendEmailVerificationTokenToUser = (email, token) => {

    const {DOMAIN} = process.env;

    const emailVerificationLink = `${DOMAIN}/api/auth/emailVerification?emailVerificationToken=${token}`;

    const mailOptions = {
        from: SMTP_USER,
        to: email,
        subject: "Email Verification",
        html: `<h3>Here is your email verification <a href="${emailVerificationLink}">link</a>. This link is only valid for 30 minutes.</h3>`
    }

    sendMail(mailOptions);
}