/**
 * Created by wangyanqi on 2017/8/11.
 */

'use strict';
import express from 'express'
const router = express.Router();

/* GET */
router.get('/user',(req, res, next) => {
  res.send('respond with a resource');
  console.log('啥玩意，users')
});

export default router;
