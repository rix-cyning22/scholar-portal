const express = require("express");
const router = express.Router();
const defaultController = require("../controllers/defaults");

router.get("/all-scholars", defaultController.getScholars);
router.post("/scholar-info", defaultController.getScholarIniDetails);
router.post("/more-papers", defaultController.getMorePapers);
router.post("/more-coauthors", defaultController.getMoreCoAuthors);

module.exports = router;
