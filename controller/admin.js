/**
 * Created wangyanqi
 * Date 2017/9/7
 * GitHub w874981121 ——小小疯
 */
'use strict';
import user from '../models/admin/user'

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
})

