syndykatController = function()
{
	this.req;
	this.deviceID;
	this.uid;	
}


syndykatController.prototype = {
	
	
	route: function(res)
	{
		switch(this.req.action)
		{
			case 'createNew'://tworzenie nowego syndykatu
				try
				{
					var uid = this.uid;
					if(this.req.nazwa != ""  && this.req.skrot != "")
					{
						syndykat.createNewSyndykat(this.req.nazwa, this.req.skrot,uid).then(function(result){
							return members.setSyndykat(result.syndykatID,uid);
						}).catch(function(err){
							res.send(err);
						}).then(function(syndykatID){
							res.send({error:"", syndykat: custom.rcpc(syndykatID)});
						});
					}
				}
				catch(err){custom.dumpError(err);}
			break;
			case 'sendApplication'://wysylanie podania
				try
				{
					var uid = this.uid;
					if(this.req.syndykat != "")
					{
						var syndykatID = this.req.syndykat;
						syndykat.exist(syndykatID).then(function(result)//czy istnieje taki syndykat?
						{
							return syndykatApplication.sendApplication(syndykatID, uid);//wysylka apliakcji
						}).then(function(result){
							return syndykatApplication.getMyApplication(uid);
						}).then(function(result){//syndykatApplication.getMyApplication(uid);
							res.send(result);
						}).catch(function(error){
							res.send(error);
						})
					}					
				}
				catch(err){custom.dumpError(err);}
			break;
			case 'getMyApplication'://pobieranie moich podan
				syndykatApplication.getMyApplication(this.uid).then(function(result){
					res.send(result);
				});
			break;
			case 'cancellApplication'://anulowanie mojego podania
				syndykatApplication.deleteMyApplication(this.uid, this.req.application).then(function(result){
					res.send(true);
				});
			break;
			case 'getMembers':
				var syndykatID = this.req.syndykat;
				syndykat.getMembers(syndykatID).then(function(result){
					res.send(result);
				});
			break;
			case 'kickMember':
				var syndykatID = this.req.syndykat;
				syndykat.kickFromSyndykat(syndykatID,this.req.kick, this.uid).then(function(result){
					return syndykat.getMembers(syndykatID);
				}).then(function(result){
					res.send(result);
				});
			break;
			case 'getApplicationAndSettings':
				var syndykatID = this.req.syndykat;
				syndykat.getInfoAndApplication(syndykatID).then(function(result){
					res.send(result);
				});
			break;
			case 'acceptApp':
				var syndykatID = this.req.syndykat;
				var uid = custom.rcpd(this.uid);
				var userPushSettings;
				syndykat.getInstanceAppIfOwner(syndykatID,uid,this.req.app).then(function(result){
					userPushSettings = result.application[0].player;
					return syndykat.acceptApplication(result);
				}).then(function(result){
					if(userPushSettings.pushSettings.applicationAccepted == 1)
					{
						custom.push(userPushSettings.pushID, 'Syndykat', 'Zostałaś przyjęta');
					}
					res.send(result);
				}).catch(function(err){
					res.send(err);
				});
			break;
			case 'deniedApp':
				var syndykatID = this.req.syndykat;
				var uid = custom.rcpd(this.uid);
				syndykat.getInstanceAppIfOwner(syndykatID,uid,this.req.app).then(function(result){
					return syndykat.deniedApplication(result);
				}).then(function(result){
					res.send(result);
				}).catch(function(err){
					res.send(err);
				});
			break;
			case 'saveSettings':
				var syndykatID = this.req.syndykat;
				var uid = custom.rcpd(this.uid);
				var nazwa = this.req.nazwa;
				var skrot = this.req.skrot;
				syndykat.saveSettings(syndykatID, nazwa, skrot, uid).then(function(result){
					res.send(result);
				}).catch(function(error){
					res.send(error);
				});		
			break;
			case 'leave':
				var syndykatID = this.req.syndykat;
				var uid = custom.rcpd(this.uid);
				syndykat.leave(syndykatID,uid).then(function(result){
					res.send(result);
				});
			break;
			case 'destroy':
				var syndykatID = this.req.syndykat;
				var uid = custom.rcpd(this.uid);
				syndykat.QuitAndDestroy(syndykatID,uid).then(function(result){
					res.send(result);
				});
			break;
		}
	}
	
	
}