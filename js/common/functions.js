var functions = function() {};

if ( 'undefined' != typeof global ) {
    
    module.exports = functions;
    
    var globals = require( './globals.js');
}



functions.sanitize_input = function( input_string, max_length ) {

    var max_length = (typeof max_length !== 'undefined') ?  max_length : 15;
    
    var sanitized = '';
    
    for ( var i = 0, len = input_string.length; i < len; i++ ) {
        
        if ( globals.CHAR_WHITELIST.indexOf( input_string.charAt( i ) ) > -1 )
            sanitized += input_string.charAt( i );
        
        if ( sanitized.length >= max_length )
            break;
        
    }
    
    return sanitized;
}


functions.encode_message = function( msg_type, msg_body ) {
    
    return {
        type: msg_type,
        body: msg_body
    };
    
};

functions.decode_message = function( msg ) {
    
    return {
        type: msg.type,
        body: msg.body
    };
    
};

functions.encode_mouseclick = function( button, mouse_x, mouse_y ) {
    
    return {
        input_type: globals.MOUSECLICK,
        
        button: button,
        mouse_x: mouse_x,
        mouse_y: mouse_y
    };
    
};

functions.decode_mouseclick = function( mouseclick ) {
    
    if ( mouseclick.input_type !== globals.MOUSECLICK )
        return undefined;
    
    return {
        input_type: mouseclick.input_type,
        
        button: mouseclick.button,
        mouse_x: mouseclick.mouse_x,
        mouse_y: mouseclick.mouse_y
    };
     
};

functions.encode_keyinput = function( key ) {
    
    return {
        input_type: globals.MOVEMENT,
        
        key: key
    };
    
};

functions.decode_keyinput = function( mouseclick ) {
    
    if ( mouseclick.input_type !== globals.MOVEMENT )
        return undefined;
    
    return {
        input_type: mouseclick.input_type,
        
        key: mouseclick.key
    };
     
};