module.exports = function(sequelize,Sequelize, DataTypes) {


return sequelize.define('membersItem', {
	mitemID: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	uid			:		Sequelize.INTEGER,
	itemID		:		Sequelize.INTEGER,
	val			: 		Sequelize.INTEGER,
	upgrade 	:		Sequelize.INTEGER
  },{
	createdAt: false,
	updatedAt: false,
	tableName: 'membersItem',
    classMethods: {
      associate: function(models) {
        // define relationships here
		//latarnia.hasMany(models.latarniaClient);
      },
	  
	  
	upgradeHajs: function(szansaZ){
		  var szansa = [];
		  szansa[0] = {szansa: 0.01, koszt: 100000000};
		  szansa[1] = {szansa: 0.1, koszt: 50000000};
		  szansa[2] = {szansa: 0.15, koszt: 10000000};
		  szansa[3] = {szansa: 0.25, koszt: 8000000};
		  szansa[4] = {szansa: 0.4, koszt: 5000000};
		  szansa[5] = {szansa: 0.6, koszt: 3500000};
		  szansa[6] = {szansa: 0.8, koszt: 3000000};
		  szansa[7] = {szansa: 1, koszt: 2800000};
		  szansa[8] = {szansa: 1.2, koszt: 2500000};
		  szansa[9] = {szansa: 1.5, koszt: 2200000};
		  szansa[10] = {szansa: 2, koszt: 1800000};
		  szansa[11] = {szansa: 6, koszt: 1500000};
		  szansa[12] = {szansa: 7, koszt: 1200000};
		  szansa[13] = {szansa: 8, koszt: 1100000};
		  szansa[14] = {szansa: 9, koszt: 1000000};
		  szansa[15] = {szansa: 10, koszt: 900000};
		  szansa[16] = {szansa: 12, koszt: 800000};
		  szansa[17] = {szansa: 13, koszt: 750000};
		  szansa[18] = {szansa: 14, koszt: 650000};
		  szansa[19] = {szansa: 18, koszt: 600000};
		  szansa[20] = {szansa: 27, koszt: 500000};
		  szansa[21] = {szansa: 28, koszt: 400000};
		  szansa[22] = {szansa: 29, koszt: 350000};
		  szansa[23] = {szansa: 30, koszt: 250000};
		  szansa[24] = {szansa: 35, koszt: 180000};
		  szansa[25] = {szansa: 38, koszt: 150000};
		  szansa[26] = {szansa: 40, koszt: 100000};
		  szansa[27] = {szansa: 45, koszt: 80000};
		  szansa[28] = {szansa: 50, koszt: 50000};
		  
			for(var i =0; i <szansa.length; ++i)
			{
				if(szansa[i].szansa == szansaZ)
				{
					return szansa[i].koszt;
				}	
			}
	  },
	  
	upgradeStat: function(onLvl)//o ile wzrasta podstawa !!
	{
		var szansa = [];
		szansa[0] = {"lvl":1, "prc":10};
		szansa[1] = {"lvl":2, "prc":15};
		szansa[2] = {"lvl":3, "prc":20};
		szansa[3] = {"lvl":4, "prc":25};
		szansa[4] = {"lvl":5, "prc":35};
		szansa[5] = {"lvl":6, "prc":50};
		szansa[6] = {"lvl":7, "prc":65};
		szansa[7] = {"lvl":8, "prc":80};
		szansa[8] = {"lvl":9, "prc":95};
		
		for(var i =0; i <szansa.length; ++i)
		{
			if(szansa[i].lvl == onLvl)
			{
				return szansa[i].prc;
			}	
		}	
			
	},
	  
	  

	upgradeSzansa: function(onLvl)
	{
		var szansa = [];
		szansa[0] = {"lvl":1, "szansa":98};
		szansa[1] = {"lvl":2, "szansa":93};
		szansa[2] = {"lvl":3, "szansa":87};
		szansa[3] = {"lvl":4, "szansa":78};
		szansa[4] = {"lvl":5, "szansa":58};
		szansa[5] = {"lvl":6, "szansa":43};
		szansa[6] = {"lvl":7, "szansa":31};
		szansa[7] = {"lvl":8, "szansa":15};
		szansa[8] = {"lvl":9, "szansa":3};
		
		for(var i =0; i <szansa.length; ++i)
		{
			if(szansa[i].lvl == onLvl)
			{
				return szansa[i].szansa;
			}	
		}		
	} ,
	  
	  
	  getInstance: function(item)//zwraca instancje danego itema 
	  {
		var membersItem = this;
		return new Promise(function(resolve, reject){
			membersItem.findById(item).then(function(result){
				resolve(result);
			});
		});
	  },
	  
	  
	  newValItem: function(upgrade, val)//zwraca wartosc po ulepszeniu jaka ma byc
	  {
			var basicVal = (upgrade == 0)? val : val - ((membersItem.upgradeStat(upgrade) / 100) * val);//obliczanie val podstaowej
			var newVal = parseInt(basicVal + (basicVal * (membersItem.upgradeStat(upgrade+1) /100)))+1; //nowa wartosc!
			return newVal;
	  },
	  
	  upgradeByHajs: function(userInstance, item)//metoda ulepszenia poprzez hajs!
	  {
		var membersItem = this;
		return new Promise(function(resolve, reject){
			membersItem.belongsTo(items1, {foreignKey: 'itemID'});
			membersItem.findOne({
				where: {mitemID: item},
				include: [
					{
						model: items1
					}
				]
			}).then(function(itemInstance){
				if(itemInstance.uid == userInstance.uid)
				{
					var koszt = membersItem.upgradeHajs(itemInstance.items1.szansa) * (itemInstance.upgrade+1);
					if(itemInstance.upgrade < 9)
					{
						if(koszt <= userInstance.hajs)
						{
							var szansa = membersItem.upgradeSzansa(itemInstance.upgrade+1);
							if(custom.rand(0,100) <= szansa)
							{
								var newVal = membersItem.newValItem(itemInstance.upgrade, itemInstance.val);
								itemInstance.upgrade += 1;
								itemInstance.val = newVal;
								userInstance.hajs -= koszt;
								userInstance.save().then(function(result){
									itemInstance.save().then(function(result){
										resolve({error:""});
									});
								});
							}
							else
							{
								userInstance.hajs -= koszt;
								userInstance.save().then(function(result){
									itemInstance.destroy().then(function(result){
										resolve({error:"Nie udało się! zabawka zniszczona!"});
									});
								});
							}
						}
						else resolve({error:"Nie stać cię!"});
					}else resolve({error:"Zabawka ma maksymalny poziom ulepszenia"});
				}				
			});
		}); 
	  },
	  
	  sellItem : function(uid, item)
	  {
		var membersItem = this;
		return new Promise(function(resolve, reject){
			sklepAuction.belongsTo(membersItem, {foreignKey:'mitemID'});
			membersItem.findOne({
				where: {mitemID: item },
				include: [
					{
						model: sklepAuction, required: false,
					}
				]
			}).then(function(instance){
				if(instance.uid == uid)
				{
					var cena = instance.val *configDB.cenaPerPkt;
					instance.destroy().then(function(done){
						if(instance.sklepAuction != null)
						{
							instance.sklepAuction.destroy().then(function(res){
								resolve(cena);
							});
						}
						else
						{
							resolve(cena);
						}
					});
				}				
			});
		});  
	  },
	  getAllItemsUser: function(userInstance,ciag,syndykatCount)//jak tu cos zmieniasz to zmien tez w funkcji getUserItemsForSM
	  {
		var syndykatLimit = syndykatCount+1;//PLUS JEDEN BO dostalem argument bezemnie
		var membersItem = this;
		return new Promise(function(resolve, reject){
			membersItem.belongsTo(items1, {foreignKey: 'itemID'});
			membersItem.hasOne(sklepAuction, {foreignKey: 'mitemID'});
			membersItem.findAll({
				where:{uid: userInstance.uid},
				include: [
					{
						model: items1, attributes: ['typ1','nazwa','image_src','level','szansa'], required:false, 
					},
					{
						model: sklepAuction, required:false,
					}
				],
				
			}).then(function(dane){
				
				  var itemkiUse = {};
				  var itemkiNot = {};
				  
				  var itemkiUseNormal = [];
				  var itemkiNotNormal = [];
					for(var i = 0; i < ciag.length; ++i)
					{
						itemkiUse[ciag[i]] = [];
						itemkiNot[ciag[i]] = [];
					}
				  if(dane.length > 0)
				  {		
					dane.sort(function(a, b) {
						return parseInt(b.val) - parseInt(a.val);
					});
			  
			  
			  
					async.series([
						function(callback){
							async.each(dane, function(dan, insideCallback){
								if(dan.items1 != null)
								{// 
									if(dan.items1.level <= userInstance.level && itemkiUse[dan.items1.typ1].length < syndykatLimit)
									{
										itemkiUse[dan.items1.typ1].push({
											mitemID: dan.mitemID,
											itemID:dan.itemID,
											val: dan.val,
											typ: dan.items1.typ1,
											nazwa: dan.items1.nazwa,
											image_src: dan.items1.image_src,
											level: dan.items1.level,
											cena: dan.val*configDB.cenaPerPkt,
											upgrade: dan.upgrade,
											auction: (dan.sklepAuction != null)? true : false,
											upgNewVal: membersItem.newValItem(dan.upgrade, dan.val),
											upgKoszt: membersItem.upgradeHajs(dan.items1.szansa) * (dan.upgrade+1)
										});
									}
									else
									{
										itemkiNot[dan.items1.typ1].push({
											mitemID: dan.mitemID,
											itemID:dan.itemID,
											val: dan.val,
											typ: dan.items1.typ1,
											nazwa: dan.items1.nazwa,
											image_src: dan.items1.image_src,
											level: dan.items1.level,
											cena: dan.val*configDB.cenaPerPkt,
											upgrade: dan.upgrade,
											auction: (dan.sklepAuction != null)? true : false,
											upgNewVal: membersItem.newValItem(dan.upgrade, dan.val),
											upgKoszt: membersItem.upgradeHajs(dan.items1.szansa) * (dan.upgrade+1)
										});
									}
								}
								insideCallback();
							},function(done){
								callback();
							});
						},
						function(callback){//to zaczyna gdy sie zrobi tamto wyzej
							async.series([
								function(callbackInside){
									async.each(ciag, function(cc, callback2Inside){
										async.series([
											function(callback4Inside){
												async.each(itemkiUse[cc], function(its, callback3Inside){
													itemkiUseNormal.push(its);
													callback3Inside();
												},function(done3){
													callback4Inside();
												});
											},
											function(callback5Inside){
												async.each(itemkiNot[cc], function(its, callback3Inside){
													itemkiNotNormal.push(its);
													callback3Inside();
												},function(done3){
													callback5Inside();//ten sie scallbackuje gdy petla wewnatrz skonczy obroty!
												});
											},
										],function(err, result){
											callback2Inside();//to wywoluje nowy obrot petli! jesli dwie wewnetrze sie scallbackuja!!
										});
									},function(done){//to sie zrobi gdy seria w srodku zrobi async!
										callbackInside();//gdy petla petla sie skonczy to to sie callbackuje!
									});
								}
							],function(err,results){//to sie zrobi gdy ta glowna w srodku sie scallbackuje!
								callback();
							});
						}
						], function (err, results) {//to sie zrobi gdy dwie glowne sie scallbackuja!
								resolve({
									wearUp: itemkiUseNormal,
									wearDown: itemkiNotNormal
								});
						});
				  }
				  else
				  {
					resolve({
						wearUp: itemkiUseNormal,
						wearDown: itemkiNotNormal
					});  
				  }
			});
		});
	  },
	  
	  
	  getUserItemsForSM: function(user,level,ciag)//jak tu cos zmieniasz to zmien tez w funckji getAllItemsUser
	  {
		  var membersItem = this;
		  return new Promise(function(resolve, reject){
			 
			  membersItem.belongsTo(items1, {foreignKey: 'itemID'});
			  membersItem.findAll({
				where:{uid: user},
				include: [
					{
						model: items1, attributes: ['typ1','nazwa','image_src','level'], required:false, 
						where: {
							level: 
							{
								$lte: level
							}						
						}
					}
				],
				
			  }).then(function(dane){
				  var itemki = {};
					for(var i = 0; i < ciag.length; ++i)
					{
						itemki[ciag[i]] = [];
					}
				  if(dane.length > 0)
				  {
					async.series([
						function(callback){
							async.each(dane, function(dan, callbackInner){
								if(dan.items1 != null)
								{
									itemki[dan.items1.typ1].push({
										mitemID: dan.mitemID,
										itemID:dan.itemID,
										val: dan.val,
										typ: dan.items1.typ1,
										nazwa: dan.items1.nazwa,
										image_src: dan.items1.image_src,
										level: dan.items1.level,
										upgrade: dan.upgrade,
									});
								}
								callbackInner();//to sie wywoluje co kazdy obrot petli!
							},function(done){
								callback();//to na koniec petli!!
							});
						},
						function(callback){
							async.each(ciag, function(cc, callbackInner2){
								itemki[cc].sort(function(a, b) {
									return parseInt(b.val) - parseInt(a.val);
								});
								callbackInner2();
							},function(done){
								callback();
							});
						}
					],function(err, result){
						resolve(itemki);
					});
				  }
				  else
				  {
					 resolve(itemki); 
				  }
				  
				  
			  },function(err){console.log(err)});  
			
		  });
		  
	  }
	  
	}
	
	
  }
  );
  
  
  
}