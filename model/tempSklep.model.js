
module.exports = function(sequelize,Sequelize, DataTypes) {
return sequelize.define('tempSklep', {
	sitemID	: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	itemID		:	 Sequelize.INTEGER,
	val 		:	Sequelize.INTEGER,
	cena			:	 Sequelize.INTEGER,
  },{
	createdAt: false,
	updatedAt: false,
	tableName: 'tempSklep',
    classMethods: {
      associate: function(models) {
        // define relationships here
      }, 
	  
	  
	  getItemsFromRange: function(range)
	  {
		var tempSklep = this;
		return new Promise(function(resolve, reject){
			tempSklep.belongsTo(items1, {foreignKey: 'itemID', as:'main'});
			tempSklep.findAll({
				include:[
					{
						model: items1, as:'main', attributes:['nazwa','typ1','level','image_src']
					}
				],
				order: [
					['val','desc']
				]
			}).then(function(result){
				var items = [];
				async.each(result, function(res, callback){
					if(res.main.level == range)
					{
						items.push(res);
					}
					callback();
				},function(done){
					resolve(items);
				});
			});
		});  
	  },
	  getAllItems: function()
	  {
		var tempSklep = this;
		return new Promise(function(resolve, reject){
			tempSklep.belongsTo(items1, {foreignKey: 'itemID', as:'main'});
			tempSklep.findAll({
				include:[
					{
						model: items1, as:'main', attributes:['nazwa','typ1','level','image_src']
					}
				],
				order: [
					['val','desc']
				]
			}).then(function(result){
				resolve(result);
			});
		}); 
	  },
	  
	  buyItem: function(userInstance, item)
	  {
		var tempSklep = this;
		return new Promise(function(resolve, reject){
			tempSklep.findById(item).then(function(result){
				try
				{
					if(userInstance.hajs >= result.cena)
					{
						membersItem.create({
							uid: userInstance.uid,
							itemID: result.itemID,
							val: result.val
						}).then(function(res){
							userInstance.hajs -= result.cena;
							userInstance.save().then(function(){
								resolve({error:""});
							});
						});
					}
					else
					{
						reject({error:"Nie stać cię na tą zabawkę!"});
					}
				}catch(err){};
			});
		}); 
	  }
    }
  });

}
