/*
 * 
 * Created by wangyanqi .
 * Date 2017-08-30
 * GitHub w874981121 ——小小疯
 * 
 * 
 * 用户信息数据模型
 * user_name: 用户账号
 * password: 密码
 * phone: 手机号
 * state: 状态
 * status: 身份(0-超级管理员-唯一账户；1-普通管理员；)
 * role_name: 管理员的角色名称
 * role_id: 角色_id
 *
 *
 */

'use strict';

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	user_name:String,
	password:String,
	phone:String,
	state:String,
	status:Number,
	role_name:String,
	role_id:Number,
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
})
// 检测并修改存入数据时间 (在执行sava之前执行callback,pre 一个钩子函数)
userSchema.pre('save', function (next) {
	console.log(this,'这里是this')
	console.log(this.isNew,'这里是this.isNew')
	if (this.isNew) {
		this.time.createAt = this.time.updateAt = Date.now()
	} else {
		this.time.updateAt = Date.now()
	}
	next();
})


const user = mongoose.model('user', userSchema);

export default user