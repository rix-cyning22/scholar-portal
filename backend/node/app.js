const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoSessionConnect = require("connect-mongodb-session")(session);
const authRoutes = require("./routes/auth");
const defaultRoutes = require("./routes/defaults");
require("dotenv").config({ path: "../.env" });
const cors = require("cors");

const mongoUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGODB_NAME}.nsgc3aw.mongodb.net/`;
const sessionStore = new MongoSessionConnect({
  uri: mongoUri,
  collection: "user-sessions",
});
const app = express();
app.use(cors());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.use("/auth", authRoutes);
app.use("/", defaultRoutes);

app.use((req, res) => {
  var loggedIn = null;
  if (req.session && req.session.user) loggedIn = true;
  res.status(404).json({ loggedIn: loggedIn });
});

mongoose
  .connect(mongoUri)
  .then((result) => {
    app.listen(process.env.NODE_PORT);
    console.log("database conected!!");
  })
  .catch((err) => console.log(err));
