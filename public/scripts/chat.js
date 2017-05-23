$(function () {

  let myName = prompt("You must enter a name");

  var socket = io();
  $('#messages').append($('<li>').text("You connected"));
  socket.emit('user connected', myName);
  
  $('form').submit(function(){
    let msg = $('#m').val();
    socket.emit('send message', msg);
    $('#messages').append($('<li>').text('You said: ' + msg));
    $('#m').val('');
    return false;
  });


  socket.on('update messages', function(msg){
    $('#messages').append($('<li>').text(msg));
  });

  socket.on('update num users', function(msg){
    $('#messages').append($('<li>').text(msg));
  });

});