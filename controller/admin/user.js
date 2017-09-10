/*
 *
 * Created wangyanqi
 * Date 2017/9/8
 * GitHub w874981121 ——小小疯
 *
 */

'use strict';

import user from '../../models/admin/user'
import re from '../../public/regular'

class User {
    constructor() {

    }

    //============== 普通用户创建-注册 ==============

    async register(req, res, next) {
        let doc, users, data = {};
        try{
            if (!req.query.user_name) {
                throw new Error('用户名参数错误')
            } else if (!req.query.password) {
                throw new Error('密码参数错误')
            }
        }catch (err){
            res.send({
                type: 'GET_ERROR_PARAM',
                message: err.message,
            })
            return
        }

        await user.findOne({'user_name': req.query.user_name}, (err, str) => {
            if (str) {
                data.message = '账户已被注册'
            }
            res.send(data);
        });

        doc = {
            user_name: req.query.user_name,
            password: req.query.password,
            state: true,
            status: 2, //注册默认为2（普通用户），需超级管理员修改身份
        };
        await new user(doc).save().then((str) => {
            data.data = str;
            data['message'] = '注册成功'
        }).catch((err) => {
            data.type = 'FAIL';
            data.message = '注册失败'
        });
        res.send(data);
    }


    //============== 用户登陆 ==============

    async role(req, res, next) {
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

    //============== 用户修改密码 ==============

    //============== 用户忘记密码找回 ==============

    async role(req, res, next) {
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

export default new User()