const express = require("express");
const { registerUser, authUser, getUserDetails, getAgents } = require("../controllers/UserController");
const router = express.Router();

router.route("/").post(registerUser);
router.get("/:id", getUserDetails);
router.post("/login", authUser);

module.exports = router;
