const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const gameRoutes = require("./routes/game");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/", userRoutes);
app.use("/", gameRoutes);

// Start server
const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
