sloneczkoController = function()
{
	this.req;
	this.deviceID;
	this.uid;	
}


sloneczkoController.prototype = {
	
	
	route: function(res)
	{
		switch(this.req.action)
		{
			case 'createNew'://tworzenie nowego sloneczkou
				try
				{
					var uid = this.uid;
						sloneczko.createNewSloneczko(uid).then(function(result){
							return members.setSloneczko(result.sloneczkoID,uid);
						}).then(function(sloneczkoID){
							res.send({error:"", sloneczko: custom.rcpc(sloneczkoID)});
						}).catch(function(err){
							res.send(err);
						});
				}
				catch(err){custom.dumpError(err);}
			break;
			case 'sendApplication'://wysylanie podania
				try
				{
					var uid = this.uid;
					if(this.req.sloneczko != "")
					{
						var sloneczkoID = this.req.sloneczko;
						sloneczko.exist(sloneczkoID).then(function(result)//czy istnieje taki sloneczko?
						{
							return sloneczkoApplication.sendApplication(sloneczkoID, uid);//wysylka apliakcji
						}).then(function(result){
							return sloneczkoApplication.getMyApplication(uid);
						}).then(function(result){//sloneczkoApplication.getMyApplication(uid);
							res.send(result);
						}).catch(function(error){
							res.send(error);
						})
					}					
				}
				catch(err){custom.dumpError(err);}
			break;
			case 'getMyApplication'://pobieranie moich podan
				sloneczkoApplication.getMyApplication(this.uid).then(function(result){
					res.send(result);
				});
			break;
			case 'cancellApplication'://anulowanie mojego podania
				sloneczkoApplication.deleteMyApplication(this.uid, this.req.application).then(function(result){
					res.send(true);
				});
			break;
			case 'getMembers':
				var sloneczkoID = this.req.sloneczko;
				sloneczko.getMembers(sloneczkoID).then(function(result){
					res.send(result);
				});
			break;
			case 'kickMember':
				var sloneczkoID = this.req.sloneczko;
				sloneczko.kickFromsloneczko(sloneczkoID,this.req.kick, this.uid).then(function(result){
					return sloneczko.getMembers(sloneczkoID);
				}).then(function(result){
					res.send(result);
				});
			break;
			case 'getApplicationAndSettings':
				var sloneczkoID = this.req.sloneczko;
				sloneczko.getInfoAndApplication(sloneczkoID).then(function(result){
					var time = custom.timeConverter(custom.time());
					var currentH = parseInt(time.H)+1;
					time = time.H+':'+time.i;
					var seted = (custom.sloneczkoEND(result.sloneczkoStamp) > custom.time()) ? true: false;
					res.send({
						dane: result,
						time:time,
						currentH: currentH,
						timestr: custom.timeStr(result.sloneczkoStamp),
						seted:seted
					});
				});
			break;
			case 'acceptApp':
				var sloneczkoID = this.req.sloneczko;
				var uid = custom.rcpd(this.uid);
				var userPushSettings;
				sloneczko.getInstanceAppIfOwner(sloneczkoID,uid,this.req.app).then(function(result){
					userPushSettings = result.application[0].player;
					return sloneczko.acceptApplication(result);
				}).then(function(result){
					res.send(result);
				}).catch(function(err){
					res.send(err);
				});
			break;
			case 'deniedApp':
				var sloneczkoID = this.req.sloneczko;
				var uid = custom.rcpd(this.uid);
				sloneczko.getInstanceAppIfOwner(sloneczkoID,uid,this.req.app).then(function(result){
					return sloneczko.deniedApplication(result);
				}).then(function(result){
					res.send(result);
				}).catch(function(err){
					res.send(err);
				});
			break;
			case 'leave':
				var sloneczkoID = this.req.sloneczko;
				var uid = custom.rcpd(this.uid);
				sloneczko.leave(sloneczkoID,uid).then(function(result){
					res.send(result);
				}).catch(function(err){
					res.send(err);
				});
			break;
			case 'destroy':
				var sloneczkoID = this.req.sloneczko;
				var uid = custom.rcpd(this.uid);
				sloneczko.QuitAndDestroy(sloneczkoID,uid).then(function(result){
					res.send(result);
				}).catch(function(err){
					res.send(err);
				});
			break;
			case 'setSloneczkoTime':
				var sloneczkoID = this.req.sloneczko;
				var uid = custom.rcpd(this.uid);
				var godzina = this.req.godzina;
				sloneczko.setGodzina(sloneczkoID,uid,godzina).then(function(result){
					res.send(result);
				}).catch(function(err){
					res.send(err);
				});
			break;
		}
	}
	
	
}