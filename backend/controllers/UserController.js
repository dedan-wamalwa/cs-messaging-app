const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, profilePhotoPath, employmentStatus, phone, role } = req.body;
    if (!name || !email || !password || !employmentStatus || !phone) {
        res.status(400);
        throw new Error("Please provide all fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(409);
        throw new Error("Email already exists!");
    }
    const user = await User.create({
        name,
        email,
        password,
        profilePhotoPath,
        employmentStatus,
        phone,
        role,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePhotoPath: user.profilePhotoPath,
            employmentStatus: user.employmentStatus,
            phone: user.phone,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        throw new Error("Error!Unable to create user");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePhotoPath: user.profilePhotoPath,
            employmentStatus: user.employmentStatus,
            phone: user.phone,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

module.exports = { registerUser, authUser };
