const nodemailer = require("nodemailer");
console.log(process.env.MAILTRAP_HOST);
console.log(process.env.MAILTRAP_PORT);
console.log(process.env.MAILTRAP_USER);
console.log(process.env.MAILTRAP_PASS);

const transporter =
  nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

module.exports = transporter;