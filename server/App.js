require("dotenv").config();
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import findOrCreate from "mongoose-findorcreate";
import cors from "cors";
import helmet from "hemlet";
import facebookLogin from "./Routes/facebookLogin";
import googleLogin from "./Routes/googleLogin";
import login from "./Routes/login";
import user from "./Routes/User";
import register from "./Routes/register";

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const port = 5000;

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/public", express.static("public"));

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth/facebook", facebookLogin);
app.use("/auth/google", googleLogin);
app.use("/login", login);
app.use("/user", user);
app.use("/register", register);

// eslint-disable-next-line no-unused-vars

mongoose.connect(
  "mongodb+srv://basit3407:Kmha@3407@cluster0.rpbol.mongodb.net/blogdbDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

const postSchema = {
  title: String,
  content: String,
};

const userSchema = {
  name: {
    type: String,
    required: [true, "Please enter your last name."],
  },
  email: {
    type: String,
    // eslint-disable-next-line no-useless-escape
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Invalid email format"],
    required: [true, "Please enter your email."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password."],
  },
  googleId: String,
  facebookId: String,
  secret: String,
  posts: [postSchema],
};

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

passport.use(User.createStrategy());

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/DailyJournal",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: "http://localhost:5000/auth/facebook/DailyJournal",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        {
          facebookId: profile.id,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

const User = mongoose.model("User", userSchema);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("database connected");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default User;
export { app, passport };
