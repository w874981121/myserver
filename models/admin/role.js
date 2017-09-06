/**
 * 
 * Created by wangyanqi .
 * Date 2017-08-30
 * GitHub w874981121 ——小小疯
 * 
 * 角色数据模块
 * role_name: 角色名称
 * jurisdiction： 角色拥有权限数组列表
 * 
 * 
 */



'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const roleSchema = new Schema({
	role_name:String,
	jurisdiction:[],
	state:Boolean
})
const role_model = mongoose.model('Hongbao', roleSchema);