module.exports = function(sequelize,Sequelize, DataTypes) {


return sequelize.define('notifyComments', {
	comID: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	rapID		:		Sequelize.INTEGER,
	uid			: 		Sequelize.INTEGER,
	timestamp	:		Sequelize.INTEGER,
	txt			:		Sequelize.TEXT
  },{
	createdAt: false,
	updatedAt: false,
	tableName: 'notifyComments',
    classMethods: {
      associate: function(models) {
        // define relationships here
		//latarnia.hasMany(models.latarniaClient);
      },
	  
	  
	  getComments: function(rapID, limit, offset)
	  {
		if(typeof offset == "undefined") offset = 0;
		if(typeof limit == "undefined") limit = 100;
		var notifyComments = this;
		return new Promise(function(resolve, reject){
			notifyComments.belongsTo(members, {foreignKey: 'uid', as:'login'});
			notifyComments.findAll({
				where:{
					rapID: rapID
				},
				include: [
					{
						model: members, as: 'login', required:false,attributes:['login'],
					}
				],
				order: [['timestamp','DESC']],
				offset: offset,
				limit: limit
			}).then(function(result){
				//result = result.toJSON();
				async.each(result, function(res, callback){
					res.timestamp = custom.timeStr(res.timestamp);
					callback();
				},function(done){
					resolve(result);
				});
			});
		}); 
	  },
	  
	  sendComment : function(rapID, uid, txt)
	  {
		  var notifyComments = this;
		  return new Promise(function(resolve, reject){
			  if(txt.length <= 1000 && txt.length > 0)
			  {
				  notifyComments.create({
					rapID: rapID,
					uid: uid,
					txt: txt,
					timestamp: custom.time()
				  }).then(function(result){
					  result = result.toJSON();
					  result.timestamp = custom.timeStr(result.timestamp);
					  result.login = {
						  login : ""
					  }
					  resolve(result);
				  });
			  }			  
		  });		  
	  }
  
	}
	
  }
  );
  
  
  
}