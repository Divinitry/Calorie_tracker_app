import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import "dotenv/config";

const htmlTemplate = fs.readFileSync(
  path.resolve(__dirname, "password-recovery.html"),
  "utf8"
);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APPPASS,
  },
});

const sendRecoveryHash = async (info: { userEmail: string; code: string }) => {
  const html = htmlTemplate
    .replace(/{{CODE}}/g, info.code)
    .replace(/{{YEAR}}/g, new Date().getFullYear().toString());

  await transporter.sendMail({
    from: `"FitTracker" <${process.env.GMAIL_USER}>`,
    to: info.userEmail,
    subject: "Your password recovery code",
    text: `We received a request to reset your password. Your code: ${info.code}`,
    html,
  });
};

export default sendRecoveryHash;
