const express = require("express");
const router = express.Router();
const defaultController = require("../controllers/others");

router.post("/change-settings", defaultController.changeSettings);
router.post("/profile", defaultController.profile);
router.get("/all-scholars", defaultController.getScholars);
router.post("/change-info", defaultController.changeParam);

module.exports = router;
