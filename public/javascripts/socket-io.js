$(function()
{
	var socket = io.connect('http://arg.so:3000');
	
	socket.on('Notifications', function(data)
	{
		if (data['message'] == 'derp')
		{
			$('#data').html('<h1>OFFLINE</h1>');
		}
		else
		{
			$('#data').html(data['message']);	
		}
	});
	
	
});