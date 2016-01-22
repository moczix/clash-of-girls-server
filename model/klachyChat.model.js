module.exports = function(sequelize,Sequelize, DataTypes) {


return sequelize.define('klachyChat', {
	barID: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	uid			:		Sequelize.INTEGER,
	msg			: 	Sequelize.STRING,
	timestamp	:	Sequelize.INTEGER,
	room		:	Sequelize.STRING
  },{
	createdAt: false,
	updatedAt: false,
	tableName: 'klachyChat',
    classMethods: {
      associate: function(models) {
        // define relationships here
		//latarnia.hasMany(models.latarniaClient);
      },
	  
		addNewMsg: function(uid, msg, room)
		{
			var klachyChat = this;
			return new Promise(function(resolve, reject){
				klachyChat.create({
					uid: uid,
					msg: msg,
					room: room,
					timestamp: custom.time(),
				}).then(function(result){
					resolve(result);
				});
			});
		},
		getNewestMsg: function(room)
		{
			var klachyChat = this;
			return new Promise(function(resolve, reject){
				klachyChat.belongsTo(members, {foreignKey: 'uid', as:'players'});
				klachyChat.findAll({
					where: {room: room},
					include: [
						{
							model: members, as : 'players', attributes:['login']
						}
					],
					order:[
						['timestamp','desc']
					],
					limit: 100
				}).then(function(result){
					var texts = [];
					async.forEachOf(result, function(value, key, callback){
						texts.push({
							login: value.players.login,
							timestamp: custom.timeStr(value.timestamp),
							msg: value.msg,
							uid: custom.rcpc(value.uid)
						});
						callback();
					},function(done){
						resolve(texts.reverse());
					});
				});
			});	
		}
  
	}
	
	
  }
  );
  
  
  
}