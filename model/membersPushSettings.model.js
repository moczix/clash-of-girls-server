
module.exports = function(sequelize,Sequelize, DataTypes) {//jak tu dodajesz kolumny to zaktualizuj rejestracje w members
return sequelize.define('membersPushSettings', {
	uid	: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: false},
	sadomaso		:	 Sequelize.INTEGER,
	comments 		:	Sequelize.INTEGER,
	message			:	 Sequelize.INTEGER,
	applicationAccepted			:	 Sequelize.INTEGER,
	sellItem		:	Sequelize.INTEGER,
  },{
	createdAt: false,
	updatedAt: false,
	tableName: 'membersPushSettings',
    classMethods: {
      associate: function(models) {
        // define relationships here
      }, 
	  
	  
	  savePushSettings: function(array){
		var membersPushSettings = this;
		return new Promise(function(resolve, reject){
			console.log(array);
			var comments = array.comments == 'true' ? 1 : 0;
			var sadomaso = array.sadomaso == 'true' ? 1 : 0;
			var message = array.message == 'true' ? 1 : 0;
			var comments = array.comments == 'true' ? 1 : 0;
			var appaccepted = array.appaccepted == 'true' ? 1 : 0;
			var sellitem = array.sellitem == 'true' ? 1 : 0;
			membersPushSettings.findById(custom.rcpd(array.user)).then(function(result){
				result.sadomaso = sadomaso;
				result.comments	= comments;
				result.message = message;
				result.applicationAccepted = appaccepted;
				result.sellItem = sellitem;
				result.save().then(function(){			
					resolve(true);
				});
			});

		});		  
	  },
	  
	  getSettings: function(uid){
		var membersPushSettings = this;
		return new Promise(function(resolve, reject){
			membersPushSettings.findById(uid).then(function(result){
				resolve(result);
			});

		});	  
	  }
	  
    }
  });

}
