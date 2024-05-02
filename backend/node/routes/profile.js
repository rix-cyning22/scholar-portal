const express = require("express");
const router = express.Router();
const defaultController = require("../controllers/profile");

router.post("/change-settings", defaultController.changeSettings);
router.post("/change-info", defaultController.changeParam);
router.post("/", defaultController.profile);

module.exports = router;
