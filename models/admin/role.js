/*
 * 
 * Created by wangyanqi .
 * Date 2017-08-30
 * GitHub w874981121 ——小小疯
 * 
 * 角色数据模块
 * role_name: 角色名称
 * jurisdiction： 角色拥有权限数组列表
 * state: 状态(true 为此角色可以访问，false 为此角色不可访问)
 * 
 */



'use strict';

import mongoose from 'mongoose'

const roleSchema = new mongoose.Schema({
	role_name:String,
	jurisdiction:[],
	state:Boolean
})
const role_model = mongoose.model('Hongbao', roleSchema);

export default role_model