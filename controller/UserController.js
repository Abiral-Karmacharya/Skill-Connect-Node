const User = require("../model/usermodel");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// For signup
const createuser = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Please enter all fields" });
    }
    const salt = await bcrypt.genSalt(10);
    const newpassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name: name,
      email: email,
      password: newpassword,
      role: role,
    });
    return res.status(201).json({ success: "User created", users: newUser });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

//login page
const loginpage = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid credential" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_TOKEN,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      success: true,
      messsage: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error });
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

const getuser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    res.json({ success: true, user: user });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//Home page
const mainpage = (req, res) => {
  res.send("This is the main page");
};

module.exports = { createuser, mainpage, loginpage, getallusers, getuser };
