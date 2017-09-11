/*
 * Created by wangyanqi on 2017/8/11.
 */

'use strict';
import admin from './admin'

export default app => {
	app.use('/admin', admin);
}