/**
 * Created wangyanqi
 * Date 2017/9/11
 * GitHub w874981121 ——小小疯
 */
'use strict';

import role from '../../models/admin/role'

class Role {
    constructor() {}

    //============== 超级管理员权限创建管理员角色 ==============

    async createRoles(req, res, next) {
        let roles = new role({
            role_name: '审核员',
            jurisdiction: ['admin', 'role', 'jurisdiction'],
            state: true
        });
        await roles.save((err, red)=> {
            console.log(err, "err");
            console.log(red, "red");
            res.send('走到了这里了么`````');
        })
    }
}

export default new Role()