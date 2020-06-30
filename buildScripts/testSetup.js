// This file isnt transpiled so must use commonJS and ES5

// register babel to transpile before our test run 
require("babel-register")();

// Disable webpack that Mocha Doesnt understand
require.extensions['.css'] = function(){}