const Dept = require("../models/departments");
const PortalScholar = require("../models/scholarportal");
const User = require("../models/user");
require("dotenv").config({ path: "../../../.env" });

exports.changeSettings = (req, res) => {
  console.log("change");
};

exports.profile = async (req, res) => {
  const scholarDetails = await PortalScholar.findOne({
    insttId: req.session.insttId,
  });
  const userDetails = await User.findOne({ insttId: scholarDetails.insttId });
  const dept = await Dept.findOne({ id: userDetails.deptId }).select("name");
  const profile = {
    userName: userDetails.name,
    deptName: dept.name,
    gscholarId: scholarDetails.gscholarId,
    vidwanId: scholarDetails.vidwanId,
    orcidId: scholarDetails.orcidId,
  };
  return res.status(200).json(profile);
};

exports.changeParam = async (req, res) => {
  try {
    const scholarData = await PortalScholar.findOne({
      insttId: req.session.insttId,
    });
    scholarData.set(req.body.name, req.body.newValue);
    await scholarData.save();
    return res.status(200).json(req.body.newValue);
  } catch (error) {
    return res.status(500).json(`${error}`);
  }
};
