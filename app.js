
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();
var appServer = require('http').createServer(app)
var io = require('socket.io').listen(appServer);
var connections = [];

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

appServer.listen(3000, function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io.sockets.on('connection',
	function (socket)
	{
		connections.push(socket);
		
		socket.on('disconnect', function()
		{
			connections.splice(connections.indexOf(socket), 1);
		});
		
		console.log(connections.length);
		
		if (connections.length > 0)
		{
			connections.forEach(
				function(client)
				{
					client.emit('Notifications', {message: 'derp'});
				});
		}
	});