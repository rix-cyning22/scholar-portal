const Department = require("../models/departments");
const PortalScholar = require("../models/scholarportal");

exports.changeSettings = (req, res) => {
  console.log("change");
};

exports.profile = async (req, res) => {
  const user = await PortalScholar.findOne({
    insttId: req.session.insttId,
  });
  const dept = await Department.findOne({ id: user.deptId }).select("name");
  console.log(dept);
  const profile = {
    userName: user.name,
    deptName: dept.name,
    gscholarId: user.gscholarId,
    vidwanId: user.vidwanId,
    orcidId: user.orcidId,
  };
  console.log(profile);
  return res.status(200).json(profile);
};
