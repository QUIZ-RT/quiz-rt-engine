const express = require("express");
const os = require("os");
const app = express();
const socketioJwt = require("socketio-jwt");
app.use(express.static("dist"));

const _ = require('lodash');

app.get("/api/getUsername", (req, res) =>
  res.send({
    usernameww: os.userInfo().username
  })
);
const server = app.listen(8080);
const io = require('socket.io').listen(server);

const gameData = {};
const players = {};

io.on('connection', socketioJwt.authorize({
  secret: 'he0ErCNloe4J7Id0Ry2SEDg09lKkZkfsRiGsdX_vgEg',
  timeout: 15000, // 15 seconds to send the authentication message
})).on('authenticated', function (socket) {
  //this socket is authenticated, we are good to handle more events from it.
  console.log('hello! ' + socket.decoded_token.name);
  
  socket.on('sendTopicId', function (data) {
    console.log("initial " + players);
    if (players[data.topicId]) {
      if (players[data.topicId].length === 3) {
        socket.emit('startGame',{});
      } else {
        if (!(_.includes(players[data.topicId], socket.decoded_token.name))) {
          players[data.topicId].push(socket.decoded_token.name);
        }
      }
    } else {
      players[data.topicId] = [];
      players[data.topicId].push(socket.decoded_token.name);
    }
    console.log(players);
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {

  });
})