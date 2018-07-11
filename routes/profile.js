'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  const userData = req.session.currentUser;

  console.log(userData);

  res.render('profile', {userData: userData});
});

router.post('/favorites', (req, res, next) => {
  const favMovieId = req.body.favMovieId;
  const user = req.session.currentUser;
  const userId = req.session.currentUser._id;

  const isFav = user.favorites.find(item => item.toString() === favMovieId);

  if (!isFav) {
    User.findByIdAndUpdate(userId, {$push: {favorites: favMovieId}})
      .then((updatedUser) => {
        req.session.currentUser = updatedUser;
        res.redirect(`/movies/${favMovieId}`); // without :
      })
      .catch(next);
  } else {
    User.findByIdAndUpdate(userId, {$pull: {favorites: favMovieId}})
      .then(() => {
        res.redirect(`/movies/${favMovieId}`);
      })
      .catch(next);
  }
});

module.exports = router;
