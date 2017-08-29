/**
 * Created by wangyanqi on 2017/8/11.
 */
var express = require('express');
var router = express.Router();

/* GET  */
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
  let data = {}
      data.text = '啥玩意'
  res.end(JSON.stringify(data));
});

module.exports = router;
