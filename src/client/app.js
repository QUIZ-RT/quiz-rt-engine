import './assets/scss/app.scss';
import 'popper.js';
import "bootstrap";
import './assets/media/logo.png';

import io from 'socket.io-client';

  //send the jwt
  $(document).on('submit', '#playgame', function (e) {
    console.log($('#jwtToken').val());
    const socket = io('http://localhost:8080');
    e.preventDefault();
    socket.on('connect', function () {
        // socket.on("unauthorized", function(error, callback) {
        //     if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
        //       // redirect user to login page perhaps or execute callback:
        //       callback();
        //       console.log("User's token has expired");
        //     }
        //   });
        socket.emit('authenticate', {
            token: $('#jwtToken').val()
        });
        socket.on('authenticated', function () {
            console.log(socket);
            socket.emit('sendTopicId', {
                topicId: $('#topicid').val()
            });
        })
      
    
    });
    
});