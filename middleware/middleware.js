const transport = require("../config/emailVerificationConfig");

const autoAuthRedirectMiddleware = (req, res, next) => {
  const user = req.user;
  if (user) res.redirect("/auth/profile");
  next();
};

const sendEmail = (destEmail) => {
  try {
    const mailOptions = {
      from: "info.us.ecotech@gmail.com",
      to: destEmail,
      subject: "Hello test Subject",
      text: "Hello world message",
    };
    transport.sendMail(mailOptions, (error, info) => {
      if (error) console.error(error);
      else console.log("Email sent", info.response);
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { autoAuthRedirectMiddleware, sendEmail };
