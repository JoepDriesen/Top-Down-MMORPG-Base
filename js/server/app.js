/*jslint node:true */
'use strict';

/*jslint nomen: true */
global.base_dir = __dirname + '/../../';
/*jslint nomen: false */

var port            = process.env.PORT || 4004,

    io              = require('socket.io'),
    express         = require('express'),
    UUID            = require('node-uuid'),

    verbose         = false,
    http            = require('http'),
    app             = express(),
    server          = http.createServer(app),

    game_server     = require(global.base_dir + 'js/server/server.js');



/* Express server set up. */

/*
 * The express server handles passing our content to the browser,
 * As well as routing users where they need to go. This example is bare bones
 * and will serve any file the user requests from the root of your web server (where you launch the script from)
 * so keep this in mind - this is not a production script but a development teaching tool.
 */

// Tell the server to listen for incoming connections
server.listen(port);

// Log something so we know that it succeeded.
console.log('\t :: Express\t:: Listening on port ' + port);

// By default, we forward the / path to index.html automatically.
app.get('/', function (req, res) {
    res.sendFile('/index.html', { root: global.base_dir + 'html/' });
});

app.use('/css', express['static'](global.base_dir + 'css/'));
app.use('/js/common', express['static'](global.base_dir + 'js/common/'));
app.use('/js/client', express['static'](global.base_dir + 'js/client/'));
app.use('/assets', express['static'](global.base_dir + 'assets/'));

app.use('/mainloop/', express['static'](global.base_dir + 'node_modules/mainloop.js/build/'));



/* Socket.IO server set up. */

/*
 * Express and socket.io can work together to serve the socket.io client files for you.
 * This way, when the client requests '/socket.io/' files, socket.io determines what the client needs.
 */
        
// Create a socket.io instance using our express server
var sio = io.listen(server);

// Configure the socket.io connection settings.
// See http://socket.io/
sio.use(function (socket, next) {

    var handshakeData = socket.request;

    next();
    
});

sio.sockets.on('connection', function (player) {

    // Generate a new UUID, looks something like
    // 5b2ca132-64bd-4513-99da-90e838ca47d1
    // and store this on their socket/connection
    player.id = UUID();
    player.userid = player.id;

    // Tell the player they connected, giving them their id
    player.emit('connected', { id: player.userid });

    // Useful to know when someone connects
    console.log('\t :: socket.io\t:: player ' + player.userid + ' connected');


    // Now we want to handle some of the messages that clients will send.
    // They send messages here, and we send them to the game_server to handle.
    player.on('message', function (m) {

        game_server.onMessage(player, m);

    }); //player.on message

    // When this client disconnects, we want to tell the game server
    // about that as well, so it can remove them from the game they are
    // in, and make sure the other player knows that they left and so on.
    player.on('disconnect', function () {

        // Useful to know when soomeone disconnects
        console.log('\t :: socket.io\t:: player ' + player.userid + ' disconnected');

    }); //player.on disconnect

}); //sio.sockets.on connection