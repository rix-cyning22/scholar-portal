const express = require("express");
const router = express.Router();
const defaultController = require("../controllers/defaults");

router.post("/scholars", defaultController.getScholars);
router.post("/scholar-info", defaultController.getScholarIniDetails);
router.post("/more-papers", defaultController.getMorePapers);
router.post("/more-coauthors", defaultController.getMoreCoAuthors);
router.get("/depts", defaultController.getDepts);

module.exports = router;
