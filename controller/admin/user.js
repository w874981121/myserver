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
	constructor() {}

	//============== 普通用户创建-注册 ==============

	//账户检测是否存在
	userNnameV(req, res, next) {
		try {
			if(!req.query.user_name) {
				throw new Error('用户名参数错误')
			}
		} catch(err) {
			res.send({
				type: 'GET_ERROR_PARAM',
				message: err.message,
			})
			return
		}
		user.findByName(req.query.user_name, (err, str) => {
			let data = {}
			console.log(str)
			if(!err && str) {
				data['state'] = true
				data['message'] = '账户已存在'
				res.send(JSON.stringify(data))
			} else {
				data['state'] = false
				data.message = '账户未注册'
				if(req.query.password) {
					next()
				} else {
					res.send(JSON.stringify(data))
				}
			}

		})
	}
	//检测通过，且存在密码字段则写入数据库
	async register(req, res, next) {
		let doc, data = {};
		try {
			if(!req.query.password) {
				throw new Error('密码参数错误')
			}
		} catch(err) {
			res.send({
				type: 'GET_ERROR_PARAM',
				message: err.message,
			})
			return
		}

		doc = {
			user_name: req.query.user_name,
			password: req.query.password,
			state: true,
			status: 2, //注册默认为2（普通用户），需超级管理员修改身份
		};
		await new user(doc).save().then((str) => {
			console.log('注册成功')
			data.data = str;
			data['message'] = '注册成功'
		}).catch((err) => {
			console.log('注册失败')
			data.type = 'FAIL';
			data.message = '注册失败'
		});
		res.send(JSON.stringify(data));
	}

	//============== 用户登陆 ==============

	async login(req, res, next) {
		let doc, data = {};
		try {
			if(!req.query.password) {
				throw new Error('密码参数错误')
			} else if(!req.query.user_name) {
				throw new Error('用户名参数错误')
			}
		} catch(err) {
			res.send({
				type: 'GET_ERROR_PARAM',
				message: err.message,
			})
			return
		}
		await user.findByName(req.query.user_name, (err, str) => {
			if(!err && str) {
				if(req.query.password == str.password) {
					data.data={}
					data.data.user_name = str.user_name
					data.data.state = str.state
					data.data.status = str.status
					data.message = "登录成功"
				} else {
					data.data = err
					data.message = "密码错误"
				}
			}
			res.send(JSON.stringify(data));
		})
	}

	//============== 用户修改密码 ==============

	//============== 用户忘记密码找回 ==============

}

export default new User()