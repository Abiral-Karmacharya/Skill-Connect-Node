const router = require("express").Router();
const {
  createuser,
  mainpage,
  loginpage,
  getallusers,
  getuser,
  updateuser,
  deleteuser,
  getexperts,
} = require("../controller/UserController");
const authguard = require("../middleware/authGuard");
const isadmin = require("../middleware/isAdmin");

router.post("/signup", createuser); // route for signup
router.post("/login", loginpage); // route for login
router.get("/home", mainpage); // route for home page
router.post("/getallusers", getallusers); //route for getting all users
router.get("/getuser", authguard, getuser); //route for getting id of one user
router.put("/updateuser", authguard, updateuser); // route for updating user
router.delete("/deleteuser", authguard, deleteuser); // route for deleting user
router.get("/getexperts", getexperts);
module.exports = router;
