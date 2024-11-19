const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Setup your Gmail account credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'praneeth.janjanam@gmail.com', // Use your Gmail address
    pass: 'Narayan@123'   // Use your Gmail password or app-specific password
  }
});

// Endpoint to handle form submission
app.post('/send-email', (req, res) => {
  const { name, email, phone, message } = req.body;

  // Email options
  const mailOptions = {
    from: email, // sender address
    to: 'praneeth.janjanam@gmail.com', // your Gmail address
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email', error });
    }
    res.status(200).json({ message: 'Email sent successfully', info });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

