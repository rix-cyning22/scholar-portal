const express = require("express");
const router = express.Router();
const defaultController = require("../controllers/others");

router.post("/change-settings", defaultController.changeSettings);
router.post("/profile", defaultController.profile);

module.exports = router;
