require("dotenv").config({ path: "../.env" });
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER_EMAIL,
    pass: SMTP_USER_PASS,
  },
});

module.exports = transport;
