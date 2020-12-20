require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const helmet = require("helmet");

const facebookLogin = require("./Routes/facebookLogin");
const googleLogin = require("./Routes/googleLogin");
const login = require("./Routes/login");
const user = require("./Routes/User");
const register = require("./Routes/register");
const logout = require("./Routes/logout");

const port = 5000;

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "my little secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./passport")();

app.use("/auth/facebook", facebookLogin);
app.use("/auth/google", googleLogin);
app.use("/login", login);
app.use("/user", user);
app.use("/register", register);
app.use("/logout", logout);
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    const { name, username } = err.errors;

    if (name) error(name.message);
    if (username) error(username.message);
  } else
    err.name === "UserExistsError"
      ? res.status(409).json({ error: err.message })
      : next(err);

  function error(message) {
    res.status(400).json({ error: message });
  }
});

mongoose.connect(
  "mongodb+srv://basit3407:Kmha@3407@cluster0.rpbol.mongodb.net/blogdbDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("database connected");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
