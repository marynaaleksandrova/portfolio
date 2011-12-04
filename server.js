// http://marynaaleksandrova.info
// (c) 2011 Maryna Aleksandrova (http://marynaaleksandrova.info).
// http://marynaaleksandrova.info may be freely distributed under the MIT license.
var express = require('express'),
    app = express.createServer();
app.configure(function(){
    app.use(express.favicon(__dirname + '/favicon.icon'));
    //logger
    app.use(express.logger());
    //public folder for static files
    app.use(express.static(__dirname+'/public'));
});
app.listen(8081);

