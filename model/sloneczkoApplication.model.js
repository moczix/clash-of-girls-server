module.exports = function(sequelize,Sequelize, DataTypes) {


return sequelize.define('sloneczkoApplication', {
	sappID: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	sloneczkoID		:		Sequelize.INTEGER,
	uid				: 		Sequelize.INTEGER,
  },{
	createdAt: false,
	updatedAt: false,
	tableName: 'sloneczkoApplication',
    classMethods: {
      associate: function(models) {
        // define relationships here
		//latarnia.hasMany(models.latarniaClient);
      },
	  
	  deleteMyApplication: function(uid, appID)
	  {
		var sloneczkoApplication = this;
		return new Promise(function(resolve, reject){
			sloneczkoApplication.findOne({
				where: {
					uid: custom.rcpd(uid),
					sappID: appID
				}				
			}).then(function(instance){
				if(instance != null)
				{
					instance.destroy({ force: true }).then(function(){
						resolve(true);
					});
				}
			});
			
		});
	  },
	  
	  getMyApplication: function(uid)
	  {
		var sloneczkoApplication = this;
		return new Promise(function(resolve, reject){
			sloneczkoApplication.belongsTo(sloneczko, {foreignKey: 'sloneczkoID'});
			sloneczko.belongsTo(members, {foreignKey:'owner'});
			sloneczkoApplication.findAll(
			{
				where: {uid: custom.rcpd(uid)},
				include: [
					{
						model: sloneczko,
						include:[
							{
								model: members, attributes: ['uid','login']
							}						
						]
					}
				]
			}).then(function(result){
				resolve(result);
			});
		});  
	  },
	  
	  sendApplication: function(sloneczkoID, uid)
	  {
		var sloneczkoApplication = this;
		return new Promise(function(resolve, reject){
			sloneczkoApplication.findOrCreate({
				where: {
					sloneczkoID: custom.rcpd(sloneczkoID),
					uid: custom.rcpd(uid)
				}
			}).spread(function(result,created){
				if(created)
				{
					resolve(true);
				}
				else
				{
					reject({error:"Wysłałaś już podanie do tego słoneczka"});
				}
			});
		});		  
	  }
	  
	}
	
	
  }
  );
  
  
  
}