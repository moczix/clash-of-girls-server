szafaController = function()
{
	this.req;
	this.deviceID;
	this.uid;	
}


szafaController.prototype = {
	
	
	route: function(res)
	{
		switch(this.req.action)
		{
			case 'getAllItems'://ITEMY W SM I RESZTA!!
				var ciag = ['bielizna','zabawki','kosmetyki','odziez','bizuteria','obuwie','dodatki'];
				var userInstance;
				members.userExist(this.uid).then(function(result){
					if(result.exist)
					{
						userInstance = result.detail;
						return members.getSyndykatCountMembersForSM(0,userInstance.uid, 0,1);
					}
				}).then(function(syndykatCount){
					return membersItem.getAllItemsUser(userInstance,ciag,syndykatCount);
				}).then(function(result){
					res.send(result);
				});
			break;
			case 'sellItem'://sprzedajemy item!!
				var uid = custom.rcpd(this.uid);
				var cena = 0;
				membersItem.sellItem(uid,this.req.item).then(function(result){
					cena = result;
					return members.addHajs(uid,cena);
				}).then(function(result){
					res.send('ok');
				});
			break;
			case 'upgradeItem':
				var userInstance;
				var method = this.req.method;
				var item = this.req.item;
				members.userExist(this.uid).then(function(result){
					if(result.exist)
					{
						userInstance = result.detail;
						if(method == 'hajs')
						{
							return membersItem.upgradeByHajs(userInstance,item);
						}
					}
				}).then(function(result){
					res.send(result);
				}).catch(function(err){
					res.send(err);
				});
			break;
			case 'sellOnAuction':
				var uid = custom.rcpd(this.uid);
				var itemInstance;
				var cena = this.req.cena;
				var item = this.req.item;
				if(custom.IsNumeric(cena)){
					membersItem.getInstance(item).then(function(result){
						itemInstance = result;
						if(itemInstance.uid == uid)
						{
							return sklepAuction.createSell(itemInstance,cena);
						}
					}).then(function(result){
						res.send(result);
					}).catch(function(err){
						res.send(err);
					});
				}
			break;
		}
	}
	
	
}