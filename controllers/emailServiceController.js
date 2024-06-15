require("dotenv").config({ path: "../.env" });
const { default: Mailjet } = require("node-mailjet");
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

const sendEmailWithMailjet = async (req, res) => {
  try {
    const { receiverEmail, receiverName } = req.body;
    const mailjet = Mailjet.apiConnect(
      process.env.MAILJET_API_KEY,
      process.env.MAILJET_SECRET_KEY
    );
    const sendResponse = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: "frumarkcarrington@gmail.com",
              name: "Fru Mark Carrington Chei",
            },
            To: [
              {
                Email: receiverEmail,
                Name: receiverName,
              },
            ],
            Subject: "Greetings",
            TextPart: "I am Mark. Nice to know you. Did the test work",
          },
        ],
      });
    console.log(sendResponse.body);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { emailSendingController, sendEmailWithMailjet };
