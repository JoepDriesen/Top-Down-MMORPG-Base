describe( "Auxiliary Functions", function() {
    
    var globals = require('../../../js/common/globals.js');
    var functions = require('../../../js/common/functions.js');
    
    it( "should should decode a message to the way it was before encoding.", function()  {
        
        var test = {
            test: 1,
            test2: [1]
        }
        
        var encoded = functions.encode_message( globals.CLIENT_INPUT, test );
        var decoded = functions.decode_message( encoded );
        
        expect( decoded.type ).toEqual( globals.CLIENT_INPUT );
        expect( decoded.body.test ).toEqual( 1 );
        expect( decoded.body.test2[0] ).toEqual( 1 );
        
    } );
    
    it( "should should decode a mouseclick to the way it was before encoding.", function()  {
        
        var encoded = functions.encode_mouseclick( globals.LMB, 10, 11 );
        var decoded = functions.decode_mouseclick( encoded );
        
        expect( decoded.input_type ).toEqual( globals.MOUSECLICK );
        expect( decoded.button ).toEqual( globals.LMB );
        expect( decoded.mouse_x ).toEqual( 10 );
        expect( decoded.mouse_y ).toEqual( 11 );
        
    } );
    
    it( "should should decode a key input to the way it was before encoding.", function()  {
        
        var encoded = functions.encode_keyinput( globals.UP );
        var decoded = functions.decode_keyinput( encoded );
        
        expect( decoded.input_type ).toEqual( globals.MOVEMENT )
        expect( decoded.key ).toEqual( globals.UP );
        
    } );
    
} );