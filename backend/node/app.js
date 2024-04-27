const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoSessionConnect = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const authRoutes = require("./routes/auth");
const defaultRoutes = require("./routes/defaults");
require("dotenv").config();

const mongoUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGODB_NAME}.nsgc3aw.mongodb.net/`
const sessionStore = new MongoSessionConnect({
    uri: mongoUri,
    collection: "user-sessions"
});
const app = express();
app.use(flash());

app.use(session({
    secret: process.env.secretKey,
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));

app.use("/auth", authRoutes);
app.use("/", defaultRoutes);

app.use((req, res) => {
    var loggedIn = null;
    if (req.session && req.session.user)
        loggedIn = true;
    res.status(404).json({loggedIn: loggedIn})
})

mongoose.connect(mongoUri)
    .then(result => {
        app.listen(process.env.NODE_PORT);
        console.log("database conected!!");
    })
    .catch(err => console.log(err));
