const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
require('dotenv').config();
const app = express()

app.use(cors());
app.use(bodyParser.json())
app.post('/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail', // Use 'gmail' or SMTP settings
            auth: {
                user: process.env.EMAIL, 
                pass: process.env.PASSWORD
            }
        });

        let mailOptions = {
            from: email,
            to: process.env.EMAIL,
            subject: subject,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email', error });
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});