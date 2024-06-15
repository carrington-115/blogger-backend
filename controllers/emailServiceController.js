const { sendEmail } = require("../middleware/middleware");

const emailSendingController = (req, res) => {
  try {
    const { email } = req.body;
    sendEmail(email);
    return res
      .status(200)
      .json({ success: true, message: "The email has been sent" });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { emailSendingController };
