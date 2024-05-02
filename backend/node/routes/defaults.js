const express = require("express");
const router = express.Router();
const defaultController = require("../controllers/defaults");

router.get("/all-scholars", defaultController.getScholars);
router.post("/scholar-info", defaultController.getScholarIniDetails);

module.exports = router;
