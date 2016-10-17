describe( "Game Core", function() {
    
    var globals = require('../../../js/common/globals.js');
    var core = require('../../../js/common/core.js');
    
    beforeEach( function() {
        core = new core();
    } );
    
    it( "should process a single input correctly.", function()  {
        
        avatar = {
            inputs: []
        };
        
        avatar.inputs = [ {
            input_type: globals.MOVEMENT,
            key: globals.UP
        } ];
        var iv = core.process_input( avatar );
        
        expect( iv.movement.vertical ).toEqual( -1 );
        expect( iv.movement.horizontal ).toEqual( 0 );
        expect( iv.mouse.left ).toEqual( null );
        expect( iv.mouse.right ).toEqual( null );
        expect( iv.mouse.scroll ).toEqual( 0 );
        
        avatar.inputs = [ {
            input_type: globals.MOUSECLICK,
            
            button: globals.LMB,
            mouse_x: 10,
            mouse_y: 11,
        } ];
        var iv = core.process_input( avatar );
        
        expect( iv.movement.vertical ).toEqual( 0 );
        expect( iv.movement.horizontal ).toEqual( 0 );
        expect( iv.mouse.left.x ).toEqual( 10 );
        expect( iv.mouse.left.y ).toEqual( 11 );
        expect( iv.mouse.right ).toEqual( null );
        expect( iv.mouse.scroll ).toEqual( 0 );
        
    } );
    
} );