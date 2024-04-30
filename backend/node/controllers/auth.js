const Scholar = require("../model/scholar");

exports.isLoggedIn = (req, res, next) => {
  if (req.session && req.session.user) res.json(true);
  else res.json(false);
};

exports.signUp = (req, res) => {
  console.log("signup");
};

exports.logIn = (req, res) => {
  console.log("log in");
};

exports.logOut = (req, res) => {
  console.log("log out");
};
