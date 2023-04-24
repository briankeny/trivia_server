const express = require("express");
const authenticate = require("../middleware/middleware");
const router = express.Router();
const triviaController = require("../controllers/triviaController");
router.post(
  "/trivia/random",
  authenticate.authenticate,
  triviaController.createTrivia
);
module.exports = router;
