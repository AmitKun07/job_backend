const express = require("express");
const router = express.Router();
const verifyToken = require("../middlesware/auth");
const {
  registerUser,
  getUsers,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");
const requireRole = require("../middlesware/role");

// for registrtaion
router.post("/register", registerUser);

// for get all Users
router.get("/getUsers", verifyToken, requireRole("admin"), getUsers);

// For login
router.post("/login", loginUser);

// For profile
router.get("/profile", verifyToken, getUserProfile);

module.exports = router;
