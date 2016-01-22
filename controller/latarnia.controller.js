latarniaController = function()
{
	this.req;
	this.deviceID;
	this.uid;	
}


latarniaController.prototype = {
	
	
	route: function(res)
	{
		switch(this.req.action)
		{
			case 'getLocations':
				var promiseScope = [];
				members.userExist(this.req.user).then(function(dane){//czy user istnieje
					if(dane.exist)
					{
						promiseScope.push(dane);
						return latarnia.getLocations(dane.detail.uid);//pobranie lokacji
					}
				}).then(function(dane){
					res.send({
						data: dane,
						currentLoc: promiseScope[0].detail.currentLocation
					});
				});
				
			break;
			case 'fuckClient':
				var locID = this.req.locID;
				var client = this.req.client;
				var dane, currentData,fuckResult,location;
				
				
				members.userExist(this.req.user).then(function(result){//ycz user istnieje
					if(result.exist)
					{
						dane = result;
						return members.downloadUserData(dane.detail.deviceID,0); //aktualizacja chcicy itd
					}
				}).then(function(result){
					currentData = result;
					return latarnia.fuckClient(locID,client,dane.detail.uid,currentData.chcica,dane.detail,currentData.sloneczko);//ruchanie klienta
				}).then(function(result){
					fuckResult = result;
					return latarnia.getLocations(dane.detail.uid);//pobrane lokacji
				}).then(function(result){
					fuckResult.locationOverWrite = result;
					res.send(fuckResult);//wyswietlenie
				});
			break;
		}
	}
	
	
}