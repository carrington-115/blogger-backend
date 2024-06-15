const express = require("express");
const {
  emailSendingController,
} = require("../controllers/emailServiceController");
const router = express.Router();

router.post("/send-email", emailSendingController);

module.exports = router;
