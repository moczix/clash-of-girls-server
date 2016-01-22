
module.exports = function(sequelize,Sequelize, DataTypes) {


return sequelize.define('latarnia', {
	locID: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	nazwa:       Sequelize.STRING,
	opis: Sequelize.STRING,
	level :Sequelize.INTEGER,
	icon: Sequelize.STRING
  },{
	createdAt: false,
	updatedAt: false,
    classMethods: {
      associate: function(models) {
        // define relationships here
		//latarnia.hasMany(models.latarniaClient);
      }, 
	  
	  
	  bestCurrentHajs: function(userInstance,find)//zwraca hajs z najlepszej dostepnej lokacji gdzie chcicaInvested == 0
	  {
		var latarnia = this;
		return new Promise(function(resolve, reject){
			if(find == true)
			{
				//console.log("utututut");
				latarnia.hasMany(latarniaClient, {foreignKey: 'locID'});
				latarniaClient.hasOne(latarniaClientLog,  {foreignKey: 'cmyid', as:'clients'});
			
				latarnia.findOne({ 
					where: {level : {$lte : userInstance.level}},
					include: [
								{ 	
									model: latarniaClient,
								}
							],
					order: [['level','DESC']]
				}).then(function(dane){
				//	console.log("finding!!");
					//console.log(dane.latarniaClients);
					var hajsMin = 0;
					var hajsMax = 0;
					
					async.each(dane.latarniaClients, function(client, callback) {
						if(client.chcicaNeed == 0)
						{
							if(client.hajsMax > hajsMax)
							{
								hajsMax = client.hajsMax;
								hajsMin = client.hajsMin;
							}						
						}
						callback();
					},function(err){
						if(!err)
						{
							//console.log("done!");
							resolve({
								hajsMax: hajsMax,
								hajsMin : hajsMin
							});	
						}
					});
				}, function(err){
					console.log(err);
				});
			}else resolve(true);
		});  
	  },
	  
	  getLocations: function(uid)
	  {
		return new Promise((function(resolve, reject){
			this.hasMany(latarniaClient, {foreignKey: 'locID'});
			this.hasOne(latarniaLog, {foreignKey: 'locID', as:'latLog'});
			latarniaClient.hasOne(latarniaClientLog,  {foreignKey: 'cmyid', as:'clients'});
		
			this.findAll({ 
				include: [
							{ 	
								model: latarniaClient,
								include: [
									{
										model: latarniaClientLog, as:'clients', where: { uid:uid },required: false
									}
								]
							},
							{ 	
								model: latarniaLog, as:'latLog', where: { uid:uid },required: false,
							}
						]
			}).then(function(dane){
				resolve(dane);
			}, function(err){
				console.log(err);
			});
		}).bind(this));
	  },
	  
	  
	  
	  fuckClient: function(locID,client,uid,chcica,userInstance,sloneczko) 
	  {
		  var latarnia = this;
			return new Promise(function(resolve, reject){
				latarnia.findById(locID).then(function(dataLatarnia){//czy istnieje taka lokacja
					if(dataLatarnia != null)
					{
						if(dataLatarnia.level <= userInstance.level || dataLatarnia.locID == 1000000)
						{
							latarniaLog.findOrCreate({where:{locID: locID, uid: uid},defaults: { }}).then(function(dataLatarniaLog){
								latarniaClient.findOne({where:{locID: locID, cmyid: client}}).then(function(dataClient){//czy istnieje taki klient
									var chcicaInvested = (dataLatarniaLog != null)? dataLatarniaLog[0].chcicaInvested : 0;
									if(isNaN(chcicaInvested)) chcicaInvested = 0;
									if(chcicaInvested >= dataClient.chcicaNeed)//czy mamy odpowiednia chcice zainwestowana
									{
										if(chcica >= dataClient.chcica)//czy mozemy ruchac?
										{		
											var hajs = custom.rand(dataClient.hajsMin, dataClient.hajsMax);
											var exp = dataClient.chcica;
											
											var syf = (userInstance.syf <= custom.time() && custom.syfEND(userInstance.syf) >= custom.time() && userInstance.syf > 0)? true : false;
											var okres = (userInstance.okres <= custom.time() && custom.okresEND(userInstance.okres) >= custom.time() && userInstance.okres > 0)? true : false;
											var ciaza = (userInstance.ciaza <= custom.time() && custom.ciazaEND(userInstance.ciaza) >= custom.time() && userInstance.ciaza > 0)? true : false;
											
											
											var OCS = (syf || okres || ciaza || sloneczko)? true : false;
											var OCSFIND = (dataClient.cmyid == 1000000 || dataClient.cmyid == 1000001 || dataClient.cmyid == 1000002 || dataClient.cmyid == 1000003)? true: false;
											latarnia.bestCurrentHajs(userInstance,OCSFIND).then(function(besti){
											if(OCS)
											{
												switch(dataClient.cmyid)
												{
													case 1000000://syf!!!
														if(syf)
														{
															hajs = custom.rand(besti.hajsMin, besti.hajsMax);
															exp *= 1.1;
															hajs *= 1.1;
														}
													break;
													case 1000001://okres
														if(okres)
														{
															hajs = custom.rand(besti.hajsMin, besti.hajsMax);
															exp *= 1.4;
															hajs *= 1.4;
														}
													break;
													case 1000002://ciaza
														if(ciaza)
														{
															hajs = custom.rand(besti.hajsMin, besti.hajsMax);
															exp *= 1.5;
															hajs *= 1.5;
														}
													break;
													case 1000003://orgia
														if(sloneczko)
														{
															hajs = custom.rand(besti.hajsMin, besti.hajsMax);
															exp *= 1.3;
															hajs *= 1.3;
														}
													break;	
												}
												hajs = parseInt(hajs);
												exp = parseInt(exp);
											}
											
											userInstance.chcica = 	chcica-dataClient.chcica;
											userInstance.chcicaStamp = custom.time();
											userInstance.exp = userInstance.exp + exp;
											userInstance.hajs = userInstance.hajs+ hajs;
											userInstance.currentLocation = locID;
											
											
											var newExp = custom.findNextLevel(userInstance.level);
											var newLevel = userInstance.level;
											var pointsToAdd = userInstance.pointsToAdd;
											var levelUP = false;
											var levelUPPoints = 0;

												dataLatarniaLog[0].chcicaInvested = chcicaInvested + dataClient.chcica;
													//teraz procent!!
													latarniaClientLog.sum('procent', { where: { uid: uid, locID: locID } }).then(function(locationProcent) {//sumowanie procentow w lokacji! na kazda lokacje 10klientow!!
														latarniaClientLog.findOrCreate({where: {uid: uid, cmyid:dataClient.cmyid }, defaults: {}}).then(function(dataClientLog){//pobieramy log clienta
															var procent = (dataClientLog != null)? dataClientLog[0].procent : 0;
															var been = (dataClientLog != null)? dataClientLog[0].been : 0;
															if(isNaN(procent)) procent = 0;
															if(isNaN(been)) been = 0;
															been++;
															procent += dataClient.procent;
															if(procent > 100) procent = 100;
															
															if(dataClientLog[0].procent != 100 && procent == 100)//jesli klient przekroczyl 100% to bonus
															{
																userInstance.exp = userInstance.exp + exp;
																userInstance.hajs = userInstance.hajs+ hajs;	
																exp += exp;
																hajs += hajs;
															}
															if(userInstance.exp >= newExp)//nowy level? //TO SAMO JEST W members.model w funkcji membersPVPGiveRewards
															{
																userInstance.chcica = userInstance.chcicaMax;
																userInstance.wpierdol = userInstance.wpierdolMax;
																userInstance.zmeczenie = userInstance.zmeczenieMax;
																userInstance.level += 1;
																levelUP = true;
																if(userInstance.level < 10)
																{
																	levelUPPoints = 10;
																}
																else
																{
																	levelUPPoints = 5;
																}
																userInstance.pointsToAdd += levelUPPoints;
																userInstance.allPointsAdd += levelUPPoints;
															}
															
															bonusInfo = "";
															if(custom.rand(0,100) <= 3 && custom.syfEND(userInstance.syf) <= custom.time())//SYF!!
															{
																bonusInfo = "Zaraziłaś się syfem!";
																userInstance.syf = custom.time();
															}
															if(custom.rand(0,100) <= 1 && custom.ciazaEND(userInstance.ciaza) <= custom.time())//ciaza
															{
																userInstance.ciaza = custom.time();
																bonusInfo = "Zaszłaś w ciążę!";
															}
															
															dataClientLog[0].procent = procent;
															dataClientLog[0].locID = locID;
															dataClientLog[0].been = been;
															
															var newLocationProcent = locationProcent + dataClient.procent;
															if(newLocationProcent > 1000) newLocationProcent = 1000;
															var updatClientLog = false;
															if(locationProcent != 1000 && newLocationProcent == 1000)//jesli lokacja przekroczyla 1000 czyli wszyscy klienci 100%
															{
																if(dataLatarniaLog[0].locLevel < 100)//maksymalny poziom lokacji to 100
																{
																	dataLatarniaLog[0].haremProcent += 1.5;	
																	dataLatarniaLog[0].locLevel += 1;	
																	updatClientLog = true;
																	//LEVEL UP!!
																	if(dataLatarniaLog[0].locLevel <= 10)
																	{
																		userInstance.pointsToAdd += 3;
																		userInstance.allPointsAdd += 3;
																		bonusInfo = "Otrzymałaś 3pkt do rozdania!"
																	}	
																}															
															}	

															userInstance.stats.clients += 1;
															userInstance.stats.save().then(function(){//dodanie statu clients
																dataLatarniaLog[0].save().then(function(){//zapisz latarniaLog
																	dataClientLog[0].save().then(function(){//zapis latarniaClientLog
																		userInstance.save().then(function(){//zapisujemy usera members	
																			if(updatClientLog)//jesli wszyscy klienci 100% to reset i od nowa
																			{
																				latarniaClientLog.update({
																					procent:0
																				},{
																					where:{uid:uid, locID: locID}
																				}).then(function(){});
																			}
																			items1.losujItem(uid, locID, dataClient.item,0).then(function(item){
																				resolve({
																					hajs: hajs,
																					exp: exp,
																					procent: procent,
																					item: item.item,
																					levelUP: levelUP,
																					levelPoints: levelUPPoints,
																					bonusInfo : bonusInfo,
																					chcicaInvested: dataLatarniaLog[0].chcicaInvested
																				});
																			});
																		});
																	}, function(err){
																		console.log(err);
																	});
																});
															});
														});
													});
											


											});
										}
									}
								});
							});
						}
					}
				});
			}); 
		}
	  
	}
	  
    
  });

}
