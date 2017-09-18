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
		let doc, data = {};
		try {
			doc = {
				role_name: req.query.role_name,
				jurisdiction: req.query.jurisdiction,
				state: true
			}
		} catch(err) {
			data.err = err
			data.state = false
			data.message = "参数异常或缺失"
			res.send(JSON.stringify(data));
			return
		}

		await new role(doc).save().then((str) => {
			if(str) {
				data.state = true
				data.message = "添加成功"
			} else {
				data.state = false
				data.message = "添加失败"
			}
		}).catch((err) => {
			data.err = err
			data.state = false
			data.message = "数据库存储错误"
		})
		res.send(JSON.stringify(data));
	}
	
	//============== 超级管理员,修改角色权限 ==============
	
	//============== 超级管理员,删除角色 ==============
}

export default new Role()