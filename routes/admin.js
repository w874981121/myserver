/*
 * Created by wangyanqi on 2017/8/11.
 */

'use strict';
import express from 'express'

import User from '../controller/admin/user'
import Role from '../controller/admin/role'

const router = express.Router();

/* GET */
//注册
router.get('/user', User.userNnameV);
router.get('/user', User.register);
//登录
router.get('/login', User.login);

// router.get('/jurisdictionr', admin.jurisdictionr);

export default router;
