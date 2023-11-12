import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import config from '../../config/config.js';
class SendEmailsService {
    private transporter: Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.mail.email,
                pass: config.mail.password,
            },
        });
    }

    async sendMail(to: string, subject: string, html: string): Promise<void> {
        const mailOptions: SendMailOptions = {
            from: 'mern.overflow@gmail.com',
            to,
            subject,
            html,
        };

        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve();
                }
            });
        });
    }
}

export default new SendEmailsService();
