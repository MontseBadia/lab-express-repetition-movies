'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  const userData = req.session.currentUser;
  res.render('profile', {userData: userData});
});

router.post('/favorites', (req, res, next) => {
  const favMovieId = req.body.favMovieId;
  const userId = req.session.currentUser._id;
  User.findByIdAndUpdate({_id: userId}, {$push: {favorites: favMovieId}})
    .then(() => {
      res.redirect('/movies');
    })
    .catch(next);
});

module.exports = router;
