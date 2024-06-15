const express = require("express");
const {
  emailSendingController,
  sendEmailWithMailjet,
} = require("../controllers/emailServiceController");
const router = express.Router();

router.post("/send-email", emailSendingController);
router.post("/send-mailjet", sendEmailWithMailjet);

module.exports = router;
