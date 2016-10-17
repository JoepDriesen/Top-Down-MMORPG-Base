/*jslint node:true */
'use strict';

var globals     = require( '../common/globals.js'),
    functions   = require( '../common/functions.js'),
    
    Core        = require( '../common/core.js' ),
    
    uuid        = require( 'node-uuid' ),
    mainloop    = require( 'mainloop.js' );
    
    
var Server = function ( debug ) {
    
    this.debug = debug;
    
    this.core = new Core( debug );
    
    // Player data
    this.players = {};
    // Input list per player since last frame
    this.inputs = {};
    
    if ( this.debug ) {
        
        this.game_loop_dt_begin = 0;
        this.game_loop_dt_update = 0;
        this.game_loop_dt_draw = 0;
        this.game_loop_updates_per_frame = 0;
        
    }
    
    this.server_time = 0;
    
    this.random_nicknames = [ 'anus' ];
    
};
module.exports = Server;

// Simple wrapper for logging
Server.prototype.log = function( log_message ) {
    
    if ( this.debug )
        console.log('\t :: Server\t:: ' + log_message);
    
};


Server.prototype.start = function() {
    
    mainloop.setBegin( this.begin.bind( this ) )
            .setUpdate( this.update.bind( this ) )
            .setDraw( this.draw.bind( this ) )
            .start();
    
    this.log( 'Server startup complete!');
    
}

Server.prototype.begin = function( timestamp, delta ) {
    
    if ( this.debug ) {
    
        this.game_loop_updates_per_frame = 0;
        
        var start = new Date().getTime();
        
    }
    
    this.server_time = timestamp;
    
    for ( var player_id in this.inputs ) {
        
        var input_vector = this.core.process_input( timestamp, player_id, this.inputs[player_id] );
        
        delete this.inputs[player_id];
        
    }
    
    if ( this.debug )
        this.game_loop_dt_begin = new Date().getTime() - start;

};

Server.prototype.update = function( delta ) {

    if ( this.debug )
        var start = new Date().getTime();
    
    this.core.update( delta );
    
    if ( this.debug ) {
        
        this.game_loop_dt_update = new Date().getTime() - start;
        this.game_loop_updates_per_frame++;
        
    }

};

Server.prototype.draw = function() {
    
    if ( this.debug )
        var start = new Date().getTime();
    
    // Send world state to each connected client
    var world_snapshot = this.core.world_snapshot();
    
    if ( this.debug )
        world_snapshot.game_loop_debug = {
            dt_begin: this.game_loop_dt_begin,
            dt_update: this.game_loop_dt_update,
            dt_draw: this.game_loop_dt_draw,
            updates_per_frame: this.game_loop_updates_per_frame
        };
    
    for ( var player_id in this.players )
        this.players[player_id].emit( 'serverupdate', world_snapshot );
    
    if ( this.debug )
        this.game_loop_dt_draw = new Date().getTime() - start;
    
}

Server.prototype.join = function( player, nickname ) {
    
    player.game_id = uuid();
    
    nickname = functions.sanitize_input( nickname );
    
    if ( nickname == '' )
        nickname = this.random_nicknames[Math.floor( Math.random() * this.random_nicknames.length )];
    
    var extra = 0,
        unduplicated_nickname = nickname;
    while ( this.nickname_exists( unduplicated_nickname ) ) {
        
        extra++;
        unduplicated_nickname = nickname + '#' + extra;
        
    }
    
    player.nickname = unduplicated_nickname;
    
    this.log( 'Player ' + player.id + ' joined the server' );

    this.players[player.game_id] = player;
    
    player.emit( 'connected', {
        id: player.game_id,
        nickname: player.nickname
    } );

};

Server.prototype.leave = function( player ) {

    if ( this.players[player.game_id] ) {
    
        this.log( 'Player with id ' + player.id + ' left the server' );

        delete this.players[player.game_id];

    }

};

Server.prototype.nickname_exists = function( nickname ) {
    
    for ( var player_id in this.players ) {
        
        if ( this.players[player_id].nickname == nickname )
            return true;
        
    }
    
    return false;
    
};