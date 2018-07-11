'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  const userData = req.session.currentUser;
  res.render('profile', {userData: userData});
});

module.exports = router;
