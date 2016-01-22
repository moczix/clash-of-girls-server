
module.exports = function(sequelize,Sequelize, DataTypes) {
return sequelize.define('latarniaClientLog', {
	logid: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	locID:       Sequelize.INTEGER,
	chcicaInvested: Sequelize.INTEGER,
	uid: Sequelize.INTEGER,
	haremProcent: Sequelize.DOUBLE,
	locLevel: Sequelize.INTEGER,
  },{
	createdAt: false,
	updatedAt: false,
	tableName: 'latarniaLog',
    classMethods: {
      associate: function(models) {
        // define relationships here
      }, 
	  
    }
  });

}
