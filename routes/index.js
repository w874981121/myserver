/**
 * Created by wangyanqi on 2017/8/11.
 */

'use strict';
var express = require('express');
var router = express.Router();

/* GET  */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
  let data = {}
      data.text = '啥玩意'
  res.send(JSON.stringify(data));
});

module.exports = router;
