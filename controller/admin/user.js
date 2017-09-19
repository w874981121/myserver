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
				throw new Error('用户名参数缺失或错误')
			}
		} catch(err) {
			res.send({
				state: false,
				message: err.message
			})
			return
		};
		user.findOne({
			'user_name': req.query.user_name
		}, (err, str) => {
			let data = {};
			if(!err && str) {
				data.state = false;
				data.message = '账户已存在';
				res.send(JSON.stringify(data))
			} else if(err) {
				data.state = false;
				data.err = err;
				data.message = '数据库存储错误';
				res.send(JSON.stringify(data))
			} else if(!str) {
				data.state = false;
				data.message = '账户未注册';
				if(req.query.password) {
					next()
				} else {
					res.send(JSON.stringify(data))
				}
			}

		})
	}
	//检测通过，存在密码字段则写入数据库
	async register(req, res, next) {
		let doc, data = {};
		try {
			if(!req.query.password) {
				throw new Error('密码参数错误')
			}
		} catch(err) {
			res.send({
				state: false,
				message: err.message
			});
			return
		}

		doc = {
			user_name: req.query.user_name,
			password: re(req.query.password),
			state: false, //审核通过修改为true，次管理才为可用状态
			status: 1, //注册默认为2（普通管理，未审核状态），需超级管理员修改身份
		};
		await new user(doc).save().then((str) => {
			if(str) {
				data.state = true;
				data.message = '注册成功'
			} else {
				data.state = false;
				data.message = '注册失败'
			}
		}).catch((err) => {
			data.err = err
			data.type = 'FAIL';
			data.state = false;
			data.message = '注册失败'
		});
		res.send(JSON.stringify(data));
	}

	//============== 用户登陆 ==============

	async login(req, res, next) {
		let data = {};
		await user.findOne({
			"user_name": req.query.user_name
		}, (err, str) => {
			if(!err && str) {
				if(re(req.query.password) === str.password) {
					data.data = {};
					data.data.user_name = str.user_name;
					data.data.state = str.state;
					data.data.status = str.status;
					data.state = true; //登陆状态吗
					data.message = "登录成功"
				} else {
					data.data = err;
					data.state = false;
					data.message = "密码错误"
				}
			} else {
				data.state = false;
				data.message = "账号不存在"
			}
			res.send(JSON.stringify(data));
		})
	}

	//============== 超级管理，返回所有角色信息 ==============
	async returnUser(req, res, next) {
		let data = {}
		await user.find((err, str) => {
			if(!err && str) {
				data.data = str
				data.state = true
				data.message = "成功"
			} else if(err) {
				data.err = err
				data.state = false
				data.message = "失败"
			} else if(!str) {
				data.state = false
				data.message = "数据为空或失败"
			}
		})
		res.send(JSON.stringify(data))
	}

	//============== 超级管理，修改管理角色 ==============

	async updataRole(req, res, next) {
		let data = {}
		await user.updata({
			"_id": req.query._id
		}, {
			"role_id": req.query.role_id
		}).then((str) => {
			if(str) {
				data.state = true
				data.message = "修改成功"
			} else {
				data.state = false
				data.message = "修改失败"
			}
		}).catch((err) => {
			data.err = err
			data.state = false
			data.message = "数据库修改错误"
		})
		res.send(JSON.stringify(data))
	}

	//============== 超级管理，修改多账户状态 ==============

	async updataState(req, res, next) {
		let data = {}
		await req.query.state.forEach((val, index) => {
			user.updata({
				"_id": val["_id"]
			}, {
				"role_id": val["state"]
			}).then((str) => {
				if(str) {
					data.state = true
					data.message = "修改成功"
				} else {
					data.state = false
					data.message = "修改失败"
					return
				}
			}).catch((err) => {
				data.err = err
				data.state = false
				data.message = "数据库修改错误"
				return
			})
		})
		res.send(JSON.stringify(data))
	}

	//============== 超级管理，修改账户密码 ==============

	async updataPassword(req, res, next) {
		let data = {}
		await user.updata({
			"_id": req.query._id
		}, {
			"password": req.query.password
		}).then((str) => {
			if(str) {
				data.state = true
				data.message = "密码修改成功"
			} else {
				data.state = false
				data.message = "密码修改失败"
			}
		}).catch((err) => {
			data.err = err
			data.state = false
			data.message = "数据库修改错误"
		})
		res.send(JSON.stringify(data))
	}

	//============== 超级管理，注销账户 ==============

	async remove(req, res, next) {
		await user.remove({
			"_id": req.query._id
		}).then((str) => {
			let data = {}
			if(str.length > 0) {
				data.data = str
				data.state = true
				data.message = "注销成功"
			} else {
				data.state = false
				data.message = "注销失败"
			}

		}).catch((err) => {
		data.err = err
		data.state = false
		data.message = "失败"
	});
	res.send(JSON.stringify(data));
}

}

export default new User()