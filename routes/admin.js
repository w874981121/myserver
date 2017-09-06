/**
 * Created by wangyanqi on 2017/8/11.
 */

'use strict';
import express from 'express'
const router = express.Router();
import user from '../models/admin/user'

/* GET */
router.get('/user',(req, res, next) => {
  let users = new user({
    user_name: 'wangyq',
    password: 11428020,
    phone: 13592046894,
    state: true,
    status: 0,
    role_name: '超级管理员',
    role_id: ''
  })
  users.save((err, red)=> {
    console.log(err, "err")
    console.log(red, "red")
    res.send('走到了这里');
  })

});

export default router;
