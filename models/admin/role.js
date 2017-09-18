/*
 * 
 * Created by wangyanqi .
 * Date 2017-08-30
 * GitHub w874981121 ——小小疯
 * 
 * 角色数据模块
 * role_name: 角色名称
 * jurisdiction： 角色拥有权限数组列表
 * role_userid: 拥有此角色的用户ID列表
 * state: 状态(true 为此角色可以访问，false 为此角色不可访问)
 * 
 */



'use strict';

import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema({
	role_name:String,
	jurisdiction:[],
	role_userid:[],
	state:Boolean,
	time: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		},
	}
});

// 检测并修改存入数据时间 (在执行sava之前执行callback,pre 一个钩子函数)
roleSchema.pre('save', function(next) {
	if(this.isNew) {
		this.time.createAt = this.time.updateAt = Date.now()
	} else {
		this.time.updateAt = Date.now()
	}
	next();
});

const role_model = mongoose.model('role', roleSchema);

export default role_model