module.exports = function(sequelize,Sequelize, DataTypes) {

//nie mozna usunac sloneczka jesli nie minelo 12h od ostatniego sloneczka!
return sequelize.define('sloneczko', {
	sloneczkoID: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	owner 	:		Sequelize.INTEGER,
	sloneczkoStamp	:	Sequelize.INTEGER
  },{
	createdAt: false,
	updatedAt: false,
	tableName: 'sloneczko',
    classMethods: {
      associate: function(models) {
        // define relationships here
		//latarnia.hasMany(models.latarniaClient);
      },
	  
	  
	  setGodzina: function(sloneczkoID,uid,godzina)
	  {
		var sloneczko = this;
		return new Promise(function(resolve, reject){ 
			sloneczko.hasMany(members, {foreignKey: 'sloneczkoID'});
			sloneczko.findOne({
				sloneczkoID: custom.rcpd(sloneczkoID),
				include: [
					{
						model: members, required:false
					}				
				]				
			}).then(function(instance){
				if(instance.owner == uid)
				{
					if(instance.members.length >= 3)
					{
						//czy minelo 12h?
						if(custom.time() - instance.sloneczkoStamp >= (12 * 60 * 60))
						{
							//teraz sprawdzic czy godzina podana minela!
							var time = custom.timeConverter(custom.time());
							var stampNew = new Date(time.Y+"-"+time.m+"-"+time.d+" "+godzina+":00:00");
							var stampNew = stampNew.getTime() / 1000;
							if(time.H == '00')
							{
								stampNew+= 24 * 60 * 60;
							}
							instance.sloneczkoStamp = stampNew;
							instance.save().then(function(){
							resolve({
									error: "",
									godzina: custom.timeStr(stampNew)
									
								});
							});
						}
						else
						{
							reject({error:'Nie mineło jeszcze 12godzin! minie o: '+custom.timeStr(instance.sloneczkoStamp+(12*60*60))});
						}
					}
					else
					{
						reject({error:'Musi być was minimum 3 by wyznaczyć słoneczko!'});	
					}
				}
			});
		});
	  },
	  
	  QuitAndDestroy: function(sloneczkoID, uid)
	  {
		var sloneczko = this;
		return new Promise(function(resolve, reject){ 
			sloneczko.hasMany(members, {foreignKey: 'sloneczkoID'});
			sloneczko.findById(custom.rcpd(sloneczkoID)).then(function(instance){
				if(instance.owner == uid)
				{
					if(custom.time() - instance.sloneczkoStamp >= (12 * 60 * 60))
					{
						instance.destroy().then(function(){
							members.update(
								{sloneczkoID: 0},
								{where:{
									sloneczkoID: custom.rcpd(sloneczkoID)
								}}						
							).then(function(result){
								sloneczkoApplication.destroy({
									where:{
										sloneczkoID: custom.rcpd(sloneczkoID)
									}
								}).then(function(){
									klachyChat.destroy({
										where:{
											room: 'sloneczko_'+sloneczkoID
										}
									}).then(function(){
										resolve({error:""});
									});
								});
							});						
						});
					}else reject({error:'Aby rozwiązać słoneczko musi minąć 12godzin od ostatniego!'});
				}
			});
		});
	  },
	  
	  
	  
	  leave: function(sloneczkoID, uid)
	  {
		var sloneczko = this;
		return new Promise(function(resolve, reject){ 
			sloneczko.hasMany(members, {foreignKey: 'sloneczkoID'});
			sloneczko.findOne({
				where:{
					sloneczkoID: custom.rcpd(sloneczkoID),
				},
				include: [
					{
						model:members, required:false, attributes:['uid','sloneczkoID'],where:{uid: uid}
					}				
				]
			}).then(function(instance){
				if(instance.owner != uid)
				{
					if(custom.time() - instance.sloneczkoStamp >= (12 * 60 * 60))
					{
						instance.members[0].sloneczkoID = 0;
						instance.members[0].save().then(function(){
							resolve({error:""});
						});
					}
					else reject({error:'Aby odejść ze słoneczka musi minąć 12godzin od ostatniego!'});
				}
			});
		});
	  },
	  
	  
	  deniedApplication: function(applicationInstance)//mam prawo bo jestesm wladca!
	  {
		var sloneczko = this;
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
		var sloneczko = this;
		return new Promise(function(resolve, reject){
			try
			{
			applicationInstance.application[0].player.sloneczkoID = applicationInstance.application[0].sloneczkoID;
			applicationInstance.application[0].destroy().then(function(){
				applicationInstance.application[0].player.save().then(function(){
					resolve({error:""});
				});
			});
			}catch(err){custom.dumpError(err);};
		}); 
	  },
	  
	  getInstanceAppIfOwner: function(sloneczkoID,uid,app)
	  {
		var sloneczko = this;
		return new Promise(function(resolve, reject){
			sloneczko.hasMany(sloneczkoApplication, {foreignKey: 'sloneczkoID', as: 'application'});
			sloneczkoApplication.belongsTo(members, {foreignKey: 'uid', as:'player'});
			members.hasOne(membersPushSettings, {foreignKey: 'uid', as: 'pushSettings'});
			sloneczko.findOne({
				where: {sloneczkoID: custom.rcpd(sloneczkoID)},
				include: [
					{
						model: sloneczkoApplication, as: 'application', required:true, where: {sappID: app},
						include: [
							{
								model: members, as :'player',attributes:['sloneczkoID','uid','pushID'],
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
	  
	  getInfoAndApplication: function(sloneczkoID)
	  {
		  var sloneczko = this;
		  return new Promise(function(resolve, reject){
			sloneczko.hasMany(sloneczkoApplication, {foreignKey: 'sloneczkoID', as: 'application'});
			sloneczkoApplication.belongsTo(members, {foreignKey: 'uid', as:'player'});
			sloneczko.findOne({
				where: {sloneczkoID: custom.rcpd(sloneczkoID)},
				include: [
					{
						model: sloneczkoApplication, as: 'application',
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
	  
	  kickFromsloneczko: function(sloneczkoID,kick, user)
	  {
		var sloneczko = this;
		user = custom.rcpd(user);
		return new Promise(function(resolve, reject){
			sloneczko.hasMany(members, {foreignKey: 'sloneczkoID'});
			sloneczko.findOne({
				where: {sloneczkoID: custom.rcpd(sloneczkoID)},
				include: [
					{
						model: members, where:{
							$or: [{uid: kick}, {uid: user}]
						},required:false, attributes: ['uid','sloneczkoID']
					}				
				]				
			}).then(function(dane){
				if(dane.owner == user && kick != user)
				{
					var kickInstance = (dane.members[1].uid == kick)? dane.members[1] : dane.members[0];
					kickInstance.sloneczkoID = 0;
					kickInstance.save().then(function(){
						resolve(true);
					});
				}
			});
		});  
	  },
	  
	  
	  getMembers: function(sloneczkoID)
	  {
		  var sloneczko = this;
		  return new Promise(function(resolve, reject){
			sloneczko.hasMany(members, {foreignKey: 'sloneczkoID', as: 'players'});
			sloneczko.findOne({
				where: {sloneczkoID: custom.rcpd(sloneczkoID)},
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
	  
	  exist: function(sloneczkoID)
	  {
		var sloneczko = this;
		return new Promise(function(resolve, reject){
			sloneczko.count({where:{sloneczkoID: custom.rcpd(sloneczkoID)}}).then(function(count){
				if(count == 1)
				{
					resolve(true);
				}
				else
				{
					reject({error:"Nie ma takiego słoneczka!"});
				}
			});
		}); 
	  },
	  
	  createNewSloneczko: function(uid){
		var sloneczko = this;
		return new Promise(function(resolve, reject){
					sloneczko.findAll({
						where:{
							owner: custom.rcpd(uid)
						}
					}).then(function(finding){
						if(finding.length == 0)
						{
							sloneczko.create({
								owner: custom.rcpd(uid)
							}).then(function(created){
								resolve(created);
							});
						}
						else
						{
							reject({error: "Jesteś założycielką innego sloneczkou!"});
						}
					});			
		}); 
	  }
	  
	}
	
	
  }
  );
  
  
  
}