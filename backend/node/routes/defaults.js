const express = require("express");
const router = express.Router();
const defaultController = require("../controllers/others");

const authenticated = (req, res, next) => {
    if (req.session && req.session.user)
        next();
    else
        res.redirect("/auth/login");
}

router.post("/scholar/change-settings", authenticated, defaultController.changeSettings);
router.post("/scholar/profile", authenticated, defaultController.profile);

module.exports = router;