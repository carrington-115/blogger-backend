require("dotenv").config({ path: "../.env" });
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "info.us.ecotech@gmail.com",
    pass: "SWIMS@Success23",
  },
});

module.exports = transport;
