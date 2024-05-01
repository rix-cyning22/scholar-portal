const Dept = require("../models/departments");
const PortalScholar = require("../models/scholarportal");
const User = require("../models/user");

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

exports.getScholars = async (req, res) => {
  const scholars = await PortalScholar.find().select("insttId");
  const scholarsDept = await Promise.all(
    scholars.map(async (scholar) => {
      const userDetails = await User.findOne({ insttId: scholar.insttId });
      const dept = await Dept.findOne({ id: userDetails.deptId });
      return {
        scholarName: userDetails.name,
        scholarDept: dept ? dept.name : null,
      };
    })
  );
  return res.status(200).json(scholarsDept);
};

exports.changeParam = async (req, res) => {
  const scholarData = await PortalScholar.findOne({
    insttId: req.session.insttId,
  });
  scholarData[req.body.name] = req.body.newValue;
  const newData = await scholarData.save();
  console.log(newData);
  return res.status(200).json(req.body);
};
