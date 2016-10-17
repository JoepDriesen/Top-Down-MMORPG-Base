var assets,
    assets_manifest = [
        { id: 'map_tileset', src: 'assets/maps/tileset.json', type: 'spritesheet' },
    ];

window.onload = function() {
    
    assets = new createjs.LoadQueue( true, '/' );
    
    assets.addEventListener( 'complete', function() {
       
        var client = new Client( globals.DEBUG );
        
        document.getElementById( 'loader' ).style.display = 'none';
        document.getElementById( 'progress' ).style.display = 'none';
        document.getElementById( 'start-button-container' ).style.display = 'block';
        document.getElementById( 'start-button-container' ).onclick = function( ev ) {
            
            var nickname = document.getElementById( 'nickname' ).value;
        
            client.connect( nickname );
            
            document.getElementById( 'intro-wrapper' ).style.display = 'none';
        }
        
        client.connect( '' );
        
        document.getElementById( 'intro-wrapper' ).style.display = 'none';

    } );
    
    assets.addEventListener( 'progress', function( ev ) {
        
        document.getElementById( 'progress' ).innerHTML = ( 100 * ev.progress ).toFixed( 0 ); + '%';
        
    } );
    
    assets.loadManifest( assets_manifest );
    
};

var Client = function( viewport, debug ) {

    this.debug = debug;
    
    this.STATES = {
        connecting:     'connecting',
        connected:      'connected',
        disconnected:   'disconnected',
        not_connected:  'not-connected',
    }
    this.state = this.STATES.not_connected;

    this.keyboard = new THREEx.KeyboardState();
    
    this.inputs = [];
    
    this.latest_server_update = null;
    
    if ( this.debug ) {
        
        this.game_loop_dt_begin = 0;
        this.game_loop_dt_update = 0;
        this.game_loop_dt_draw = 0;
        this.game_loop_updates_per_frame = 0;
        
    }

};