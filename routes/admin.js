/*
 * Created by wangyanqi on 2017/8/11.
 */

'use strict';
import express from 'express'

import User from '../controller/admin/user'
import Jurisdiction from '../controller/admin/jurisdiction'
import Role from '../controller/admin/role'

const router = express.Router();

/* GET */
//注册
router.get('/user', User.userNnameV);  //注册不传入密码为验证账户是否存在
router.get('/user', User.register);    //注册传入密码为提交
router.get('/login', User.login);      //登录
router.get('/returnuser', User.returnUser);//返回所有用户信息
//============
router.get('/addjurisdiction', Jurisdiction.add);//添加权限
router.get('/returnjurisdiction', Jurisdiction.returnList);//返回所有权限列表数据
router.get('/updataJurisdiction', Jurisdiction.updata);//添加权限
router.get('/removeJurisdiction', Jurisdiction.remove);

//============
router.get('/addrole', Role.createRoles);    //超级管理员，添加角色

export default router;
