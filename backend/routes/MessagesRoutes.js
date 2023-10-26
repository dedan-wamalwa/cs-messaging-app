const express = require("express");
const {
    getMessageDetails,
    getMessages,
    getCustomerMessages,
    postMessage,
    assignMessage,
    getAssignedMessages,
    checkIfMessageIsRead,
} = require("../controllers/MessagesController");

const router = express.Router();

router.route("/").get(getMessages).post(postMessage);
router.get("/customer/:id", getCustomerMessages);
router.get("/:id", getMessageDetails);
router.get("/agent/:id", getAssignedMessages);
router.patch("/:id/assign", assignMessage);
router.get("/check-status/:id", checkIfMessageIsRead);
module.exports = router;
