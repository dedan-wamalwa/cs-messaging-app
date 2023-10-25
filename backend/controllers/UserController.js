const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const generateToken = require("../config/generateToken");

// POST /api/users
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, profilePhotoPath, employmentStatus, phone, role } = req.body;
    if (!name || !email || !password || !employmentStatus || !phone) {
        res.status(400);
        throw new Error("Please provide all fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        console.error(error);
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
            createdAt: user.createdAt,
            token: generateToken(user._id),
        });
    } else {
        res.status(500);
        console.error(error);
        throw new Error("Error!Unable to create user");
    }
});

// POST /api/users/login
const authUser = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body;

    const user = await User.findOne({ email, role });
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
        console.error(error);
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

// GET /api/users/id
const getUserDetails = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id }).populate("messages");
        console.log(`User: ${user}`);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            messages: user.messages,
            phone: user.phone,
            createdAt: user.createdAt,
            employmentStatus: user.employmentStatus,
            loanLimit: user.loanLimit,
            availableLimit: user.availableLimit,
            profilePhotoPath:user.profilePhotoPath
        });
    } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error("Server Error");
    }
});

module.exports = { registerUser, authUser, getUserDetails };
