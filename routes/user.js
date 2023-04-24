const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.loginUser);
router.post("/signup", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/profile_picture", userController.getProfilePic);

module.exports = router;
