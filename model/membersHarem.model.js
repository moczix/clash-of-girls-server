module.exports = function(sequelize,Sequelize, DataTypes) {


return sequelize.define('membersHarem', {
	uidHaremID: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	uid			:		Sequelize.INTEGER,
	haremID		:		Sequelize.INTEGER,
	amount		:		Sequelize.INTEGER
  },{
	createdAt: false,
	updatedAt: false,
	tableName: 'membersHarem',
    classMethods: {
      associate: function(models) {
        // define relationships here
		//latarnia.hasMany(models.latarniaClient);
      },
  
  
	  
	  getMemberStats: function(uid,ciag)
	  {
		var membersHarem = this;
		return new Promise(function(resolve, reject){
			var uidStats = {};
			async.each(ciag, function(cc, callbackOut){
				uidStats[cc] = 0;
				callbackOut();
			},function(done){
				membersHarem.belongsTo(harem, {foreignKey:'haremID'});
				membersHarem.findAll({
					where:{uid: uid},
					include:[
						{
							model: harem
						}
					]				
				}).then(function(result){
					async.each(result, function(res, callback){
						uidStats[res.harem.typ1] += (res.amount * res.harem.val);
						callback();
					},function(done){
						console.log(uidStats);
						resolve(uidStats);
					});				
				});
				
			});
		});  
	  },
  
  
	}
	
	
  }
  );
  
  
  
}