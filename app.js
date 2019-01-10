var app = require('express')();
var https = require('https').Server(app);
var io = require('socket.io')(https);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));




app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res){
  var userinfo = req.body.userinfo;
  var socket_id = req.body.socket_id
console.log(userinfo);
     io.to(socket_id).emit('userinfo', userinfo);
       res.send('userinfo has been updated')

});

io.on('connection', function(socket) {
    console.log('A new WebSocket connection has been established on socket id ' + socket.id);
});

    io.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected.`);
    });
;
 

https.listen(443, function() {
    console.log('Listening on *:8000');
});
