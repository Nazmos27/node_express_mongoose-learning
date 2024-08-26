import nodemailer from 'nodemailer'
import config from '../config';

export const sendEmail = async() => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.node_env = 'production', // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "nazmos789@gmail.com",
          pass: "whvx capo awmw pydr",
        },
      });

        await transporter.sendMail({
        from: 'nazmos789@gmail.com', // sender address
        to: "b190501053@law.jnu.ac.bd", // list of receivers
        subject: "Reset Password Link", // Subject line
        text: "Hello! Have you forgotten your password?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    
}