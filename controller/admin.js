/*
 *
 * Created wangyanqi
 * Date 2017/9/8
 * GitHub w874981121 ——小小疯
 *
 */

'use strict';

import user from '../models/admin/user'
import role from '../models/admin/role'

class Admin {
    constructor() {
        this.user = this.user.bind(this)
    }

    /*
     *
     *  用户创建
     *
     */

    async user(req, res, next) {
        let users = new user({
            phone: 13592046894,
            user_name: 'wangyq',
            password: 11428020,
            state: true,
            status: 0,
            role_name: '超级管理员',
            role_id: ''
        });
        await users.save((err, red)=> {
            console.log(err, "err");
            console.log(red, "red");
            res.send('走到了这里了么`````');
        })
    }

    /*
     *
     *  角色创建
     *
     *
     */

    async role(req, res, next) {
        let roles = new role({
            role_name: '审核员',
            jurisdiction: ['admin', 'role', 'jurisdiction'],
            state: true
        })
        await roles.save((err, red)=> {
            console.log(err, "err");
            console.log(red, "red");
            res.send('走到了这里了么`````');
        })
    }


}

export default new Admin()