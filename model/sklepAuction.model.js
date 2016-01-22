
module.exports = function(sequelize,Sequelize, DataTypes) {
return sequelize.define('sklepAuction', {
	auctionID	: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	mitemID		:	 Sequelize.INTEGER,
	cena 		:	Sequelize.INTEGER,
	uid			:	 Sequelize.INTEGER,
  },{
	createdAt: false,
	updatedAt: false,
	tableName: 'sklepAuction',
    classMethods: {
      associate: function(models) {
        // define relationships here
      }, 
	  
	  buyItem: function(userInstance, auctionID)
	  {
		var sklepAuction = this;
		return new Promise(function(resolve, reject){   
			sklepAuction.belongsTo(membersItem, {foreignKey:'mitemID'});
			membersItem.belongsTo(membersPushSettings, {foreignKey: 'uid'});
			membersItem.belongsTo(members, {foreignKey: 'uid'});
			sklepAuction.findOne({
				where: {auctionID: auctionID},
				include: [
					{
						model: membersItem,
						include: [
							{
								model: membersPushSettings
							},
							{
								model: members, attributes: ['pushID','uid']
							}
						]
					}				
				]				
			}).then(function(itemInstance){
				if(itemInstance.uid != userInstance.uid)
				{
					if(userInstance.hajs >= itemInstance.cena)
					{
						var seller = itemInstance.membersItem.member;
						var settings = itemInstance.membersItem.membersPushSetting;
						itemInstance.membersItem.uid = userInstance.uid;
						userInstance.hajs -= itemInstance.cena;
						itemInstance.membersItem.save().then(function(){
							itemInstance.destroy().then(function(){
								userInstance.save().then(function(){
									resolve({error:"", "seller":seller, "settings":settings});
								});
							});
						});						
					}else reject({error:"Nie masz tyle hajsu!"});				
				}			
			});
		});
	  },
	  
	  changeMyCostSale: function(uid, cena, auctionID)
	  {
		var sklepAuction = this;
		return new Promise(function(resolve, reject){  
			sklepAuction.findById(auctionID).then(function(itemInstance){
				if(itemInstance.uid == uid)
				{
					if(custom.IsNumeric(cena))
					{
						itemInstance.cena = cena;
						itemInstance.save().then(function(result){
							resolve({error:""});
						});
					}					
				}				
			});		
		});		  
	  },
	  
	  
	  getAll: function(uid)
	  {
		var sklepAuction = this;
		return new Promise(function(resolve, reject){  
		sklepAuction.belongsTo(members, {foreignKey: 'uid', as:'user'});
		sklepAuction.belongsTo(membersItem, {foreignKey:'mitemID',as:'item'});
		membersItem.belongsTo(items1, {foreignKey: 'itemID', as:'main'});
		  sklepAuction.findAll({
			  include:[
				  {
					  model: membersItem, as:'item',
						  include: [
						  {
							 model: items1, as:'main'
						  }					  
					  ]
				  },
					{
						model: members, as: 'user',attributes:['login','uid']
					}		  
			  ]
			  
		  }).then(function(result){
			var forSale = [];
			var mySale = [];
			
			async.each(result, function(res, callback){
				if(res.uid == uid)
				{
					mySale.push(res);
				}
				else
				{
					forSale.push(res);
				}
				callback();
			},function(done){
				resolve({
					forSale: forSale,
					mySale : mySale
				});
			});

		  });
		});
	  },
	  
	  createSell: function(itemInstance,cena)
	  {
		var sklepAuction = this;
		return new Promise(function(resolve, reject){
			sklepAuction.count({
				where:{mitemID: itemInstance.mitemID}
			}).then(function(count){
				if(count == 0)
				{
					sklepAuction.create({
						mitemID: itemInstance.mitemID,
						cena: cena,
						uid: itemInstance.uid
					}).then(function(result){
						resolve({error:""});
					});
				}
				else
				{
					reject({error:"Ta zabawka jest już wystawiona!"});
				}
			});
		});
	  }
	  
    }
  });

}
