"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailSender = async (email, title, body) => {
    try {
        // Create a Transporter to send emails
        let transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            host: process.env.MAIL_HOST,
            port: parseInt(process.env.MAIL_PORT),
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            from: process.env.MAIL_USER,
            tls: {
                rejectUnauthorized: false,
            }
        });
        // Send emails to users
        let info = await transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: title,
            html: body,
            text: "UzaForms"
        });
        console.log('Email info: ', info.envelope, info.messageId);
        return info;
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.default = mailSender;
//# sourceMappingURL=mail.sender.js.map