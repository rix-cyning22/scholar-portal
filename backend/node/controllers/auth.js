const Scholar = require("../models/scholarportal");
const Department = require("../models/departments");
const User = require("../models/user");

exports.isLoggedIn = (req, res) => {
  if (req.session) res.json(true);
  else res.json(false);
};

exports.signUp = async (req, res) => {
  const user = await User.findOne({ insttId: req.body.userId });
  const dept = await Department.findOne({ id: user.deptId });
  if (!dept) return res.status(401).json({ message: "no such department" });
  const newScholar = new Scholar({
    name: user.name,
    insttId: req.body.userId,
    deptName: dept.name,
    password: req.body.password,
    gscholarId: req.body.gscholar,
    vidwanId: req.body.irins,
    orcidId: req.body.orcid,
  });
  try {
    const savedData = await newScholar.save();
    req.session.insttId = savedData.insttId;
    return res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error saving data" });
  }
};

exports.logIn = async (req, res) => {
  try {
    const user = await User.findOne({ insttId: req.body.userId });
    if (!user) throw new Error("invalid error");
    req.session.insttId = user.insttId;
    return res.status(200).json({ message: "successful login" });
  } catch (error) {
    res.json(401).json({ message: "user or password invalid" });
  }
};

exports.logOut = (req, res) => {
  console.log("log out");
};
