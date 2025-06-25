const router = require("express").Router();
const {
  createuser,
  mainpage,
  loginpage,
  getallusers,
} = require("../controller/UserController");

router.post("/signup", createuser); // route for signup
router.post("/login", loginpage); // route for login
router.get("/home", mainpage); // route for home page
router.get("/getallusers", getallusers); //route for getting all users

module.exports = router;
