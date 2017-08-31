/**
 * Created by wangyanqi on 2017/8/11.
 */
'use strict';
import express from 'express';
import cookieParser from 'cookie-parser';
//请求体解析中间件
import bodyParser from 'body-parser';
//文件处理
import fs from 'fs';
//日志中间件
import logger from 'morgan';
//
import index from './routes/index';
import users from './routes/users';

const accessLogStream = fs.createWriteStream(__dirname + '/server.log', {
	flags: 'a'
})

const app = express();
//app.use(logger('dev'));
//app.use(logger('combined', {stream: accessLogStream}))
//:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
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
	res.header("X-Powered-By", '3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	console.log(req.method)
	if(req.method == 'OPTIONS') {
		res.send(200);
	} else {
		next();
	}
});

app.use('/index', index);
app.use('/users', users);

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