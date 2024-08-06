import nodemailer from 'nodemailer';

const mailSender = async (email: string, title: string, body: string) => {
    try {
        // Create a Transporter to send emails
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.MAIL_HOST,
            port: parseInt(process.env.MAIL_PORT as string),
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
            from: process.env.MAIL_USER,
            tls:{
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
        console.log('Email info: ', info.envelope , info.messageId);
        return info;
    } catch (error: any) {
        console.log(error.message);
    }
};

export default mailSender;