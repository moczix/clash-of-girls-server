ustawieniaController = function()
{
	this.req;
	this.deviceID;
	this.uid;	
}


ustawieniaController.prototype = {
	
	
	route: function(res)
	{
		switch(this.req.action)
		{
			case 'setSettings':
				membersPushSettings.savePushSettings(this.req).then(function(){
					res.send(true);
				});
			break;
			case 'getSettings':
				membersPushSettings.getSettings(custom.rcpd(this.uid)).then(function(result){
					res.send(result);
				});
			break;
		}
	}
	
	
}