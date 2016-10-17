describe( "Game Server", function() {
    
    var Server = require('../../../js/server/server.js'),
        server;
    
    beforeEach( function() {
        server = new Server();
    } );
    
    it( "should save a player who joins the game.", function()  {
        
        var player = { 
            id: "test",
            emit: function() {}
        };
        
        server.join( player, '' );
        
        expect( server.players[player.game_id] ).toEqual( player );
        
    } );
    
    it( "should delete a player who leaves the game.", function() {
        
        var player = { 
            id: "test",
            emit: function() {}
        };
        
        server.join( player, '' );
        server.leave( player );
        
        expect( server.players[player.game_id] ).toBeUndefined();
        
    } );
    
} );