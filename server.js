require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { client, connectDBConfig } = require("./config/dbConfig");
const passport = require("./config/passport");
const dbName = "users";
const port = process.env.PORT;
const authRouter = require("./routes/authRouter");
const emailRouter = require("./routes/emailRouter");
const cors = require("cors");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

// starting the connectino sequence to the database
connectDBConfig();

// passing all essential middleware to the root
app.use([
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser(),
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ client: client, dbName: dbName }),
    cookie: { secure: false },
  }),
  passport.initialize(),
  passport.session(),
]);

app.use("/auth", authRouter);
app.use("/", emailRouter);

app.listen(port, () => {
  try {
    console.log("The server is running on", port);
  } catch (error) {
    console.error(error);
  }
});
