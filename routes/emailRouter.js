const express = require("express");
const { sendEmail } = require("../middleware/middleware");
const router = express.Router();

router.post("/send-email", (req, res) => {
  try {
    const { email } = req.body;
    sendEmail(email);
    res.status(200).json({ success: true, message: "The email has been sent" });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
