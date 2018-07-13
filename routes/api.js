'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/user/:username', (req, res, next) => { // no render, no redirect, only send data
  const data = {unique: true};
  res.json(data);
});

module.exports = router;
