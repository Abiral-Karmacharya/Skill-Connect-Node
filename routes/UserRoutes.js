const router = require("express").Router();
const {
  createuser,
  mainpage,
  loginpage,
  getallusers,
  getuser,
} = require("../controller/UserController");
const authguard = require("../middleware/authGuard");
const isadmin = require("../middleware/isAdmin");

router.post("/signup", createuser); // route for signup
router.post("/login", loginpage); // route for login
router.get("/home", mainpage); // route for home page
router.post("/getallusers", getallusers); //route for getting all users
router.post("/getuser/:id", getuser); //route for getting id of one user

module.exports = router;
