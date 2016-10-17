var globals = function() {};

if ( 'undefined' != typeof global )
    module.exports = globals;


globals.DEBUG = true;



globals.CHAR_WHITELIST = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';



// MESSAGE TYPES
globals.CLIENT_INPUT    = 0,
globals.SERVER_UPDATE   = 1,
globals.PING            = 2;



// INPUT EVENTS
globals.MOVEMENT    = 0,
globals.MOUSECLICK  = 1;

// MOUSE BUTTONS
globals.LMB     = 0,
globals.RMB     = 1,
globals.MMB     = 2;

// KEYS
globals.UP      = 0,
globals.DOWN    = 1,
globals.LEFT    = 2,
globals.RIGHT   = 3;