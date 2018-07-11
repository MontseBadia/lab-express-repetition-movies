'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/users');
const Movie = require('../models/movie');

/* GET users listing. */
router.get('/', function (req, res, next) {
  const userData = req.session.currentUser;
  User.findById(userData._id)
    .then((user) => {
      let moviesTitles = [];
      user.favorites.forEach(element => {
        Movie.findById(element)
          .then((movie) => {
            moviesTitles.push(movie.title);
          })
          .catch(next);
      });
      res.render('profile', {user: user, moviesTitles: moviesTitles}); // how to put this inside forEach?
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
        return User.findByIdAndUpdate(userData._id, {$push: {favorites: favMovieId}})
          .then(() => {
          // req.session.currentUser = updatedUser; // Does this work?
            res.redirect(`/movies/${favMovieId}`); // without :
          });
      } else {
        return User.findByIdAndUpdate(userData._id, {$pull: {favorites: favMovieId}})
          .then(() => {
          // req.session.currentUser = updatedUser; // Does this work?
            res.redirect(`/movies/${favMovieId}`);
          });
      }
    });
});

module.exports = router;
