bootController = function()
{
	this.req;
	this.deviceID;
	this.uid;	
}


bootController.prototype = {
	
	
	route: function(res)
	{
		switch(this.req.action)
		{
			case 'getData':
				members.downloadUserData(this.deviceID,0).then(function(dane){//TU JEST OKRES USTALANY I CO SIE DZIEJE JAK SIE CIAZA SKONCZY
					res.send(dane);
				});
			break;
			case 'login':
				members.loginUser(this.deviceID,this.req.pushID).then(function(dane){
					res.send(dane);
				});				
			break;
			case 'loginWithLogin':
				members.registerUser(this.deviceID,this.req.login,this.req.pushID, this.req.country).then(function(dane){
					res.send(dane);
				});
			break;
			case 'getNotification':
				notifyRaports.getNotification(this.uid,this.req.notifyLimit,this.req.notifyOffset).then(function(dane){
					res.send(dane);
				});			
			break;
				case 'getNotificationByCat':
					switch(this.req.cat)
					{
						case 'smonly':
							notifyRaports.getNotificationOnlySadoMaso(this.uid,this.req.notifyLimit,this.req.notifyOffset).then(function(dane){
								res.send(dane);
							});	
						break;
						case 'comonly':
							notifyRaports.getNotificationOnlySMComments(this.uid,this.req.notifyLimit,this.req.notifyOffset).then(function(dane){
								res.send(dane);
							});
						break;
					}				
				break;
		}
	}
	
	
}