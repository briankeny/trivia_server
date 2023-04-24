const Trivia = require("../models/trivia");
exports.createTrivia = async (req, res) => {
  if (req) {
    try {
      const trivia = await Trivia.createRandomTrivia();
      res.json(trivia);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  } else {
    res.status(501).json({ message: "Error occurred while fetching trivia" });
  }
};
