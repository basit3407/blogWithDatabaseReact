require("dotenv").config();
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const helmet = require("helmet");

const facebookLogin = require("./Routes/api/facebookLogin");
const googleLogin = require("./Routes/api/googleLogin");
const user = require("./Routes/api/users");

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
    cookie: {
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")();

app.use("/api/auth/facebook", facebookLogin);
app.use("/api/auth/google", googleLogin);
app.use("/api/user", user);

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected"))
  .catch((e) => console.log(e));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
