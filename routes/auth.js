'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/users');

const bcrypt = require('bcrypt');
const bcryptSalt = 10;

router.get('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }
  const data = {
    messages: req.flash('signin-error')
  };
  res.render('auth/signup', data);
});

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }

  if (!username || !password) {
    req.flash('signin-error', 'Please provide a username and a password');
    res.redirect('/auth/signup');
    return;
  }

  User.findOne({ username })
    .then(user => {
      if (user !== null) {
        req.flash('signin-error', 'The username is already taken');
        res.redirect('/auth/signup');
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        password: hashPass
      });

      return newUser.save()
        .then(() => {
          req.session.currentUser = newUser;
          res.redirect('/');
        });
    })
    .catch(next);
});

router.get('/login', (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }
  const data = {
    messages: req.flash('login-error')
  };
  res.render('auth/login', data);
});

router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (req.session.currentUser) {
    res.redirect('/');
    return;
  }

  if (!username || !password) {
    req.flash('login-error', 'Please provide a username and a password');
    res.redirect('/auth/login');
    return;
  }

  User.findOne({ username })
    .then(user => {
      if (!user) {
        req.flash('login-error', 'Username or password are incorrect');
        res.redirect('/auth/login');
        return;
      }

      if (!bcrypt.compareSync(password, user.password)) {
        req.flash('login-error', 'Username or password are incorrect');
        res.redirect('/auth/login');
        return;
      }

      req.session.currentUser = user;
      res.redirect('/');
    })
    .catch(next);
});

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/auth/login');
});

module.exports = router;
