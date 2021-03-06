// #!/usr/bin/env node


require('babel-core/register');
var app = require('../app');
var debug = require('debug')('myserver:server');
var http = require('http');
var config = require('config-lite');


/*
 * 从环境中获取端口并快速存储。
 */

var port = normalizePort(process.env.PORT || config.port);
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * 在所有网络接口上监听所提供的端口。
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 *规范端口转换成数字，string，或false。
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * HTTP服务器“error”事件的事件侦听器。
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 * 事件侦听HTTP服务器“listening”事件。
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
