'use strict';

const express = require('express');
const router = express.Router();

const Movie = require('../models/movie.js');
const User = require('../models/users.js');

router.get('/', (req, res, next) => {
  Movie.find()
    .then(allMovies => {
      res.render('movies', {allMovies: allMovies});
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/:id', (req, res, next) => {
  const movieId = req.params.id;

  Movie.findById(movieId)
    .then(movie => {
      const movieId = req.params.id;
      const user = req.session.currentUser;
      return User.findById(user)
        .then((user) => {
          const isFav = user.favorites.find(item => item.toString() === movieId);
          res.render('movie-details', {movie: movie, isFav: isFav});
          console.log(user._id);
        });
    })
    .catch(next);

  // req.session.currentUser.favorites.push(movieId);
});

module.exports = router;
