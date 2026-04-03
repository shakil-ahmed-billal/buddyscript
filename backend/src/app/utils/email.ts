import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import config from "../config/index.js";
import AppError from "../errorHelpers/ApiError.js";
import httpStatus from "http-status";

const transporter = nodemailer.createTransport({
    host: config.email_sender.smtp_host,
    port: Number(config.email_sender.smtp_port),
    secure: Number(config.email_sender.smtp_port) === 465,
    auth: {
        user: config.email_sender.smtp_user,
        pass: config.email_sender.smtp_pass,
    },
});

interface SendEmailOptions {
    to: string;
    subject: string;
    templateName: string;
    templateData: Record<string, any>;
}

export const sendEmail = async ({ to, subject, templateName, templateData }: SendEmailOptions) => {
    try {
        const templatePath = path.resolve(process.cwd(), `src/app/templates/${templateName}.ejs`);
        const html = await ejs.renderFile(templatePath, templateData);

        const info = await transporter.sendMail({
            from: config.email_sender.smtp_from,
            to,
            subject,
            html,
        });

        console.log(`Email sent to ${to}: ${info.messageId}`);
    } catch (error: any) {
        console.error("Email Sending Error:", error.message);
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to send email");
    }
};
