const Scholar = require("../models/scholarportal");
const Department = require("../models/departments");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.isLoggedIn = (req, res) => {
  if (req.session && req.session.insttId) res.json(true);
  else res.json(false);
};

exports.signUp = async (req, res) => {
  try {
    const user = await User.findOne({ insttId: req.body.userId });
    if (!user) throw new Error("no such user present");
    const dept = await Department.findOne({ id: user.deptId });
    if (!dept) return res.status(401).json({ message: "no such department" });
    const registeredScholar = await Scholar.findOne({
      insttId: req.body.userId,
    });
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    if (registeredScholar)
      throw new Error("scholar with this ID already present");
    const newScholar = new Scholar({
      insttId: req.body.userId,
      password: hashedPassword,
      gscholarId: req.body.gscholar,
      vidwanId: req.body.irins,
      orcidId: req.body.orcid,
    });
    await newScholar.save();
    return res.json({ message: "success" });
  } catch (error) {
    return res.status(402).json({ message: `${error}` });
  }
};

exports.logIn = async (req, res) => {
  try {
    const user = await User.findOne({ insttId: req.body.userId });
    const regScholar = await Scholar.findOne({ insttId: req.body.userId });
    if (!user || !regScholar) throw new Error();
    const match = await bcrypt.compare(req.body.password, regScholar.password);
    if (!match) throw new Error();
    req.session.insttId = user.insttId;
    return res.status(200).json({ message: "successful login" });
  } catch (error) {
    return res.status(401).json({ message: "user or password invalid" });
  }
};

exports.logOut = (req, res) => {
  req.session.destroy();
  return res.status(200).json({ message: "logout successful" });
};
