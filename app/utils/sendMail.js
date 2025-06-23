const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendMail(to, subject, html) {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
    };

    let info = false;
    try {
        info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
    } catch (err) {
        console.error('Email failed:', err);
        throw err;
    }
    return info
}

module.exports = sendMail;

