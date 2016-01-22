kurwisklepController = function()
{
	this.req;
	this.deviceID;
	this.uid;	
}


kurwisklepController.prototype = {
	
	
	route: function(res)
	{
		switch(this.req.action)
		{
			case 'getSellItems':
				
				tempSklep.getItemsFromRange(this.req.range).then(function(result){
					res.send({
						sales: result,
						nextRechange: custom.secStrDay(setti.sklepNextRefresh-custom.time(),0)
					});
				});
			break;
			case 'buyTempItem':
				var sitemID = this.req.item;
				members.userExist(this.uid).then(function(userInstance){
					if(userInstance.exist == true)
					{
						return tempSklep.buyItem(userInstance.detail, sitemID);
					}
				}).then(function(result){
					res.send(result);
				}).catch(function(err){
					res.send(err);
				});
			break;
			case 'getTargItem':
				var uid = custom.rcpd(this.uid);
				sklepAuction.getAll(uid).then(function(result){
					res.send(result);
				});
			break;
			case 'changeCost':
				var uid = custom.rcpd(this.uid);
				var cena = this.req.cena;
				var auctionID = this.req.item;
				sklepAuction.changeMyCostSale(uid, cena, auctionID).then(function(result){
					res.send(result);
				});
			break;
			case 'buyFromTarg':
				var uid = custom.rcpd(this.uid);
				var auctionID = this.req.item;
				var nazwa = this.req.itemNazwa;
				var send ;
				var uidSettings;
				members.userExist(this.uid).then(function(userInstance){
					if(userInstance.exist == true)
					{
						return sklepAuction.buyItem(userInstance.detail, auctionID);
					}
				}).then(function(result){
					send = result.error;
					uidSettings = result.settings;
					sellerUid = result.seller;
					return notifyRaports.sendSimpleNotify(result.seller.uid, "Sprzedałaś Przedmiot");
				}).then(function(result){
					if(uidSettings.sellItem == 1)
					{
						custom.push(sellerUid.pushID, nazwa, 'Sprzedałaś Item');
					}
					res.send({error:send});
				}).catch(function(err){
					res.send(err);
				});
			break;
		}
	}
	
	
}