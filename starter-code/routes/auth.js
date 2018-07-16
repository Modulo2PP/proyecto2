const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


authRoutes.get("/login", ensureLoggedOut(),(req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

authRoutes.post("/login",ensureLoggedOut(), passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

authRoutes.get("/signup",ensureLoggedOut(), (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup",ensureLoggedOut(), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        req.user=newUser
        res.redirect("/");
      }
    });
  });
});

authRoutes.get("/logout",ensureLoggedIn(), (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRoutes;
