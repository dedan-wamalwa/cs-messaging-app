const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
const mongoose = require("mongoose");

const messageModel = mongoose.Schema(
    {
        customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        priority: { type: Number },
        category: { type: String, trim: true },
        description: { type: String, required: true, trim: true },
        isRead: { type: Boolean, default: false },
        assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        attachmentPath: { type: String, trim: true },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model("Message", messageModel);
module.exports = Message;
