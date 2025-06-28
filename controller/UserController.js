require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");
const Role = require("../model/rolemodel");
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
      res.status(400).json({ success: false, message: "Invalid role" });
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
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { Email: email } });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid credential" });
    }
    const token = jwt.sign(
      { id: user.UserID, email: user.Email, role: user.Role },
      process.env.JWT_TOKEN,
      { expiresIn: "24h" }
    );
    console.log(User.UserID);
    res.status(200).json({
      success: true,
      messsage: "Login successful",
      token,
      user: {
        id: user.UserID,
        username: user.Name,
        email: user.Email,
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
