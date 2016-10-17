var Core = function( debug ) {
    
    // Pixels per meter in the game world
    this.ppm = 100;

    this.avatars = {};

}
if( 'undefined' != typeof global ) {
    
    module.exports = Core;
    
    var globals = require( './globals.js');

}


Core.prototype.process_input = function( avatar ) {

    var iv = {
        movement: {
            vertical: 0,
            horizontal: 0,
        },
        mouse: {
            left: null,
            right: null,
            scroll: 0
        }
    };
    
    var ic = avatar.inputs.length;

    if ( ic ) {

        for ( var j = 0; j < ic; ++j ) {

            var input = avatar.inputs[j];
            
            if ( input.input_type == globals.MOVEMENT ) {
                
                if ( input.key == globals.UP )
                    iv.movement.vertical--;
                
                else if ( input.key == globals.DOWN )
                    iv.movement.vertical++;
                
                else if ( input.key == globals.LEFT )
                    iv.movement.horizontal--;
                
                else if ( input.key == globals.RIGHT )
                    iv.movement.horizontal++;
                
            } else if ( input.input_type == globals.MOUSECLICK ) {
             
                if ( input.button == globals.LMB )
                    iv.mouse.left = {
                        x: input.mouse_x,
                        y: input.mouse_y
                    };
             
                if ( input.button == globals.RMB )
                    iv.mouse.right = {
                        x: input.mouse_x,
                        y: input.mouse_y
                    };
            }
        
        }

        // We van now clear the array since these have been processed
        avatar.inputs = [];

    }

    return iv;

};

Core.prototype.update = function() {
    
};

Core.prototype.world_snapshot = function() {
    
    return {};
    
};