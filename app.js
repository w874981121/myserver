/*
 * Created by wangyanqi on 2017/8/11.
 * 
 * 
 * 作者：知乎用户
链接：https://www.zhihu.com/question/24932326/answer/29502437
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
                   _oo0oo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  0\  =  /0
                ___/`---'\___
              .' \\|     |// '.
             / \\|||  :  |||// \
            / _||||| -:- |||||- \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |_/ |
           \  .-\__  '-'  ___/-. /
         ___'. .'  /--.--\  `. .'___
      ."" '<  `.___\_<|>_/___.' >' "".
     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
     \  \ `_.   \_ __\ /__ _/   .-` /  /
 =====`-.____`.___ \_____/___.-`___.-'=====
                   `=---='


 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

           佛祖保佑         永无BUG
           ***
*/


'use strict';
import express from 'express';
import db from './mongodb/db.js';
import cookieParser from 'cookie-parser';
//请求体解析中间件
import bodyParser from 'body-parser';
import fs from 'fs';
import logger from 'morgan';//日志中间件
//
import router from './routes/index';

//创建打印log文件
const accessLogStream = fs.createWriteStream(__dirname + '/server.log', {
	flags: 'a'
});

const app = express();
//模块日志参数设置参考地址  https://www.npmjs.com/package/morgan
app.use(logger('-----[:date[clf]] :method :url :status :response-time ms :referrer :user-agent', {
	stream: accessLogStream
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());

app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.origin || '*'); //设置跨域
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", '3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	console.log(req.method);
	if(req.method == 'OPTIONS') {
		res.send(200);
	} else {
		next();
	}
});
//路由导入
router(app);

//  捕获404并转发到错误处理程序 
app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// 错误处理程序
app.use((err, req, res, next) => {
	// 设置本地，只提供开发中的错误\
//	res.send(err);
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.end('oooookkk')
});

module.exports = app;