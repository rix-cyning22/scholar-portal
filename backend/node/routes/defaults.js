const express = require("express");
const router = express.Router();
const defaultController = require("../controllers/others");

router.post("/scholar/change-settings", defaultController.changeSettings);
router.post("/scholar/profile", defaultController.profile);

module.exports = router;
