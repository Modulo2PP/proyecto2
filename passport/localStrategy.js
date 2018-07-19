const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/User');
const bcrypt        = require('bcrypt');

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username })
    .populate('albums')
    .then((foundUser) => {
    if (!foundUser) {
      next(null, false, { message: 'Incorrect password or username' });
      return;
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      next(null, false, { message: 'Incorrect password or username' });
      return;
    }

    next(null, foundUser);
})
.catch((err)=>{
  next(err)
})
  }));