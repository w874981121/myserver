/**
 * Created by wangyanqi on 2017/8/11.
 */

'use strict';
var express = require('express');
var router = express.Router();

/* GET */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  console.log('啥玩意，users')
});

module.exports = router;
