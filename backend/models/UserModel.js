const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const bcrypt = require("bcryptjs");
dayjs.extend(utc);

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, trim: true },
        messages: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Message",
            },
        ],
        loanLimit: { type: Number, default: 500 },
        availableLimit: { type: Number, default: 500 },
        employmentStatus: { type: String, trim: true },
        profilePhotoPath: {
            type: String,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        phone: { type: String, required: true, trim: true },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.matchPassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);

module.exports = User;
