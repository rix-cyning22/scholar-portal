const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoSessionConnect = require("connect-mongodb-session")(session);
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const scholarRoutes = require("./routes/defaults");

require("dotenv").config({ path: "../.env" });
const cors = require("cors");
const bodyParser = require("body-parser");

const mongoUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGODB_NAME}.nsgc3aw.mongodb.net/`;
const sessionStore = new MongoSessionConnect({
  uri: mongoUri,
  collection: "user-sessions",
});
const app = express();
app.use(bodyParser.json());
console.log(process.env);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
  })
);

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/scholar", scholarRoutes);

app.use((req, res) => {
  var loggedIn = null;
  if (req.session && req.session.user) loggedIn = true;
  res.status(404).json({ loggedIn: loggedIn });
});

mongoose
  .connect(mongoUri)
  .then((result) => {
    app.listen(process.env.NODE_PORT);
    console.log("database connected!!");
  })
  .catch((err) => console.log(err));
