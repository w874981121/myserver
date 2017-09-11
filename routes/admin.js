/*
 * Created by wangyanqi on 2017/8/11.
 */

'use strict';
import express from 'express'

import User from '../controller/admin/user'
import Jurisdiction from '../controller/admin/jurisdiction'

const router = express.Router();

/* GET */
//注册
router.get('/user', User.userNnameV);
router.get('/user', User.register);
//登录
router.get('/login', User.login);

//权限列表添加
router.get('/addjurisdiction', Jurisdiction.add);
//返回所有权限列表数据
router.get('/returnlist', Jurisdiction.returnList);



export default router;
