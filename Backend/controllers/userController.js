const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModels");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ msg: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashpassword,
      role,
    });

    return res.status(200).json({ msg: "User created", user });
  } catch (err) {
    console.log(err );
    return res.status(500).json({ msg: "Internal server error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }
    return res.status(200).json({ msg: "Users found", users });
  } catch (err) {
    return res.status(500).json({ msg: "Server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const isMatchedPassword = await bcrypt.compare(password, user.password);
    if (!isMatchedPassword) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.SECRETE_KEY
    );

    return res.status(200).json({ msg: "Login successful", user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User profile fetched", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};
