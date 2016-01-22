
module.exports = function(sequelize,Sequelize, DataTypes) {
return sequelize.define('membersStats', {
	uid: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: false },
	pvpWin	:       Sequelize.INTEGER,
	pvpAll: Sequelize.INTEGER,
	clients:	Sequelize.INTEGER
  },{
	createdAt: false,
	updatedAt: false,
	tableName: 'membersStats',
    classMethods: {
      associate: function(models) {
        // define relationships here
      }, 
	  
	  
	getMasazHajs: function(uid, zmeczenie,zmeczenieMax)
	{
		var membersStats = this;
		return new Promise(function(resolve, reject){
			membersStats.findById(uid).then(function(result){
				var cenaForOne = result.pvpAll * 20;
				var cenaAll = (zmeczenieMax - zmeczenie) * cenaForOne;
				resolve(cenaAll);
			});			
		});
	},	  
	  
    }
  });

}
