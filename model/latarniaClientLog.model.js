
module.exports = function(sequelize,Sequelize, DataTypes) {
return sequelize.define('latarniaClientLog', {
	logid: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	cmyid:       Sequelize.INTEGER,
	locID: Sequelize.INTEGER,
	uid :Sequelize.INTEGER,
	procent: Sequelize.INTEGER,
	been: Sequelize.INTEGER,
  },{
	createdAt: false,
	updatedAt: false,
	tableName: 'latarniaClientLog',
    classMethods: {
      associate: function(models) {
        // define relationships here
      }, 
	  
    }
  });

}
