require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");
const Role = require("../model/rolemodel");
const expert = require("../model/expertmodel");
// For signup
const createuser = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Please enter all fields" });
    }

    const foundRole = await Role.findOne({ where: { Role: role } });
    if (!foundRole) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const salt = await bcrypt.genSalt(10);
    const newpassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      Name: name,
      Email: email,
      Password: newpassword,
      RoleID: foundRole.RoleID,
    });
    return res.status(201).json({ success: "User created", users: newUser });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

//login page
const loginpage = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { Email: email } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credential" });
    }
    const token = jwt.sign(
      { id: user.UserID, email: user.Email, role: user.Role },
      process.env.JWT_TOKEN,
      { expiresIn: "24h" }
    );
    console.log(User.UserID);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.UserID,
        username: user.Name,
        email: user.Email,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

//get users
const getallusers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json({ success: true, users: users });
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

const getuser1 = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    res.json({ success: true, user: user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getuser = async (req, res) => {
  try {
    // The authenticateToken middleware should decode the JWT and add user info to req.user
    const userId = req.user.id; // or req.user._id depending on your user model

    // Fetch only the current user's data
    const user_select = await User.findByPk(userId); // Exclude password
    if (!user_select) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user_select);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const getexpert = async (req, res) => {
  try {
    const experts = await User.findAll({
      where: {
        RoleID: 3,
      },
    });
    return res.json(experts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Home page
const mainpage = (req, res) => {
  res.send("This is the main page");
};

module.exports = {
  createuser,
  mainpage,
  loginpage,
  getallusers,
  getuser,
  getexpert,
};
