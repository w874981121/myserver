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
		doc = {
			role_name: req.query.role_name,
			jurisdiction: req.query.jurisdiction,
			state: true
		}
		await new role(doc).save().then((str) => {
			if(str.length > 0) {
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

	async updata(req, res, next) {
		let data = {};
		if(typeof req.query.jurisdiction !== "Array") return;
		await role.updata({
			"role_name": req.query.role_name
		},{"jurisdiction":req.query.jurisdiction}).then((str) => {
			if(str.length > 0) {
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
		res.send(JSON.stringify(data));
	}

	//============== 超级管理员,删除角色 ==============
	
	async remove(req, res, next) {
		await jurisdiction.remove({
			"role_name": req.query.role_name
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

export default new Role()