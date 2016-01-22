haremController = function()
{
	this.req;
	this.deviceID;
	this.uid;	
}


haremController.prototype = {
	
	
	route: function(res)
	{
		switch(this.req.action)
		{
			case 'getHaremData':
				var userInstance, slaves;
				members.userExist(this.uid).then(function(result){
					if(result.exist == true)
					{
						userInstance = result.detail;
						return harem.getAvailableSlave(userInstance);
					}
				}).then(function(result){
					slaves = result;
					return membersStats.getMasazHajs(userInstance.uid, userInstance.zmeczenie,userInstance.zmeczenieMax);
				}).then(function(result){
					res.send({
						currentHajs: userInstance.hajs,
						masaz: result,
						slaves: slaves
					});
				});
			break;
			case 'buySlave':
				var userInstance;
				var haremID = this.req.harem;
				var amount = this.req.amount;
				if(amount > 0)
				{
					members.userExist(this.uid).then(function(result){
						if(result.exist == true)
						{
							userInstance = result.detail;
							return harem.buySlave(userInstance,haremID,amount);
						}
					}).then(function(result){
						if(result == true)
						{
							return harem.getAvailableSlave(userInstance);
						}
					}).then(function(result){
						res.send(result);
					});
				}
			break;
			case 'payHarem':
				var uid = custom.rcpd(this.uid);
				var kwota = this.req.kwota;
				var slaves,userInstance;
				if(custom.IsNumeric(kwota) && kwota >0)
				{
					members.payHarem(uid,kwota).then(function(result){
						userInstance = result;
						return harem.getAvailableSlave(userInstance);
					}).then(function(result){
						slaves = result;
						return membersStats.getMasazHajs(userInstance.uid, userInstance.zmeczenie,userInstance.zmeczenieMax);
					}).then(function(result){
						res.send({
							currentHajs: userInstance.hajs,
							masaz: result,
							slaves: slaves
						});
					});	
				}				
			break;
			case 'paidHarem':
				var uid = custom.rcpd(this.uid);
				var kwota = this.req.kwota;
				var slaves,userInstance;
				if(custom.IsNumeric(kwota) && kwota >0)
				{
					members.paidHarem(uid,kwota).then(function(result){
						userInstance = result;
						return harem.getAvailableSlave(userInstance);
					}).then(function(result){
						slaves = result;
						return membersStats.getMasazHajs(userInstance.uid, userInstance.zmeczenie,userInstance.zmeczenieMax);
					}).then(function(result){
						res.send({
							currentHajs: userInstance.hajs,
							masaz: result,
							slaves: slaves
						});
					});
				}
			break;
			case 'getMasage':
				var uid = custom.rcpd(this.uid);
				var userInstance;
				members.getOnlyInstance(uid).then(function(result){
					userInstance = result;
					return membersStats.getMasazHajs(userInstance.uid, userInstance.zmeczenie,userInstance.zmeczenieMax);
				}).then(function(result){
					if(userInstance.hajs >= result)
					{
						userInstance.zmeczenie = userInstance.zmeczenieMax;//dlatego tu by nie robic specjalnie metody pod to
						return members.removeHajsByInstance(userInstance, result);
					}
				}).then(function(result){
					res.send(true);
				});
			break;
		}
	}
	
	
}