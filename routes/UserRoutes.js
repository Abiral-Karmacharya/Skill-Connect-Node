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
  getexpert,
  getlogs,
  service,
  acceptService,
  declineService,
  completeService,
  submitReview,
  getReviews,
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
router.get("/getexpert/:id", getexpert);
router.post("/service", authguard, service);
router.get("/getlogs", authguard, getlogs);
router.put("/acceptservice/:serviceId", authguard, acceptService);
router.put("/declineservice/:serviceId", authguard, declineService);
router.put("/completeservice/:serviceId", authguard, completeService);
router.post("/submitreview", authguard, submitReview);
router.get("/getreviews/:serviceId", authguard, getReviews);
// // Expert actions
// router.put("/service/:serviceId/accept", authguard, acceptService);
// router.put("/service/:serviceId/decline", authguard, declineService);

// // Client actions
// router.put("/service/:serviceId/cancel", authguard, cancelService);
module.exports = router;
