require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();

const port = process.env.PORT;

app.listen(port, () => {
  try {
    console.log("The server is running on", port);
  } catch (error) {
    console.error(error);
  }
});
