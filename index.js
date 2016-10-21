var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// 静态资源
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var users=[];

io.on('connection', function (socket) {

	function firstsend(){
		console.log("在线用户："+users.length);
		console.log("给每个在线用户发消息");
		for (var i = users.length - 1; i >= 0; i--) {
			console.log("给在线用户："+users[i]+"发消息");
		    socket.emit(users[i], {
		    	message: '服务器发给你的消息'+users[i]
		    });
		};
	};

	firstsend();

	socket.on('server', function (data) {
		console.log('收到：'+data.user+":"+data.content);
	    socket.emit(data.user, {
	    	message: '服务器收到了你的消息'+ data.user
	    });
	});

	socket.on('login', function (data) {
		console.log(data.user+":登录");
		users.push(data.user);
		firstsend();
	});
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});

