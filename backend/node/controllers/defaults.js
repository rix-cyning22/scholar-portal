const Dept = require("../models/departments");
const PortalScholar = require("../models/scholarportal");
const User = require("../models/user");

const fs = require("fs");
let fetch;
(async () => {
  const fetchModule = await import("node-fetch");
  fetch = fetchModule.default;
})();
const NodeCache = require("node-cache");
require("dotenv").config({ path: "../../../.env" });

const loadCacheFromFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      // File does not exist, create an empty cache file
      fs.writeFileSync(filePath, "{}");
      return {};
    } else {
      console.error("Error loading cache from file:", error);
      return {};
    }
  }
};

const cacheDataFromFile = loadCacheFromFile("cache.json");
const cache = new NodeCache({ stdTTL: 36000 });
cache.mset(cacheDataFromFile);

const saveCacheToFile = (cache, filePath) => {
  const dataToSave = JSON.stringify(cache.data);
  fs.writeFileSync(filePath, dataToSave);
};

process.on("exit", () => {
  saveCacheToFile(cache, "cache.json");
});

exports.getScholars = async (req, res) => {
  const scholars = await PortalScholar.find().select("insttId");
  const scholarsDept = await Promise.all(
    scholars.map(async (scholar) => {
      const userDetails = await User.findOne({ insttId: scholar.insttId });
      const dept = await Dept.findOne({ id: userDetails.deptId });
      return {
        insttId: scholar.insttId,
        scholarName: userDetails.name,
        scholarDept: dept ? dept.name : null,
      };
    })
  );
  return res.status(200).json(scholarsDept);
};

exports.getScholarIniDetails = async (req, res) => {
  try {
    const userData = await User.findOne({ insttId: req.body.insttId });
    const cacheData = cache.get(req.body.insttId);
    console.log(cache);
    if (cacheData) {
      console.log("data in cache");
      return res.status(200).json({
        name: userData.name,
        ...cacheData.gscholar,
        papers: cacheData.gscholar.papers.slice(0, 10),
        co_authors: cacheData.gscholar.co_authors.slice(0, 10),
      });
    }
    const flaskURL = `http://localhost:${process.env.FLASK_PORT}/getscholardetails/`;
    const scholarDetails = await PortalScholar.findOne({
      insttId: req.body.insttId,
    });
    const response = await fetch(flaskURL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        gscholarId: scholarDetails.gscholarId,
        irinsId: scholarDetails.vidwanId,
        orcidId: scholarDetails.orcidId,
      }),
    });
    const resData = await response.json();
    cache.set(req.body.insttId, resData);
    res.status(200).json({
      name: userData.name,
      ...resData.gscholar,
      papers: resData.gscholar.papers.slice(0, 10),
      co_authors: resData.gscholar.co_authors.slice(0, 10),
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getMorePapers = (req, res) => {};
