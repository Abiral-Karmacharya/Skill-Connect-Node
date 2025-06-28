const router = require("express").Router();
const {
  createuser,
  mainpage,
  loginpage,
  getallusers,
  getuser,
} = require("../controller/UserController");
// const authguard = require("../middleware/authguard");
// const isadmin = require("../middleware/isadmin");

router.post("/signup", createuser); // route for signup
router.post("/login", loginpage); // route for login
router.get("/home", mainpage); // route for home page
router.post("/getallusers", getallusers); //route for getting all users
router.post("/getuser/:id", getuser);

module.exports = router;
