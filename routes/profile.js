'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  const userData = req.session.currentUser;
  User.findById(userData._id)
    .then((user) => {
      res.render('profile', {user: user});
    })
    .catch(next);
  // console.log(userData);
});

router.post('/favorites', (req, res, next) => {
  const favMovieId = req.body.favMovieId;
  const userData = req.session.currentUser;
  User.findById(userData._id)
    .then((user) => {
      const isFav = user.favorites.find(item => item.toString() === favMovieId);
      // console.log(isFav);
      if (!isFav) {
        User.findByIdAndUpdate(userData._id, {$push: {favorites: favMovieId}})
          .then((updatedUser) => {
          // req.session.currentUser = updatedUser; // Does this work?
          // console.log('isFav in is not present :' + updatedUser);
            res.redirect(`/movies/${favMovieId}`); // without :
          })
          .catch(next);
      } else {
        User.findByIdAndUpdate(userData._id, {$pull: {favorites: favMovieId}})
          .then((updatedUser) => {
          // req.session.currentUser = updatedUser; // Does this work?
          // console.log('isFav in is present :' + updatedUser);
            res.redirect(`/movies/${favMovieId}`);
          })
          .catch(next);
      }
    });
});

module.exports = router;
