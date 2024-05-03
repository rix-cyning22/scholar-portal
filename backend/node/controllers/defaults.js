const Dept = require("../models/departments");
const PortalScholar = require("../models/scholarportal");
const User = require("../models/user");
let fetch;
(async () => {
  const fetchModule = await import("node-fetch");
  fetch = fetchModule.default;
})();
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 36000 });
require("dotenv").config({ path: "../../../.env" });

exports.getScholars = async (req, res) => {
  try {
    const users = req.body.deptId
      ? await User.find({ deptId: req.body.deptId })
      : await User.find();
    const insttIds = users.map((user) => user.insttId);
    const scholarsInDept = await PortalScholar.find({
      insttId: { $in: insttIds },
    }).lean();
    const scholars = await Promise.all(
      scholarsInDept.map(async (scholar) => {
        const user = await User.findOne({
          insttId: scholar.insttId,
        }).select(["name", "deptId"]);
        const dept = await Dept.findOne({ id: user.deptId }).select("name");
        return {
          name: user.name,
          gscholarId: scholar.gscholarId,
          dept: dept.name,
          insttId: scholar.insttId,
        };
      })
    );

    return res.json(scholars);
  } catch (error) {
    return res.status(500).json("error: " + error);
  }
};

exports.getScholarIniDetails = async (req, res) => {
  try {
    const userData = await User.findOne({ insttId: req.body.insttId });
    const cacheData = cache.get(req.body.insttId);
    const scholarDetails = await PortalScholar.findOne({
      insttId: req.body.insttId,
    });
    if (cacheData) {
      console.log("data in cache");
      return res.status(200).json({
        name: userData.name,
        vidwanId: scholarDetails.vidwanId,
        gscholarId: scholarDetails.gscholarId,
        orcidId: scholarDetails.orcidId,
        ...cacheData,
        papers: cacheData.papers ? cacheData.papers.slice(0, 10) : null,
        papersCount: cacheData.papers ? cacheData.papers.length : 0,
        co_authors: cacheData.co_authors
          ? cacheData.co_authors.slice(0, 8)
          : null,
        co_authorsCount: cacheData.co_authors ? cacheData.co_authors.length : 0,
      });
    }
    const flaskURL = `http://localhost:${process.env.FLASK_PORT}/getscholardetails/`;
    const response = await fetch(flaskURL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ gscholarId: scholarDetails.gscholarId }),
    });
    const resData = await response.json();
    cache.set(req.body.insttId, resData);
    res.json({
      name: userData.name,
      vidwanId: scholarDetails.vidwanId,
      gscholarId: scholarDetails.gscholarId,
      orcidId: scholarDetails.orcidId,
      ...resData,
      papers: resData.papers ? resData.papers.slice(0, 10) : null,
      papersCount: resData.papers ? resData.papers.length : null,
      co_authors: resData.co_authors ? resData.co_authors.slice(0, 8) : null,
      co_authorsCount: resData.co_authors ? resData.co_authors.length : null,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getMorePapers = async (req, res) => {
  try {
    const cacheData = cache.get(req.body.insttId);
    if (cacheData) {
      console.log("paper data in cache");
      return res.json(cacheData.papers.slice(req.body.start, req.body.end));
    }
    const flaskURL = `http://localhost:${process.env.FLASK_PORT}/getscholardetails/`;
    const response = await fetch(flaskURL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ gscholarId: req.body.gscholarId }),
    });
    const resData = await response.json();
    cache.set(req.body.insttId, resData);
    return res.json(resData.papers.slice(req.body.start, req.body.end));
  } catch (error) {
    console.log(error);
  }
};

exports.getMoreCoAuthors = async (req, res) => {
  try {
    const cacheData = cache.get(req.body.insttId);
    if (cacheData) {
      console.log("coauthor data in cache");
      return res.json(cacheData.co_authors.slice(req.body.start, req.body.end));
    }
    const flaskURL = `http://localhost:${process.env.FLASK_PORT}/getscholardetails/`;
    const response = await fetch(flaskURL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ gscholarId: req.body.gscholarId }),
    });
    const resData = await response.json();
    return res, json(resData.papers.slice(req.body.start, req.body.end));
  } catch (error) {
    console.log(error);
  }
};

exports.getDepts = async (req, res) => {
  const depts = await Dept.find();
  return res.json(depts);
};
