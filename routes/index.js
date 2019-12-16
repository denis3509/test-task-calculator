const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');

router.get('/:string', indexController.calculateString);

module.exports = router;
