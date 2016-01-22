module.exports = function(sequelize,Sequelize, DataTypes) {


return sequelize.define('notifyRaports', {
	rapID: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	uid			:		Sequelize.INTEGER,
	belong	:	{type: Sequelize.INTEGER, unique: true},
	orUid		:		Sequelize.INTEGER,
	typ			: 		Sequelize.STRING,
	smWinner	:		Sequelize.STRING,
	tytul		:		Sequelize.STRING,
	read		:		Sequelize.INTEGER,
	orUidRead	:		Sequelize.INTEGER,
	comments	:		Sequelize.INTEGER,
	createdAt	:		Sequelize.INTEGER,
	expiredAt	:		Sequelize.INTEGER
  },{
	createdAt: false,
	updatedAt: false,
	tableName: 'notifyRaports',
    classMethods: {
      associate: function(models) {
        // define relationships here
		//latarnia.hasMany(models.latarniaClient);
      },
	  
	  
	  setRead: function(rapID,uid)
	  {
		var notifyRaports = this;
		return new Promise(function(resolve, reject){
			notifyRaports.checkExist(rapID).then(function(rapInstance){
				var readRaport = (rapInstance.uid == uid)? (rapInstance.read == 1)? 1 : 0 : (rapInstance.orUidRead == 1)? 1 : 0;
				if(readRaport == 0)
				{
					if(rapInstance.uid == uid)
					{
						rapInstance.read = 1;
					}
					else
					{
						rapInstance.orUidRead = 1;
					}
					rapInstance.save().then(function(){
						resolve(true);
					});
				}
			});
		});		  
	  },
	  
	  sendSimpleNotify: function(uid, tekst)
	  {
		var sadoMasoExpired = 3 * 24 * 60 * 60;//trzy dni
		var notifyRaports = this;
		return new Promise(function(resolve, reject){
				notifyRaports.create({
					uid: uid,
					typ: 'inne',
					tytul: tekst,
					createdAt: custom.time(),
					expiredAt: custom.time()+sadoMasoExpired,
				}).then(function(raportNew){
					resolve(raportNew);
				});
		});	  
	  },
	  
	  sendCommentsNotify: function(rapInstance, uid)
	  {
		var sadoMasoExpired = 3 * 24 * 60 * 60;//trzy dni
		var notifyRaports = this;
		return new Promise(function(resolve, reject){
			var opponent = (rapInstance.uid == uid) ? rapInstance.orUid : rapInstance.uid;
				notifyRaports.create({
					belong: rapInstance.rapID,
					uid: opponent,
					orUid: 0,
					typ: 'SMComments',
					smWinner: 0,
					tytul: 'Nowy Komentarz',
					comments: 0,
					read: 0,
					orUidRead:0,
					createdAt: custom.time(),
					expiredAt: custom.time()+sadoMasoExpired,
				}).then(function(raportNew){
					resolve(opponent);
				});
		});		
	  },
	  
	  extendExpired: function(instance)
	  {
		var notifyRaports = this;
		return new Promise(function(resolve, reject){
			instance.expiredAt = custom.time() + (3*24*60*60);
			instance.save().then(function(newInstance){
				resolve(newInstance);
			});
		});		  
	  },
	  
	  checkExist: function(rapID)
	  {
		var notifyRaports = this;
		return new Promise(function(resolve, reject){
			notifyRaports.findById(rapID).then(function(instance){
				if(instance != null)
				{
					resolve(instance);
				}
				else
				{
					reject({error:"Nie ma takiego raportu!"});
				}
			});
		});		  
	  },
	  
	  sendSadoMasoRaports: function(uid,enemy, raport)
	  {
		var notifyRaports = this;
		var sadoMasoExpired = 3 * 24 * 60 * 60;//trzy dni
		return new Promise(function(resolve, reject){

				notifyRaports.create({
					uid: uid,
					orUid: enemy,
					typ: 'SM',
					smWinner: raport.winner,
					tytul: 'Klepanko',
					comments: 1,
					read: 0,
					orUidRead:0,
					createdAt: custom.time(),
					expiredAt: custom.time()+sadoMasoExpired
				}).then(function(res1){
					notifyRaportsDetail.create({
						rapID: res1.rapID,
						txt: JSON.stringify(raport)
					}).then(function(res){
						raport.rapID = res1.rapID;
						resolve(raport);
					});
					
				},function(err){
					console.log(err);
				});	
		});  
	  },
	  
	  getNotificationOnlySMComments: function(uid,limit,offset)
	  {
		if(typeof offset == "undefined") offset = 0;
		if(typeof limit == "undefined") limit = 100;
		var notifyRaports = this;
		return new Promise(function(resolve, reject){
		try{
			uid = custom.rcpd(uid);
			notifyRaports.belongsTo(notifyRaportsDetail, {foreignKey: 'belong', as:'detail', targetKey: 'rapID'});
			notifyRaports.findAll({
				where:{
					typ: 'SMComments',
					$or: [{uid:uid},{orUid:uid}]
				},
				include: [
					{
						model: notifyRaportsDetail, as: 'detail', required:false
					},
				],
				order:[
					
						['createdAt','DESC'],
					
				],
				offset: offset,
				limit: limit
			}).then(function(result){
				try
				{
					async.each(result, function(res, callback){
					try
						{
							res.detail.txt = JSON.parse(res.detail.txt);
						}catch(err){};
						res.uid = custom.rcpc(res.uid);
						res.smWinner = custom.rcpc(res.smWinner);
						res.createdAt = custom.timeStr(res.createdAt);
						callback();
					},function(done){
						resolve(result);
					});
				}catch(err){
					custom.dumpError(err);
					resolve(result);
				};
			},function(err){console.log(err);});	
		}catch(err){custom.dumpError(err);};
		});  
	  },
	  
	  getNotificationOnlySadoMaso: function(uid,limit,offset)
	  {
		if(typeof offset == "undefined") offset = 0;
		if(typeof limit == "undefined") limit = 100;
		var notifyRaports = this;
		return new Promise(function(resolve, reject){
		try{
			uid = custom.rcpd(uid);
			notifyRaports.hasOne(notifyRaportsDetail, {foreignKey: 'rapID', as:'detail'});
			
			notifyRaports.findAll({
				where:{
					typ: 'SM',
					$or: [{uid:uid},{orUid:uid}]
				},
				include: [
					{
						model: notifyRaportsDetail, as: 'detail', required:false
					},
				],
				order:[
					
						['createdAt','DESC'],
					
				],
				offset: offset,
				limit: limit
			}).then(function(result){
				try
				{
					async.each(result, function(res, callback){
						try
						{
							res.detail.txt = JSON.parse(res.detail.txt);
						}catch(err){};
						res.uid = custom.rcpc(res.uid);
						res.smWinner = custom.rcpc(res.smWinner);
						res.createdAt = custom.timeStr(res.createdAt);
						callback();
					},function(done){
						resolve(result);
					});
				}catch(err){
					custom.dumpError(err);
					resolve(result);
				};
				
			},function(err){console.log(err);});	
		}catch(err){custom.dumpError(err);};
		});   
	  },
	  
	  getNotification: function(uid,limit,offset)
	  {
		if(typeof offset == "undefined") offset = 0;
		if(typeof limit == "undefined") limit = 100;
		var notifyRaports = this;
		return new Promise(function(resolve, reject){
		try{
			uid = custom.rcpd(uid);
			notifyRaports.hasOne(notifyRaportsDetail, {foreignKey: 'rapID', as:'detail'});
			
			notifyRaports.findAll({
				where:{
					$or: [{uid:uid},{orUid:uid}]
				},
				include: [
					{
						model: notifyRaportsDetail, as: 'detail', required:false
					},
				],
				order:[
					
						['createdAt','DESC'],
					
				],
				offset: offset,
				limit: limit
			}).then(function(result){
				try
				{
					async.each(result, function(res, callback){
						try
						{
							res.detail.txt = JSON.parse(res.detail.txt);
						}catch(err){};
						res.uid = custom.rcpc(res.uid);
						res.smWinner = custom.rcpc(res.smWinner);
						res.createdAt = custom.timeStr(res.createdAt);
						callback();
					},function(done){
						resolve(result);
					});
				}catch(err){
					custom.dumpError(err);
					resolve(result);
				};
				
			},function(err){console.log(err);});	
		}catch(err){custom.dumpError(err);};
		});   
	  }
  
	}
	
	
  }
  );
  
  
  
}