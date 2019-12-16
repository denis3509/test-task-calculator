const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');

router.get('/calc/:string', indexController.calculateString);
router.get('/',(req,res,next)=>{
  res.send({message: 'hello'});
})
module.exports = router;
