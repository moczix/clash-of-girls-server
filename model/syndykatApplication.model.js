module.exports = function(sequelize,Sequelize, DataTypes) {


return sequelize.define('syndykatApplication', {
	appID: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	syndykatID		:		Sequelize.INTEGER,
	uid				: 		Sequelize.INTEGER,
  },{
	createdAt: false,
	updatedAt: false,
	tableName: 'syndykatApplication',
    classMethods: {
      associate: function(models) {
        // define relationships here
		//latarnia.hasMany(models.latarniaClient);
      },
	  
	  deleteMyApplication: function(uid, appID)
	  {
		var syndykatApplication = this;
		return new Promise(function(resolve, reject){
			syndykatApplication.findOne({
				where: {
					uid: custom.rcpd(uid),
					appID: appID
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
		var syndykatApplication = this;
		return new Promise(function(resolve, reject){
			syndykatApplication.belongsTo(syndykat, {foreignKey: 'syndykatID'});
			syndykatApplication.findAll(
			{
				where: {uid: custom.rcpd(uid)},
				include: [
					{
						model: syndykat
					}
				]
			}).then(function(result){
				resolve(result);
			});
		});  
	  },
	  
	  sendApplication: function(syndykatID, uid)
	  {
		var syndykatApplication = this;
		return new Promise(function(resolve, reject){
			syndykatApplication.findOrCreate({
				where: {
					syndykatID: custom.rcpd(syndykatID),
					uid: custom.rcpd(uid)
				}
			}).spread(function(result,created){
				if(created)
				{
					resolve(true);
				}
				else
				{
					reject({error:"Wysłałaś już podanie do tego syndykatu"});
				}
			});
		});		  
	  }
	  
	}
	
	
  }
  );
  
  
  
}