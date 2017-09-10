/*
 * 
 * Created by wangyanqi .
 * Date 2017-08-30
 * GitHub w874981121 ——小小疯
 * 
 * 权限列表数据模型 || 功能列表
 * 
 * jurisdiction_name: 名称
 * jurisdiction: 功能名称
 * state: 状态
 */

'use strict';

import mongoose from 'mongoose'

const jurisdictionSchema = new mongoose.Schema({
	jurisdiction_name:String,
	jurisdiction:String,
	state:String
});
const jurisdiction_model = mongoose.model('Hongbao', jurisdictionSchema);

export default jurisdiction_model