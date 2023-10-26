const asyncHandler = require("express-async-handler");
const Message = require("../models/MessageModel");
const User = require("../models/UserModel");
//GET /api/messages?search=
const getMessages = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
              $or: [{ description: { $regex: req.query.search, $options: "i" } }],
          }
        : {};
    try {
        const messages = await Message.find(keyword)
            .find({ isRead: false, isCustomerMessage: true })
            .populate("sender", "-password")
            .populate("customer", "-password");
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error("Server Error");
    }
});

//GET /api/messages/:id
const getMessageDetails = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.findOne({ _id: id });
        if (message) {
            res.json(message);
        } else {
            return res.status(404).json({ error: "Message not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error("Server Error");
    }
});
//GET  /api/messages/customer/id
const getCustomerMessages = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const messages = await Message.find({ customer: user._id }).populate("sender", "-password").sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error("Server Error");
    }
});

// POST /api/messages/
const postMessage = asyncHandler(async (req, res) => {
    const { customer, description, sender, attachmentPath, isCustomerMessage } = req.body;
    if (!description) {
        res.status(400);
        throw new Error("Bad request");
    }
    try {
        if (customer === sender) {
            const _customer = await User.findOne({ _id: customer });
            if (!_customer) {
                return res.status(404).json({ error: "Customer not found" });
            }
        } else {
            const idValues = [customer, sender];
            const users = await User.find({ _id: { $in: idValues } });
            if (users.length < 2) {
                return res.status(404).json({ error: "User not found" });
            }
        }
        const message = new Message(req.body);
        const messageSent = await message.save();
        const _message = await Message.findOne({ _id: messageSent._id }).populate("sender", "-password");
        res.json(_message);
    } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error(`Error: ${error.message}`);
    }
});

// PATCH /api/messages/:id/assign
const assignMessage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { assignee } = req.body;
    if (!assignee) {
        return res.status(400).json({ error: "Provide full details" });
    }
    try {
        const message = await Message.findOne({ _id: id });
        const user = await User.findOne({ _id: assignee });

        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }
        if (!message.assignee) {
            message.assignee = assignee;
        }
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const updatedMessage = await message.save();
        res.json(updatedMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

//GET /api/messages/agent/id
const getAssignedMessages = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const messages = await Message.find({ assignee: id });
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error("Server Error");
    }
});

// GET /api/messages/check-status/:id
const checkIfMessageIsRead = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }
        if (message.isRead) {
            return res.json({ wasRead: message.isRead });
        } else {
            message.isRead = true;
            _ = await message.save();
            return res.json({ wasRead: false });
        }
    } catch (error) {
        console.error(error);
        throw new Error(`Error: ${error.message}`);
    }
});
module.exports = {
    getMessageDetails,
    getMessages,
    getCustomerMessages,
    postMessage,
    assignMessage,
    getAssignedMessages,
    checkIfMessageIsRead,
};
