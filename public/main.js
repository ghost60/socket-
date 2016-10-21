

var socket = io();
var username ="";


$(function() {

  function login() {
    username = $(".username").val();
    var message = {
        user:username,
    }
    socket.emit('login', message);
    listen();
  };

  $(".sure").bind("click", function(){
      login();
  });
});

function listen(){
  socket.on(username, function (data) {
    $(".list").append('<li>'+data.message+'</li>');
  });

  function sendMessage() {
    var content = $(".input").val();
    var message = {
        user:username,
        content:content
    }
    socket.emit('server', message);
  };

  $(".send").bind("click", function(){
      sendMessage();
  });
}

