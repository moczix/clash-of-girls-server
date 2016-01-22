module.exports = function(sequelize,Sequelize, DataTypes) {

	//przy quitAndDestroy forum skasowac!!!! 
return sequelize.define('syndykat', {
	syndykatID: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	nazwa		:		Sequelize.STRING,
	skrot		: 		Sequelize.STRING,
	owner 	:		Sequelize.INTEGER,
  },{
	createdAt: false,
	updatedAt: false,
	tableName: 'syndykat',
    classMethods: {
      associate: function(models) {
        // define relationships here
		//latarnia.hasMany(models.latarniaClient);
      },
	  
	  
	  QuitAndDestroy: function(syndykatID, uid)
	  {
		var syndykat = this;
		return new Promise(function(resolve, reject){ 
			syndykat.hasMany(members, {foreignKey: 'syndykatID'});
			syndykat.findById(custom.rcpd(syndykatID)).then(function(instance){
				if(instance.owner == uid)
				{
					instance.destroy().then(function(){
						members.update(
							{syndykatID: 0},
							{where:{
								syndykatID: custom.rcpd(syndykatID)
							}}						
						).then(function(result){
							syndykatApplication.destroy({
								where:{
									syndykatID: custom.rcpd(syndykatID)
								}
							}).then(function(){
								resolve({error:""});
							});
						});						
					});
				}
			});
		});
	  },
	  
	  
	  
	  leave: function(syndykatID, uid)
	  {
		var syndykat = this;
		return new Promise(function(resolve, reject){ 
			syndykat.hasMany(members, {foreignKey: 'syndykatID'});
			syndykat.findOne({
				where:{
					syndykatID: custom.rcpd(syndykatID),
				},
				include: [
					{
						model:members, required:false, attributes:['uid','syndykatID'],where:{uid: uid}
					}				
				]
			}).then(function(instance){
				if(instance.owner != uid)
				{
					instance.members[0].syndykatID = 0;
					instance.members[0].save().then(function(){
						resolve({error:""});
					});
				}
			});
		});
	  },
	  
	  
	  saveSettings: function(syndykatID, nazwa, skrot, uid)
	  {
		var syndykat = this;
		return new Promise(function(resolve, reject){
			if(nazwa.length <= configDB.syndykatNazwaLenghtMax && skrot.length <= configDB.syndykatSkrotLenghtMax)
			{
				if(nazwa.length >= configDB.syndykatNazwaLenghtMin && skrot.length >= configDB.syndykatSkrotLenghtMin)
				{
					syndykat.findAll({
						where:{
							syndykatID: {$ne: custom.rcpd(syndykatID)},
							$or: [{nazwa: nazwa}, {skrot: skrot}]
						}
					}).then(function(finding){
						if(finding.length == 0)
						{
							syndykat.findById(custom.rcpd(syndykatID)).then(function(instance){
								if(instance.owner == uid)
								{
									instance.nazwa = nazwa;
									instance.skrot = skrot;
									instance.save().then(function(){
										resolve({error:""});
									});									
								}
							});
						}
						else
						{
							if(finding[0].nazwa == nazwa)
							{
								reject({error: "Istnieje syndykat o tej nazwie!"});
							}
							else if(finding[0].skrot == skrot)
							{
								reject({error: "Istnieje syndykat z tym skrótem"});
							}
						}
					});
				}
				else
				{
					if(nazwa.length < configDB.syndykatNazwaLenghtMin)
					{
						reject({error: "Nazwa za krótka! min "+configDB.syndykatNazwaLenghtMin+"znaków!"});
					}else if(skrot.length < configDB.syndykatSkrotLenghtMin)
					{
						reject({error: "Skrót za krótki! min "+configDB.syndykatSkrotLenghtMin+"znaków!"});
					}
				}
			}
			else
			{
				if(nazwa.length > configDB.syndykatNazwaLenghtMax)
				{
					reject({error: "Nazwa za długa! max "+configDB.syndykatNazwaLenghtMax+"znaków!"});
				}else if(skrot.length > configDB.syndykatSkrotLenghtMax)
				{
					reject({error: "Skrót za długi! max "+configDB.syndykatSkrotLenghtMax+"znaków!"});
				}
			}		  
		});
	  },
	  
	  
	  deniedApplication: function(applicationInstance)//mam prawo bo jestesm wladca!
	  {
		var syndykat = this;
		return new Promise(function(resolve, reject){
			try
			{
			applicationInstance.application[0].destroy().then(function(){
				resolve({error:""});
			});
			}catch(err){custom.dumpError(err);};
		}); 
	  },
	  acceptApplication: function(applicationInstance)//mam prawo bo jestesm wladca!
	  {
		var syndykat = this;
		return new Promise(function(resolve, reject){
			try
			{
			applicationInstance.application[0].player.syndykatID = applicationInstance.application[0].syndykatID;
			applicationInstance.application[0].destroy().then(function(){
				applicationInstance.application[0].player.save().then(function(){
					resolve({error:""});
				});
			});
			}catch(err){custom.dumpError(err);};
		}); 
	  },
	  
	  getInstanceAppIfOwner: function(syndykatID,uid,app)
	  {
		var syndykat = this;
		return new Promise(function(resolve, reject){
			syndykat.hasMany(syndykatApplication, {foreignKey: 'syndykatID', as: 'application'});
			syndykatApplication.belongsTo(members, {foreignKey: 'uid', as:'player'});
			members.hasOne(membersPushSettings, {foreignKey: 'uid', as: 'pushSettings'});
			syndykat.findOne({
				where: {syndykatID: custom.rcpd(syndykatID)},
				include: [
					{
						model: syndykatApplication, as: 'application', required:true, where: {appID: app},
						include: [
							{
								model: members, as :'player',attributes:['syndykatID','uid','pushID'],
								include:[
									{
										model:membersPushSettings, as: 'pushSettings',
									}
								]
							}
						]
					}				
				]
			}).then(function(result){
				try
				{
					if(result.owner == uid)
					{
						resolve(result);
					}
					else
					{
						reject({error:"nie masz praw"});
					}
				}catch(err){reject({error:"jakis error"})};
			});
		});
	  },
	  
	  getInfoAndApplication: function(syndykatID)
	  {
		  var syndykat = this;
		  return new Promise(function(resolve, reject){
			syndykat.hasMany(syndykatApplication, {foreignKey: 'syndykatID', as: 'application'});
			syndykatApplication.belongsTo(members, {foreignKey: 'uid', as:'player'});
			syndykat.findOne({
				where: {syndykatID: custom.rcpd(syndykatID)},
				include: [
					{
						model: syndykatApplication, as: 'application',
						include: [
							{
								model: members, as :'player',attributes:['login',['uid','user'],'level',['bilansSM','hajs'],'country']
							}						
						]
					}
				],
			}).then(function(result){
				resolve(result);
			});
		  });  
	  },
	  
	  kickFromSyndykat: function(syndykatID,kick, user)
	  {
		var syndykat = this;
		user = custom.rcpd(user);
		return new Promise(function(resolve, reject){
			syndykat.hasMany(members, {foreignKey: 'syndykatID'});
			syndykat.findOne({
				where: {syndykatID: custom.rcpd(syndykatID)},
				include: [
					{
						model: members, where:{
							$or: [{uid: kick}, {uid: user}]
						},required:false, attributes: ['uid','syndykatID']
					}				
				]				
			}).then(function(dane){
				if(dane.owner == user && kick != user)
				{
					var kickInstance = (dane.members[1].uid == kick)? dane.members[1] : dane.members[0];
					
					kickInstance.syndykatID = 0;
					kickInstance.save().then(function(){
						resolve(true);
					});
				}
			});
		});  
	  },
	  
	  
	  getMembers: function(syndykatID)
	  {
		  var syndykat = this;
		  return new Promise(function(resolve, reject){
			syndykat.hasMany(members, {foreignKey: 'syndykatID', as: 'players'});
			syndykat.findOne({
				where: {syndykatID: custom.rcpd(syndykatID)},
				include: [
					{
						model: members, as: 'players', attributes: ['login',['uid','user'],'level',['bilansSM','hajs'],'country']
					}
				],
				  order: [ [ { model: members, as: 'players' }, 'level','DESC' ] ]
			}).then(function(result){
				resolve(result);
			});
		  });
	  },
	  
	  exist: function(syndykatID)
	  {
		var syndykat = this;
		return new Promise(function(resolve, reject){
			syndykat.count({where:{syndykatID: custom.rcpd(syndykatID)}}).then(function(count){
				if(count == 1)
				{
					resolve(true);
				}
				else
				{
					reject({error:"Nie ma takiego syndykatu!"});
				}
			});
		}); 
	  },
	  
	  createNewSyndykat: function(nazwa, skrot,uid){
		var syndykat = this;
		return new Promise(function(resolve, reject){
			if(nazwa.length <= configDB.syndykatNazwaLenghtMax && skrot.length <= configDB.syndykatSkrotLenghtMax)
			{
				if(nazwa.length >= configDB.syndykatNazwaLenghtMin && skrot.length >= configDB.syndykatSkrotLenghtMin)
				{
					syndykat.findAll({
						where:{
							$or: [{nazwa: nazwa}, {skrot: skrot}, {owner: custom.rcpd(uid)}]
						}
					}).then(function(finding){
						if(finding.length == 0)
						{
							syndykat.create({
								nazwa: nazwa,
								skrot: skrot,
								owner: custom.rcpd(uid)
							}).then(function(created){
								resolve(created);
							});
						}
						else
						{
							if(finding[0].nazwa == nazwa)
							{
								reject({error: "Istnieje syndykat o tej nazwie!"});
							}
							else if(finding[0].skrot == skrot)
							{
								reject({error: "Istnieje syndykat z tym skrótem"});
							}
							else if(finding[0].owner == custom.rcpd(uid))
							{
								reject({error: "Jesteś założycielką innego syndykatu!"});
							}
						}
					});
				}
				else
				{
					if(nazwa.length < configDB.syndykatNazwaLenghtMin)
					{
						reject({error: "Nazwa za krótka! min "+configDB.syndykatNazwaLenghtMin+"znaków!"});
					}else if(skrot.length < configDB.syndykatSkrotLenghtMin)
					{
						reject({error: "Skrót za krótki! min "+configDB.syndykatSkrotLenghtMin+"znaków!"});
					}
				}
			}
			else
			{
				if(nazwa.length > configDB.syndykatNazwaLenghtMax)
				{
					reject({error: "Nazwa za długa! max "+configDB.syndykatNazwaLenghtMax+"znaków!"});
				}else if(skrot.length > configDB.syndykatSkrotLenghtMax)
				{
					reject({error: "Skrót za długi! max "+configDB.syndykatSkrotLenghtMax+"znaków!"});
				}
			}			
		}); 
	  }
	  
	}
	
	
  }
  );
  
  
  
}