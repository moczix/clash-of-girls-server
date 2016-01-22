sadomasoController = function()
{
	this.req;
	this.deviceID;
	this.uid;	
}


sadomasoController.prototype = {
	
	
	route: function(res)
	{
		switch(this.req.action)
		{
			case 'fuckWhore'://jeszcze harem!! by hajs zliczyl pierw!!!
				var uid = custom.rcpd(this.uid);
				var enemy = custom.rcpd(this.req.enemy);
				var ciag = ['bielizna','zabawki','kosmetyki','odziez','bizuteria','obuwie','dodatki'];
				var uidItems, enemyItems,uidSyndykatCount,enemySyndykatCount,uidLevel,enemyLevel,uidInstance,enemyInstance,finalResult,uidLogin,enemyLogin,enemyCountry,uidCountry,uidHarem,enemyHarem;
				//po zrobieniu ulepszania itemow zaktualizowoac funkcje getUsersItemsForSM
				var minZmeczenie = 5;
				members.downloadUserData("",uid).then(function(dane){//pobieramy dane!! 
					return members.downloadUserData("",enemy);//teraz pobieramy dane wroga
				}).then(function(dane){	
					return members.getSyndykatCountMembersForSM(minZmeczenie,uid,enemy,0);//zliczamy czlonkow syndykatu i zwracamy inne dane!!
				}).then(function(dane){
					uidSyndykatCount = dane.uid;
					enemySyndykatCount = dane.enemy;
					uidLevel = dane.uidLevel;
					enemyLevel = dane.enemyLevel;
					uidInstance = dane.uidInstance;
					enemyInstance = dane.enemyInstance;
					uidLogin = dane.uidLogin;
					enemyLogin = dane.enemyLogin;
					enemyCountry = dane.enemyCountry;
					uidCountry = dane.uidCountry;
					return membersItem.getUserItemsForSM(uid,uidLevel,ciag);//pobieramy itemy moje
				}).then(function(dane){
					uidItems = dane;
					return membersItem.getUserItemsForSM(enemy,enemyLevel,ciag)//pobieramy itemy wroga
				}).then(function(dane){
					enemyItems = dane;
					return membersHarem.getMemberStats(uid,ciag);
				}).then(function(dane){
					uidHarem = dane;
					return membersHarem.getMemberStats(enemy,ciag);
				}).then(function(dane){
					enemyHarem = dane;
					return members.wyruchajSadoMaso(uid,enemy,uidItems,enemyItems,uidSyndykatCount,enemySyndykatCount,uidLevel,enemyLevel,ciag,uidHarem,enemyHarem);
				}).then(function(result){
					finalResult = result;
					finalResult.initiator = uid;//ustawienie tego kto atakuje!
					finalResult.uidLogin = uidLogin;
					finalResult.enemyLogin = enemyLogin;
					finalResult.enemyCountry = enemyCountry;
					finalResult.uidCountry = uidCountry;
					finalResult.uidHarem = uidHarem;
					finalResult.enemyHarem = enemyHarem;
					return members.membersPVPGiveRewards(minZmeczenie,uidInstance,enemyInstance,finalResult);//NAGRODY!! 
				}).then(function(result){
					finalResult = result;
					return notifyRaports.sendSadoMasoRaports(uid,enemy, finalResult);//raport!!
				}).then(function(result){
					finalResult = result;
					return notifyRaports.setRead(finalResult.rapID,uid);
				}).then(function(result){
					finalResult.error = "";
					if(enemyInstance.pushSettings.sadomaso == 1)
					{
						var pushRes = (finalResult.winner == enemyInstance.uid)? 'Wygrana: ' : 'Przegrana: ';
						var pushRes2 = (finalResult.winner == enemyInstance.uid)? 'Nic nie straciłaś' : 'Zajebała ci: ['+finalResult.uidDetail.hajs.format(0, 3, ' ', ',')+'] hajsu';
						//uidDetail
						custom.push(enemyInstance.pushID, 'Klepanko '+uidLogin, pushRes+pushRes2);
					}
					res.send(finalResult);
				}).catch(function(err){//gdzies jakis blad! pewnie na poczatku!!
					res.send(err);
				});
			break;
			case 'sendComment'://wysylamy komentarz do raportu
				var rapID = this.req.raport;
				var uid = custom.rcpd(this.uid);
				var txt = this.req.txt;
				var raportInstance,newComments;
				
				notifyRaports.checkExist(rapID).then(function(result){//czy istnieje taki raport?
					raportInstance = result;
					return notifyComments.sendComment(rapID, uid, txt);//dodajemy komentarz!!
				}).then(function(result){
					newComments = result;
					return notifyRaports.extendExpired(raportInstance);//przedluzamy waznosc raportu moment komentarza + 3dni
				}).then(function(result){
					raportInstance = result;
					return notifyRaports.sendCommentsNotify(result, uid);// powiadomienie o komentarzu dla przeciwnika //zwraca przeciwnika!! 
				}).then(function(user){
					return members.userExist(custom.rcpc(user));
				}).then(function(userInstance){
					if(userInstance.detail.pushSettings.comments == 1)
					{
						var comments = newComments.txt.substring(0,25);
						var add = (comments.length >= 25)? '...': '';
						comments = comments+add;
						custom.push(userInstance.detail.pushID, 'Nowy Komentarz Klepanka',comments);
					}
					res.send(newComments);
				}).catch(function(err){
					console.log(err);
				});
			break;
			case 'getComments'://pobieramy komentarze w raporcie
				var rapID = this.req.raport;
				notifyComments.getComments(rapID,this.req.commLimit,this.req.commOffset).then(function(result){
					res.send(result);
				});
			break;
			case 'setRaportRead'://czytamy raport
				var rapID = this.req.raport;
				var uid = custom.rcpd(this.uid);
				notifyRaports.setRead(rapID,uid).then(function(result){
					resolve(true);
				});
			break;
			case 'getMyLiga':
				members.userExist(this.uid).then(function(result){
					if(result.exist == true)
					{
						return members.getMyRanking(result.detail);
					}
				}).then(function(result){
					res.send({
						nextReward: custom.secStrDay(setti.rankingNextRefresh-custom.time(),1),
						players: result
					});
				});
			break;
			case 'getRanking':
				var offset = this.req.rankingOffset;
				var limit = this.req.rankingLimit;
				var uid = custom.rcpd(this.req.user);
				members.getAllRanking(offset,limit,uid).then(function(result){
					res.send(result);
				});
			break;
			case 'getProfil':
				var profil = this.req.profil;
				var ciag = ['bielizna','zabawki','kosmetyki','odziez','bizuteria','obuwie','dodatki'];
				var userInstance;
				var syndykat;
				members.userExist(custom.rcpc(profil)).then(function(result){
					if(result.exist)
					{
						userInstance = result.detail;
						return members.getSyndykatCountMembersForSM(0,userInstance.uid, 0,2);
					}
				}).then(function(syndykatCount){
					syndykat = syndykatCount.syndykat;
					return membersItem.getAllItemsUser(userInstance,ciag,syndykatCount.count);
				}).then(function(result){
					res.send({
						user: userInstance,
						items: result.wearUp,
						syndykat: syndykat
					});
				});
			break;
		}
	}
	
	
}