/*
 * 
 * Created by wangyanqi .
 * Date 2017-08-30
 * GitHub w874981121 ——小小疯
 * 
 * 权限列表数据模型 || 功能列表
 * 
 * jurisdiction_name: 功能中文名称
 * jurisdiction: 功能字段
 * state: 状态
 */

'use strict';

import mongoose from 'mongoose'

const jurisdictionSchema = new mongoose.Schema({
	jurisdiction_name:String,
	jurisdiction:String,
	state:String,
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
jurisdictionSchema.pre('save', function(next) {
	if(this.isNew) {
		this.time.createAt = this.time.updateAt = Date.now()
	} else {
		this.time.updateAt = Date.now()
	}
	next();
});

const jurisdiction_model = mongoose.model('Hongbao', jurisdictionSchema);

export default jurisdiction_model