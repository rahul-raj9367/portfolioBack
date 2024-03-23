const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://Rahulraj:Rahulraj-2002@cluster0.dh2u9rs.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

const FormModel = mongoose.model('PortfolioForm', new mongoose.Schema({
  name: String,
  email: String,
  mobileNumber: String,
  message: String,
}));

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.post('/submit-form', async (req, res) => {
  const formData = req.body;

  try {
    const form = await FormModel.create(formData);
    console.log('Form data saved to MongoDB:', form);

    sendEmail(formData);

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Error submitting form' });
  }
});

async function sendEmail(formData) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rahulselvan0810@gmail.com',
        pass: 'mgga hlxv lkdj yyxa',
      },
    });

    const mailOptions = {
      from: 'rahulselvan0810@gmail.com',
      to: 'rahulrahulrahul7890@gmail.com',
      subject: 'Portfolio Form Submission',
      text: `Name: ${formData.name}\nEmail: ${formData.email}\nMobile Number: ${formData.mobileNumber}\nMessage: ${formData.message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

app.listen(3002, () => {
  console.log('Server is running at http://localhost:3002');
});
