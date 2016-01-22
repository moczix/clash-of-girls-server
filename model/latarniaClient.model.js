
module.exports = function(sequelize,Sequelize, DataTypes) {
return sequelize.define('latarniaClient', {
	cmyid: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: false },
	locID: Sequelize.INTEGER,
	nazwa :Sequelize.STRING,
	opis: Sequelize.STRING,
	chcica: Sequelize.INTEGER,
	chcicaNeed: Sequelize.INTEGER,
	hajsMin: Sequelize.INTEGER,
	hajsMax: Sequelize.INTEGER,
	procent: Sequelize.INTEGER,
	item: Sequelize.INTEGER
  },{
	createdAt: false,
	updatedAt: false,
	tableName: 'latarniaClient',
    classMethods: {
      associate: function(models) {
        // define relationships here
      }, 
	  
    }
  });

}
