/**
 * 
 * Created by wangyanqi .
 * Date 2017-08-30
 * GitHub w874981121 ——小小疯
 * 
 * 
 * 用户信息数据模型
 * 
 */

'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userSchema = new Schema({
	user_name:String,
	id:String,
	password:String,
	state:String
})


