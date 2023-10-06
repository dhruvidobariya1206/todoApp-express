const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../../.env' });

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    }
});

module.exports = { transporter };