const User = require("../models/user");

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByCredentials(username, password);
    const id = user.id;
    const token = await User.generateAuthToken(id);
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  const { name, username, password, email } = req.body;
  try {
    const user = await User.createUser(name, username, password, email);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getAllUsers = async (req, res) => {
  if (req) {
    try {
      const users = await User.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

exports.getProfilePic = async (req, res) => {
  const { id } = req.body;
  try {
    const results = User.findProfilePic(id);
    const profilePicture = results[0].profile_picture;
    res.setHeader("Content-Type", "image/png"); // or the appropriate MIME type for your image
    res.send(profilePicture);
  } catch (error) {
    res.status(404).send({ message: "Profile pic not found" });
  }

  const profilePicture = results[0].profile_picture;
  res.setHeader("Content-Type", "image/png"); // or the appropriate MIME type for your image
  res.send(profilePicture);
};
