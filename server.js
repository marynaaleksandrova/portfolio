// http://marynaaleksandrova.info
// (c) 2011 Maryna Aleksandrova (http://marynaaleksandrova.info).
// http://marynaaleksandrova.info may be freely distributed under the MIT license.
var express = require('express'),
    app = express.createServer();
app.configure(function(){
    app.use(express.favicon(__dirname + '/favicon.ico'));
    //logger
    app.use(express.logger());
    //public folder for static files
    app.use(express.static(__dirname + '/public'));
});
// disable layout
app.set("view options", {layout: false});
// make a custom html template
app.register('.html', {
  compile: function(str, options){
    return function(locals){
      return str;
    };
  }
});

app.get('*', function(req, res){
  res.render(__dirname + '/public/' + 'index.html');
});

app.listen(8081);

