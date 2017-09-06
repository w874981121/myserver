/**
 * Created by wangyanqi on 2017/8/11.
 */

'use strict';
import users from './admin'

export default app => {
	// app.get('/', (req, res, next) => {
	// 	res.redirect('/');
	// });
	app.use('/users', users);
}