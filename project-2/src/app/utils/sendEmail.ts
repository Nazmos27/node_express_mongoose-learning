import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to:string, link:string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: config.node_env === 'production', // Use `true` for port 465, `false` for all other ports
      auth: {
        user: 'nazmos789@gmail.com',
        pass: 'whvx capo awmw pydr',
      },
    });

    await transporter.sendMail({
      from: 'nazmos789@gmail.com', // sender address
      to, // list of receivers
      subject: 'Reset Password Link', // Subject line
      text: 'Hello! Have you forgotten your password?', // plain text body
      html: `<b>This is your password reset link</b> ${link}`, // html body
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

