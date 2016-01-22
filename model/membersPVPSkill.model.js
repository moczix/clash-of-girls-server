module.exports = function(sequelize,Sequelize, DataTypes) {

	
return sequelize.define('membersPVPSkill', {
	uid: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: false },
	kosmetyki	:		Sequelize.INTEGER,
	odziez		: 		Sequelize.INTEGER,
	bizuteria 	:		Sequelize.INTEGER,
	obuwie		: 		Sequelize.INTEGER,
	dodatki		: 		Sequelize.INTEGER,
	bielizna	:		Sequelize.INTEGER,	
	zabawki		:		Sequelize.INTEGER	
  },{
	createdAt: false,
	updatedAt: false,
	tableName: 'membersPVPSkill',
    classMethods: {
      associate: function(models) {
        // define relationships here
		//latarnia.hasMany(models.latarniaClient);
      },
	  
	  wyruchajSadoMaso: function(uid,enemy,uidItems,enemyItems,uidSyndykatCount,enemySyndykatCount,uidLevel,enemyLevel,ciag,uidHarem,enemyHarem){
		var members = this;
		return new Promise(function(resolve, reject){
			
			membersPVPSkill.findAll({
				where: {
					$or: [{uid: uid},{uid:enemy}]
				}				
			}).then(function(dane){
				
				var uidPVPSkills = (dane[0].uid == uid)? dane[0] : dane[1];
				var enemyPVPSkills = (dane[1].uid == enemy)? dane[1] : dane[0];
				
				//trzeba posumowac itemy do skilli!
				//Limit przedmiotow ustalamy na level * 5 lub ilosc czlonkow syndykatu wybieramy wartosc mniejsza!!
				uidLimits = (uidLevel * 5 > uidSyndykatCount)? uidSyndykatCount : uidLevel * 5;
				enemyLimits = (enemyLevel * 5 > enemySyndykatCount)? enemySyndykatCount : enemyLevel * 5;
				uidLimits++;//dodajemy siebie!!
				enemyLimits++;
				
				var uidStatsFight = JSON.parse(JSON.stringify(uidPVPSkills));
				var enemyStatsFight = JSON.parse(JSON.stringify(enemyPVPSkills));
				
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
									winner: uid,
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
									winner: enemy,
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
							uidPoints += (rr.winner == uid)? 1 :0;
							enemyPoints += (rr.winner == enemy)? 1 :0;
							callbackInner();
						},function(done){
							callback();
						});	
					}
				],function(err, result){
					var finalWinner = 0;
					if(uidPoints != enemyPoints)
					{
						finalWinner = (uidPoints > enemyPoints)? uid : enemy;
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
		}); 
	  },
	  
	  
	}
	
	
  }
  );
  
  
  
}