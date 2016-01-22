module.exports = function(sequelize,Sequelize, DataTypes) {


return sequelize.define('notifyRaportsDetail', {
	rapID: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: false },
	txt			:		Sequelize.TEXT,
  },{
	createdAt: false,
	updatedAt: false,
	tableName: 'notifyRaportsDetail',
    classMethods: {
      associate: function(models) {
        // define relationships here
		//latarnia.hasMany(models.latarniaClient);
      },
  
	}
	
	
  }
  );
  
  
  
}