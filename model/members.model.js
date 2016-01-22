
module.exports = function(sequelize,Sequelize, DataTypes) {
	

return sequelize.define('members', {
	uid: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	deviceID:       Sequelize.STRING,
	pushID	:		Sequelize.STRING,
	login: Sequelize.STRING,
	email :Sequelize.STRING,
	password: Sequelize.STRING,
	country: Sequelize.STRING,
	language : Sequelize.STRING,
	logedAt:Sequelize.INTEGER,
	level: Sequelize.INTEGER,
	exp: Sequelize.INTEGER,
	premium: Sequelize.INTEGER,
	hajs: Sequelize.INTEGER,
	bilansSM: Sequelize.INTEGER,
	SMpkt	:Sequelize.INTEGER,
	liga	:Sequelize.INTEGER,
	wpierdol: Sequelize.INTEGER,
	wpierdolMax: Sequelize.INTEGER,
	wpierdolStamp: Sequelize.INTEGER,
	chcica: Sequelize.INTEGER,
	chcicaMax: Sequelize.INTEGER,
	chcicaStamp: Sequelize.INTEGER,
	zmeczenie: Sequelize.INTEGER,
	zmeczenieMax: Sequelize.INTEGER,
	zmeczenieStamp: Sequelize.INTEGER,
	klepanko: Sequelize.INTEGER,
	pointsToAdd: Sequelize.INTEGER,
	allPointsAdd: Sequelize.INTEGER,
	currentLocation: Sequelize.INTEGER,
	syndykatID: Sequelize.INTEGER,
	sloneczkoID: Sequelize.INTEGER,
	registeredAt: Sequelize.INTEGER,
	syf: Sequelize.INTEGER,
	okres: Sequelize.INTEGER,
	ciaza: Sequelize.INTEGER,
	haremHajs: 	Sequelize.INTEGER,
  },{
	createdAt: false,
	updatedAt: false,
    classMethods: {
      associate: function(models) {
        // define relationships here
      },
	  
	  
	
	  
	payHarem: function(uid, kwota)
	{
		var members = this;
		kwota = parseInt(kwota);
		return new Promise(function(resolve, reject){
			members.findById(uid).then(function(instance){
				if(kwota > instance.hajs) kwota = instance.hajs;
				instance.haremHajs = parseInt(instance.haremHajs) + parseInt(kwota*0.9);
				instance.hajs = parseInt(instance.hajs) - kwota;
				instance.save().then(function(result){
					resolve(result);
				});
			});
		});
	},	
	 
	paidHarem: function(uid, kwota)
	{
		var members = this;
		kwota = parseInt(kwota);
		return new Promise(function(resolve, reject){
			members.findById(uid).then(function(instance){
				if(kwota > instance.haremHajs) kwota = parseInt(instance.haremHajs);
				instance.haremHajs = parseInt(instance.haremHajs) -kwota;
				instance.hajs = parseInt(instance.hajs) + kwota;
				instance.save().then(function(result){
					resolve(result);
				});
			});
		});
	},	
	
	
	removeHajsByInstance: function(instance, kwota)
	{
		var members = this;
		return new Promise(function(resolve, reject){
			instance.hajs = instance.hajs - kwota;
			if(instance.hajs <0 ) instance.hajs = 0;
			instance.save().then(function(result){
				resolve(result);
			});
		});
	},
	
	removeHajs: function(uid, kwota)
	{
		var members = this;
		return new Promise(function(resolve, reject){
			members.findById(uid).then(function(instance){
				instance.hajs = instance.hajs - kwota;
				if(instance.hajs <0 ) instance.hajs = 0;
				instance.save().then(function(result){
					resolve(result);
				});
			});
		});
	},
	  
	addHajs: function(uid,kwota)
	{
		var members = this;
		return new Promise(function(resolve, reject){
			members.findById(uid).then(function(instance){
				instance.hajs = instance.hajs + kwota;
				instance.save().then(function(result){
					resolve(result);
				});
			});
		});
	},	
	  
	getInfoForSocket: function(user)
	{
		var members = this;
		return new Promise(function(resolve, reject){
			members.findOne({
				where:{uid: custom.rcpd(user)},
				attributes:['uid','login','country']
			}).then(function(result){
				resolve(result.toJSON());
			});
		});		
	},
	  
	  
	getAllRanking: function(offset,limit,uid)  
	{
		var members = this;
		return new Promise(function(resolve, reject){
			var offset = 0;
			members.findAll({
				order: [
					['SMpkt','DESC']
				]
			}).then(function(dane){
				for(var i =0; i < dane.length; ++i)
				{
					if(dane[i].uid == uid)
					{
						offset = i;
						break;
					}					
				}
				offset = parseInt(i / limit);
				offset *= limit;
					syndykat.hasMany(members, {foreignKey: 'syndykatID', as: 'dziwki'});
					members.findAll({
						attributes: ['login',['uid','user'], 'level',['SMpkt','pkt'],'hajs','syndykatID','country'],
						include: [
							{
								model: syndykat,required:false,attributes:['syndykatID','skrot'],
							}
						],
						order: [
							['SMpkt','DESC']
						],
						offset:offset,
						limit: limit
					}).then(function(result){
						resolve({
							player: result,
							offset: offset
						});
					});
			});
		});	
	},
	  
	  
	  
	getMyRanking: function(userInstance)
	{
		var members = this;
		return new Promise(function(resolve, reject){
			members.belongsTo(syndykat, {foreignKey:'syndykatID' });
			syndykat.hasMany(members, {foreignKey: 'syndykatID', as: 'dziwki'});
			members.findAll({
				attributes: ['login',['uid','user'], 'level','bilansSM','hajs','country'],
				where:{
					liga: userInstance.liga
				},
				include: [
					{
						model: syndykat,required:false,attributes:['syndykatID'],
						include: [
							{
								model : members, as:'dziwki', required:false, attributes: ['login']
							}
						]
					}
				],
				order: [
					['bilansSM','DESC']
				]
			}).then(function(result){
				resolve(result);
			});
		});
	},	
	  
	  
	  
	  wyruchajSadoMaso: function(uidInstance,enemyInstance,uidItems,enemyItems,uidSyndykatCount,enemySyndykatCount,uidLevel,enemyLevel,ciag,uidHarem,enemyHarem){
		var members = this;
		return new Promise(function(resolve, reject){
							//trzeba posumowac itemy do skilli!
				//Limit przedmiotow ustalamy na level * 5 lub ilosc czlonkow syndykatu wybieramy wartosc mniejsza!!
				uidLimits = (uidLevel * 5 > uidSyndykatCount)? uidSyndykatCount : uidLevel * 5;
				enemyLimits = (enemyLevel * 5 > enemySyndykatCount)? enemySyndykatCount : enemyLevel * 5;
				uidLimits++;//dodajemy siebie!!
				enemyLimits++;
				
				var uidStatsFight = {};
				var enemyStatsFight = {};
				
				var uidItemsInFight = [];
				var enemyItemsInFight = [];
				var rundyResult = [];
				var uidPoints = 0;
				var enemyPoints = 0;
				
				async.series([
					function(callback){
						async.each(ciag, function(cc, callbackInner1){
							var uidLocalLimit = (uidLimits > uidItems[cc].length)? uidItems[cc].length : uidLimits;
							var enemyLocalLimit = (enemyLimits > enemyItems[cc].length)? enemyItems[cc].length : enemyLimits;
							async.series([
								function(callbackInnerInner1){
									var limiter = 0;
									uidStatsFight[cc] = uidInstance.klepanko * 10;//wartosc jednego punkta to 10
									async.each(uidItems[cc], function(its, callbackInner2){
										if(limiter < uidLocalLimit)
										{
											uidStatsFight[cc] += its.val;
											uidItemsInFight.push(its);
										}
										++limiter;
										callbackInner2();
									},function(doneInner2){
										callbackInnerInner1();
									});
								},
								function(callbackInnerInner2){
									var limiter = 0;
									enemyStatsFight[cc] = enemyInstance.klepanko * 10;
									async.each(enemyItems[cc], function(itz, callbackInner3){
										if(limiter < enemyLocalLimit)
										{
											enemyStatsFight[cc] += itz.val;
											enemyItemsInFight.push(itz);
										}
										limiter++;
										callbackInner3();
									},function(doneInner3){
										callbackInnerInner2();
									});
								}
							],function(err, doneInner){
								callbackInner1();
							});
						},function(done){
							callback();
						});
					},
					function(callback){//zliczanie haremu
						async.each(ciag, function(cc, callbackInner){
							uidStatsFight[cc] += uidHarem[cc];
							enemyStatsFight[cc] += enemyHarem[cc];
							callbackInner();
						},function(done){
							callback();
						});
					},
					function(callback){
						async.each(ciag, function(cc, callbackInner){
							if(uidStatsFight[cc] > enemyStatsFight[cc])
							{
								rundyResult.push({
									winner: uidInstance.uid,
									skill: cc,
									uidVal: uidStatsFight[cc],
									enemyVal: enemyStatsFight[cc]
								});
							}
							if(uidStatsFight[cc] == enemyStatsFight[cc])
							{
								rundyResult.push({
									winner: 0,
									skill: cc,
									uidVal: uidStatsFight[cc],
									enemyVal: enemyStatsFight[cc]
								});
							}
							if(uidStatsFight[cc] < enemyStatsFight[cc])
							{
								rundyResult.push({
									winner: enemyInstance.uid,
									skill: cc,
									uidVal: uidStatsFight[cc],
									enemyVal: enemyStatsFight[cc]
								});
							}
							callbackInner();
						},function(done){
							callback();
						});
					},
					function(callback){
						async.each(rundyResult, function(rr, callbackInner){
							uidPoints += (rr.winner == uidInstance.uid)? 1 :0;
							enemyPoints += (rr.winner == enemyInstance.uid)? 1 :0;
							callbackInner();
						},function(done){
							callback();
						});	
					}
				],function(err, result){
					var finalWinner = 0;
					if(uidPoints != enemyPoints)
					{
						finalWinner = (uidPoints > enemyPoints)? uidInstance.uid : enemyInstance.uid;
					}
					resolve({
						winner: finalWinner,
						uidPoints: uidPoints,
						enemyPoints: enemyPoints,
						uidItemsInFight: uidItemsInFight,
						enemyItemsInFight: enemyItemsInFight,
						fightDetails: rundyResult	
					});
				});
		}); 
	  },
	  
	membersPVPGiveRewards: function(minZmeczenie,uidInstance,enemyInstance,raport)
	{
		var members = this;
		return new Promise(function(resolve, reject){
			var addExp = 3;
			var timestamp = custom.time();
			var earnMoney = 0;
			
			uidInstance.zmeczenie -= (minZmeczenie + raport.enemyPoints);//zmneczenie obnizenie!
			if(uidInstance.zmeczenie < 0) uidInstance.zmeczenie = 0;
			uidInstance.zmeczenieStamp = timestamp;
			
			enemyInstance.zmeczenie -= (minZmeczenie + raport.uidPoints);//zmeczenie obnizenie!
			if(enemyInstance.zmeczenie <0) enemyInstance.zmeczenie = 0;
			enemyInstance.zmeczenieStamp = timestamp;	

			uidInstance.wpierdol -= 1;//wpierdol minus 1
			uidInstance.wpierdolStamp = timestamp;
			uidInstance.membersStat.pvpAll += 1;
			var item = 0;
			if(raport.winner == uidInstance.uid)//jesli ja wygrywam
			{
				uidInstance.membersStat.pvpWin += 1;
				uidInstance.exp += addExp;//dodajemy expa
				earnMoney = parseInt(enemyInstance.hajs * 0.1);//i hajs dodajemy i odejmujemy od przegranego
				uidInstance.hajs += earnMoney;
				enemyInstance.hajs -= earnMoney;
				uidInstance.bilansSM += earnMoney;
				enemyInstance.bilansSM -= earnMoney;
				
				uidInstance.SMpkt += 2;
				enemyInstance.SMpkt -= 1;
				item = 1;
				
				var newExp = custom.findNextLevel(uidInstance.level);
				var levelUPPoints = 0;
				if(uidInstance.exp >= newExp)//nowy level? //TO SAMO JEST W LATARNIA.MODEL W  funckji fuckClient
				{
					uidInstance.chcica = uidInstance.chcicaMax;
					uidInstance.wpierdol = uidInstance.wpierdolMax;
					uidInstance.zmeczenie = uidInstance.zmeczenieMax;
					uidInstance.level += 1;
					if(uidInstance.level < 10)
					{
						levelUPPoints = 10;
					}
					else
					{
						levelUPPoints = 5;
					}
					uidInstance.pointsToAdd += levelUPPoints;
					uidInstance.allPointsAdd += levelUPPoints;
				}
				
				//szansa na item!!
			}
			else
			{
				addExp = 0;
			}
			items1.losujItem(uidInstance.uid, 0, item, 1).then(function(item){
				uidInstance.save().then(function(){
					enemyInstance.save().then(function(){
						uidInstance.membersStat.save().then(function(){
							raport.uidDetail = {
								uid: uidInstance.uid,
								exp: addExp,
								hajs: earnMoney,
								item: item.item,
								zmeczenie: (minZmeczenie + raport.enemyPoints)
							}
							
							resolve(raport);
						});
					});
				});
			});
		});
	},
	
	
	  
	 getSyndykatCountMembersForSM: function(minZmeczenie,uid, enemy,onlyMe){
		var members = this;
		return new Promise(function(resolve, reject){

			members.hasOne(membersStats, {foreignKey: 'uid'});
			members.belongsTo(syndykat, {foreignKey: 'syndykatID'});
			members.hasOne(membersPushSettings, {foreignKey: 'uid', as: 'pushSettings'});
			syndykat.hasMany(members, {foreignKey: 'syndykatID'});
			members.findAll({
				where: {
					$or: [{uid:uid},{uid:enemy}]
				},
				include: [
					{
						model: syndykat,
						include: [
							{
								model:members, attributes: ['uid']
							}						
						]
					},
					{
						model: membersPushSettings, as: 'pushSettings', required:false
					},
					{
						model: membersStats, required:false
					}
				]
				
			}).then(function(dane){
				
				var meInt = (dane[0].uid == uid)? 0 : 1;
				var heInt = (meInt == 0)? 1 : 0 ;
				var meCount = 0;
				var heCount = 0;
				try
				{
					meCount = dane[meInt]['syndykat']['members'].length-1;//minus 1 bo MNIE nie bierzemy pod uwage
				}catch(err){
					meCount =0;
				};
				
				if(onlyMe == 0)
				{
					try
					{
						heCount = dane[heInt]['syndykat']['members'].length-1;//minus 1 bo WROGA nie bierzemy pod uwage
					}catch(err){
						heCount =0;
					};
					
					if(dane[meInt].wpierdol > 0)
					{
						if(dane[meInt].zmeczenie >= minZmeczenie+7)
						{
							if(dane[heInt].zmeczenie >= minZmeczenie+7)
							{
								var result = {
									uid: meCount,
									enemy: heCount,
									uidLevel: dane[meInt].level,
									uidCountry: dane[meInt].country,
									enemyCountry:dane[heInt].country,
									enemyLevel: dane[heInt].level,
									uidInstance: dane[meInt],
									enemyInstance: dane[heInt],
									uidLogin: dane[meInt].login,
									enemyLogin: dane[heInt].login
								}
								resolve(result);			
							}else reject({
								error: "Ta suka jest zbyt zmęczona by ją ruchać!"
							});					
						}else reject({
							error: "Jesteś zbyt zmęczona! musisz sie zregenerować!"	
						});
					}else reject({
						error: "Skończył ci się wpierdol!!"
					});	
				}
				else//pobor liczby w syndykacie tylko dla mnie!
				{
					if(onlyMe == 1)//tylko liczba
					{
						resolve(meCount);
					}
					else//zwraca syndykat
					{
						resolve({
							count: meCount,
							syndykat: dane[meInt]['syndykat']
						});
					}
				}
			},function(err){console.log(err)})
		});  
	  },
	 

	  setSloneczko: function(sloneczkoID, uid){
		  var members = this;
		  return new Promise(function(resolve, reject){
			  members.findById(custom.rcpd(uid)).then(function(instance){
				  instance.sloneczkoID = sloneczkoID;
				  instance.save().then(function(){
					  resolve(sloneczkoID);
				  });
			  });
		  });
	  },
	  
	  setSyndykat: function(syndykatID, uid){
		  var members = this;
		  return new Promise(function(resolve, reject){
			  members.findById(custom.rcpd(uid)).then(function(instance){
				  instance.syndykatID = syndykatID;
				  instance.save().then(function(){
					  resolve(syndykatID);
				  });
			  });
		  });
	  },
	  
	  
	  addSkill: function(uid, skill)
	  {
		  var members = this;
		  return new Promise(function(resolve, reject){
			  var skillsArray = ['wpierdol','chcica','zmeczenie','kosmetyki','odziez','bizuteria','obuwie','dodatki','bielizna','zabawki'];
			  if(skillsArray.indexOf(skill) != -1)
			  {
				members.findById(custom.rcpd(uid)).then(function(pkt){
					 if(pkt.pointsToAdd > 0)
					 {
						 if(skill != 'wpierdol' && skill != 'chcica' && skill != 'zmeczenie')
						 {
							membersPVPSkill.findById(custom.rcpd(uid)).then(function(pvp){
								pvp[skill] += 1;
								pvp.save().then(function(){
									pkt.pointsToAdd -= 1;
									pkt.save().then(function(){
										resolve(true);
									});
								});
							});							
						 }
						 else
						 {
							if(skill != "zmeczenie")
							{
								pkt[skill+'Max'] += 1;
								pkt[skill] += 1;
							}
							else
							{
								pkt[skill+'Max'] += 10;
								pkt[skill] += 10;	
							}
							pkt.pointsToAdd -= 1;
							pkt.save().then(function(){
								resolve(true);
							});
						 }						 
					 }
				 });
			  }
		  });		  
	  },
	  
	  getUserSkills: function(uid)
	  {
		var members = this;
		return new Promise(function(resolve, reject){
			members.hasOne(membersStats, {foreignKey: 'uid', as:'stats'});
			members.hasOne(membersPVPSkill, {foreignKey: 'uid', as:'skillspvp'});
			members.findOne({
				attributes: ['wpierdolMax','chcicaMax','zmeczenieMax','pointsToAdd','bilansSM'],
				where: {uid: custom.rcpd(uid)},
				include: [
					{
						model: membersPVPSkill, as: 'skillspvp'
					},
					{
						model: membersStats, as: 'stats'
					}
				]
			}).then(function(dane){
				resolve(dane);
			});
		}); 
	  },
	  
	  
	  getOnlyInstance: function(uid)
	  {
		var members = this; 
		return new Promise(function(resolve, reject){
			members.findById(uid).then(function(result){
				resolve(result);
			});			
		});		  
	  },
	  
	  userExist: function(uid)
	  {
		var members = this;
			var user = custom.rcpd(uid);
		//	if(user < 1) user = uid;
		  return new Promise(function(resolve, reject){
			members.hasOne(membersPushSettings, {foreignKey: 'uid', as: 'pushSettings'});
			members.hasOne(membersStats, {foreignKey: 'uid', as: 'stats'});
			members.findOne({
				where: {uid: user},
				include: [
					{
						model: membersPushSettings, as: 'pushSettings',required:false
					},
					{
						model: membersStats, as: 'stats',required:false
					}
				]				
			}).then(function(dane) {
				if(dane != null)
				{
					resolve({exist:true, detail:dane});
				}
				else
				{
					resolve({exist:false, detail:{}});
				}
			}) 
		  });
	  },
	  
	  
	  loginUser: function(deviceID,pushID){
		return new Promise((function(resolve, reject){
			this.findOne({attributes: ['login', 'uid', 'level','syndykatID','sloneczkoID','country','language'], where:{deviceID:deviceID}}).then(function (dane) {
					if(dane != null)
					{
						dane.logedAt = custom.time();
						dane.pushID = pushID;
						dane.save().then(function(){
							resolve({"status":1, "login":dane.login, "language":dane.language , "country":dane.country , "level":dane.level,"MLTP":765 , "user":custom.rcpc(parseInt(dane.uid)), "sloneczko":custom.rcpc(dane.sloneczkoID), "syndykat":custom.rcpc(dane.syndykatID)});
						});
					}
					else
					{
						resolve({"status":0, "login":"", "level":0, "user":0});
					}
			});	
		}).bind(this));
	  },
	  
	  
	  
	registerUser: function(deviceID, login,pushID,country)
	{
		var member = this;
		return new Promise(function(resolve, reject){
		if(login != "")
		{
			if(login.length >= 3)
			{
				if(login.length <= 25)
				{
					member.count({where:{login: login}}).then(function(count){
						if(count > 0)
						{
							resolve({"status": 0, "user":0, "login":"", "error":"Istnieje już taka dziwka"});
							//callback({"status": 0, "user":0, "login":"", "error":"Istnieje już taka dziwka"});
						}
						else
						{
							member.create({
								deviceID: deviceID,
								pushID	:	pushID,
								login: login,
								level:1,
								wpierdol:5,
								wpierdolMax:5,
								chcica:20,
								chcicaMax:20,
								zmeczenie:100,
								zmeczenieMax:100,
								currentLocation:1,
								country	: country.slice(-2).toLowerCase(),//dwa ostatnie to kraj!!
								language: country.substring(0, 2),
								registeredAt: custom.time()
							}).then(function(res){
								if(res.uid > 0)
								{
									membersPVPSkill.create({
										uid: res.uid,
										kosmetyki: 5,
										odziez: 5,
										bizuteria: 5,
										obuwie: 5,
										dodatki: 5,
										bielizna: 5,
										zabawki: 5
									}).then(function(pvp){
										membersPushSettings.create({
											uid: res.uid,
											sadomaso : 1,
											comments: 1,
											message: 1,
											applicationAccepted: 1,
											sellItem: 1
										}).then(function(dane){
											membersStats.create({
												uid: res.uid
											}).then(function(res){
												resolve({"status": 1, "user":custom.rcpc(parseInt(res.uid)), "login":login, "level":1, "error":""});
												//callback({"status": 1, "user":custom.rcpc(parseInt(res.uid)), "login":login, "level":res.level, "error":""});
											});
										});
									});
								}
								else
								{
									resolve({"status": 0, "user":0, "login":"", "level":0, "error":"Wystąpił jakiś błąd"});
									//callback({"status": 0, "user":0, "login":"", "level":0, "error":"Wystąpił jakiś błąd"});
								}
							});
							
						}
					});
				}else resolve({"status": 0, "user":0, "login":"", "error":"Nazwa może zawierać maksymalnie 25znaków"});
			}else resolve({"status": 0, "user":0, "login":"", "error":"Nazwa musi zawierać minimum 3 znaki"});
		}else resolve({"status": 0, "user":0, "login":"", "error":"Musisz podać jakąs nazwe"});
		
		
		});
	},
	
	
	
	
	
	
	sumWpierdol: function(wpierdol, wpierdolMax, wpierdolStamp)
	{
		var update  =0;
		var time = custom.time();
		var divStamp = time - wpierdolStamp;
		var unitGrow = 2;//przyrost jednostkowy w ile minut
		unitGrow *= 60;//do sekund czyli 2 minuty ile to sekund
		var diffrence = divStamp / unitGrow;
		var diffrenceInt = parseInt(diffrence);
		if(diffrenceInt >= 1)
		{
			update = 1;
			var missing = wpierdolMax - wpierdol;
			if(diffrenceInt >  missing) diffrenceInt = missing;
			var wpierdolNewVal  = wpierdol + diffrenceInt;//nowa wartosc wpierdolu!
			var wpiedolNewStamp = wpierdolStamp + (diffrenceInt * unitGrow);//nowa wartosc wpierdolStampa!
		}
				
		//teraz ile sekund pozostalo do kolejnej pelnej liczby?
		var nextVal = parseInt(diffrence +1);
		var missingSeconds = wpierdolStamp + (nextVal * unitGrow) - time;
		return {
			"wpierdolNewVal" : wpierdolNewVal,
			"wpiedolNewStamp" : wpiedolNewStamp,
			"secondsToNext": missingSeconds,
			"update":update
		}
	},
	
	
	sumChcica: function(chcica, chcicaMax, chcicaStamp)
	{
		var update  =0;
		var time = custom.time();
		var divStamp = time - chcicaStamp;
		var unitGrow = 5;//przyrost jednostkowy w ile minut
		unitGrow *= 60;//do sekund czyli 2 minuty ile to sekund
		var diffrence = divStamp / unitGrow;
		var diffrenceInt = parseInt(diffrence);
		console.log(diffrenceInt);
		if(diffrenceInt >= 1)
		{
			update = 1;
			var missing = chcicaMax - chcica;
			if(diffrenceInt >  missing) diffrenceInt = missing;
			var chcicaNewVal  = chcica + diffrenceInt;//nowa wartosc wpierdolu!
			var chcicaNewStamp = chcicaStamp + (diffrenceInt * unitGrow);//nowa wartosc wpierdolStampa!
		}
				
		//teraz ile sekund pozostalo do kolejnej pelnej liczby?
		var nextVal = parseInt(diffrence +1);
		var missingSeconds = chcicaStamp + (nextVal * unitGrow) - time;
		return {
			"chcicaNewVal" : chcicaNewVal,
			"chcicaNewStamp" : chcicaNewStamp,
			"secondsToNext": missingSeconds,
			"update":update
		}
	},
	
	
	sumZmeczenie: function(zmeczenie, zmeczenieMax, zmeczenieStamp)
	{
		var update  =0;
		var time = custom.time();
		var divStamp = time - zmeczenieStamp;
		var unitGrow = 3;//przyrost jednostkowy w ile minut
		unitGrow *= 60;//do sekund czyli 2 minuty ile to sekund
		var diffrence = divStamp / unitGrow;
		var diffrenceInt = parseInt(diffrence);
		console.log(diffrenceInt);
		if(diffrenceInt >= 1)
		{
			update = 1;
			var missing = zmeczenieMax - zmeczenie;
			if(diffrenceInt >  missing) diffrenceInt = missing;
			var zmeczenieNewVal  = zmeczenie + diffrenceInt;//nowa wartosc wpierdolu!
			var zmeczenieNewStamp = zmeczenieStamp + (diffrenceInt * unitGrow);//nowa wartosc wpierdolStampa!
		}
				
		//teraz ile sekund pozostalo do kolejnej pelnej liczby?
		var nextVal = parseInt(diffrence +1);
		var missingSeconds = zmeczenieStamp + (nextVal * unitGrow) - time;
		return {
			"zmeczenieNewVal" : zmeczenieNewVal,
			"zmeczenieNewStamp" : zmeczenieNewStamp,
			"secondsToNext": missingSeconds,
			"update":update
		}
	},
	
	

	
	downloadUserData: function(deviceID,uid)
	{
		var members = this;
		return new Promise(function(resolve, reject){
		try
		{
			members.hasMany(membersHarem, {foreignKey:'uid'});
			membersHarem.belongsTo(harem, {foreignKey:'haremID'});
			members.belongsTo(sloneczko, {foreignKey:'sloneczkoID'});
			members.findOne({
				where:{
					$or: [
					{deviceID:deviceID},{uid:uid}]
				},
				include:[
					{
						model: membersHarem, required:false,
						include:[
							{
								model:harem
							}
						]
					},
					{
						model: sloneczko, required:false,
					}
				]
				}).then(function (dane) {
				var update = 0;
				if(dane != null)
				{
					var przychod = 0;
					async.each(dane.membersHarems, function(val, callback){
						przychod += (val.amount * val.harem.hajs);
						callback();
					},function(done){
						latarniaLog.sum('haremProcent', { where: {uid:dane.uid }}).then(function(haremProcent) {//bonus z lokacji!
							if(haremProcent > 0)
							{
								haremProcent /= 100;
							}
							haremProcent +=1;
							przychod *= haremProcent;
							var time = custom.time();
							if(dane.wpierdol != dane.wpierdolMax)//wpierdol regeneracja 2minuty jedna sztuka!
							{
								var wpierdolSum = members.sumWpierdol(dane.wpierdol, dane.wpierdolMax,dane.wpierdolStamp);
								if(update ==0 && wpierdolSum.update == 1) update = 1;
								if(wpierdolSum.update)
								{
									dane.wpierdol = wpierdolSum.wpierdolNewVal;
								}
								
								var wpierdolSeconds = wpierdolSum.secondsToNext;
							}else var wpierdolSeconds = 0;
							if(dane.chcica != dane.chcicaMax)//chcica regeneracja 4minuty jedna sztuka!
							{
								var chcicaSum = members.sumChcica(dane.chcica, dane.chcicaMax,dane.chcicaStamp);	
								if(update ==0 && chcicaSum.update == 1) update = 1;
								if(chcicaSum.update)
								{
									dane.chcica = chcicaSum.chcicaNewVal;
								}
								//console.log("chica");
								//console.log(chcicaSum);
								var chcicaSeconds = chcicaSum.secondsToNext;
							}else var chcicaSeconds = 0;
							
							
							
							if(dane.zmeczenie != dane.zmeczenieMax)//zmeczenie regeneracja 3minuty jedna sztuka!
							{
								var zmeczenieSum = members.sumZmeczenie(dane.zmeczenie, dane.zmeczenieMax,dane.zmeczenieStamp);	
								if(update ==0 && zmeczenieSum.update == 1) update = 1;
								if(zmeczenieSum.update)
								{
									dane.zmeczenie = zmeczenieSum.zmeczenieNewVal;
								}
								//console.log("zmeczenie");
								//console.log(zmeczenieSum);
								var zmeczenieSeconds = zmeczenieSum.secondsToNext;
							}else var zmeczenieSeconds = 0;
							

							
							//odrazu bedzie updejt danych ! i potem zwrotka!
							var newExp = custom.findNextLevel(dane.level);
							
							var expBefore = custom.findNextLevel(dane.level-1);
							var levelProcent = (dane.exp - expBefore) / (newExp - expBefore) * 100;
							
							//tutaj losowanko okresu!
							if(custom.syfEND(dane.syf) <= custom.time() && dane.ciaza > 0)
							{
								dane.syf = 0;
							}
							if(custom.okresEND(dane.okres) <= custom.time())
							{
								var start = (dane.okres == 0)? custom.time() : dane.okres;
								dane.okres = start + (custom.rand(21,28) * 24 * 60 * 60);
							}
							
							if(custom.ciazaEND(dane.ciaza) <= custom.time() && dane.ciaza > 0)
							{
								//co z ta ciaza zrobic????
								dane.ciaza = 0;
							}
							
							var sloneczko = false;
							if(dane.sloneczko != null)
							{
								
								if(custom.sloneczkoEND(dane.sloneczko.sloneczkoStamp) > custom.time())
								{
									
									if( custom.time() >= dane.sloneczko.sloneczkoStamp)
									{
										sloneczko = true;//jest sloneczko!!
									}
								}
							}
							
							var syf = (dane.syf <= custom.time() && custom.syfEND(dane.syf) >= custom.time() && dane.syf > 0)? custom.timeStr(custom.syfEND(dane.syf)) : false;
							var okres = (dane.okres <= custom.time() && custom.okresEND(dane.okres) >= custom.time() && dane.okres > 0)? custom.timeStr(custom.okresEND(dane.okres)) : false;
							var ciaza = (dane.ciaza <= custom.time() && custom.ciazaEND(dane.ciaza) >= custom.time() && dane.ciaza > 0)? custom.timeStr(custom.ciazaEND(dane.ciaza)) : false;
							
							var returnData = {
								"login":dane.login,
								"level":dane.level,
								"exp":dane.exp,
								"nextExp":newExp,
								"premium":dane.premium,
								"hajs":dane.hajs,
								"wpierdol":dane.wpierdol,
								"wpierdolMax":dane.wpierdolMax,
								"chcica":dane.chcica,
								"chcicaMax":dane.chcicaMax,
								"zmeczenie":dane.zmeczenie,
								"zmeczenieMax":dane.zmeczenieMax,
								"wpierdolSeconds":wpierdolSeconds,
								"chcicaSeconds":chcicaSeconds,
								"zmeczenieSeconds":zmeczenieSeconds,
								"levelProcent":levelProcent,
								"haremPrzychod":przychod,
								"haremStamp":setti.haremHour-custom.time(),
								"syf":syf,
								"okres":okres,
								"ciaza":ciaza,
								"sloneczko":sloneczko,
								"orgia":false
							};
							
							if(update)
							{
								if(typeof wpierdolSum != "undefined")
								{
									if(typeof wpierdolSum.wpierdolNewVal != "undefined")
									{
										wpierdolStamp = wpierdolSum.wpierdolNewStamp;
										wpierdolVal = wpierdolSum.wpierdolNewVal;
									}
									else
									{
										wpierdolStamp = dane.wpierdolStamp;
										wpierdolVal = dane.wpierdol;
									}
								}
								else
								{
									wpierdolStamp = dane.wpierdolStamp;
									wpierdolVal = dane.wpierdol;
								}
								
								
								if(typeof chcicaSum != "undefined")
								{
									if(typeof chcicaSum.chcicaNewVal != "undefined")
									{
										chcicaStamp = chcicaSum.chcicaNewStamp;
										chcicaVal = chcicaSum.chcicaNewVal;
									}
									else
									{
										chcicaStamp = dane.chcicaStamp;
										chcicaVal = dane.chcica;
									}
								}
								else
								{
									chcicaStamp = dane.chcicaStamp;
									chcicaVal = dane.chcica;
								}
								
								
								if(typeof zmeczenieSum != "undefined")
								{
									if(typeof zmeczenieSum.zmeczenieNewVal != "undefined")
									{
										zmeczenieStamp = zmeczenieSum.zmeczenieNewStamp;
										zmeczenieVal = zmeczenieSum.zmeczenieNewVal;
									}
									else
									{
										zmeczenieStamp = dane.zmeczenieStamp;
										zmeczenieVal = dane.zmeczenie;
									}
								}
								else
								{
									zmeczenieStamp = dane.zmeczenieStamp;
									zmeczenieVal = dane.zmeczenie;
								}
							
							dane.wpierdol = wpierdolVal;
							dane.wpierdolStamp = wpierdolStamp;
							dane.chcica = chcicaVal;
							dane.chcicaStamp = chcicaStamp;
							dane.zmeczenie = zmeczenieVal;
							dane.zmeczenieStamp = zmeczenieStamp;
							dane.save().then(function(){
									resolve(returnData);
							});
							}
							else
							{
								resolve(returnData);
							}
						});
					});
					
				}				
			});
			
			
		}catch(err){dumpError(err);}
		});
	}
	  
	  
	  
	  
	  
	  
    }
  });

}
