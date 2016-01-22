module.exports = function(sequelize,Sequelize, DataTypes) {


	
return sequelize.define('items1', {
	itemID: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: false },
	nazwa	:		Sequelize.STRING,
	typ1	: 		Sequelize.STRING,
	min1 	:		Sequelize.INTEGER,
	max1	: 		Sequelize.INTEGER,
	szansa	:		Sequelize.FLOAT,
	rare	:		Sequelize.INTEGER,
	locID	:		Sequelize.INTEGER,
	orlocID :		Sequelize.INTEGER,
	level	:		Sequelize.INTEGER,
	image_src:		Sequelize.STRING
  },{
	createdAt: false,
	updatedAt: false,
	tableName: 'items1',
    classMethods: {
      associate: function(models) {
        // define relationships here
		//latarnia.hasMany(models.latarniaClient);
      },
	  
	  
	  szansaNaItem: function(szansa){
		  var szanse = [
			0.01, 
			0.1,
			0.15,
			0.25,
			0.4,
			0.6,
			0.8,
			1,
			1.2,
			1.5,
			2,
			6,
			7,
			8,
			9,
			10,
			12,
			13,
			14,
			18,
			27,
			28,
			29,
			30,
			35,
			38,
			40,
			45,
			50
		  ];
		  for(var i = 0; i < szanse.length; ++i)
		  {
			  if(szansa <= szanse[i])
			  {
				  return szanse[i];
			  }
		  }
		  return 50;
	  },
	  
	  losujItem: function(uid, locID, losuj, pvp){
		var items1 = this;
		return new Promise(function(resolve, reject){
			//losuj = 0;//skasowac!!
			if(pvp == 0)
			{
				if(losuj == 1)
				{
					if(custom.rand(0,100) <= 15)
					{
						items1.findAll({
							where: {
								$or: [{locID: locID}, {orlocID: locID}]  
							}						
						}).then(function(itemik){
							var select = custom.rand(0,itemik.length);
							console.log(itemik[select].nazwa);
							membersItem.create({
								itemID: itemik[select].itemID,
								val: custom.rand(itemik[select].min1, itemik[select].max1),
								uid: uid
							}).then(function(created){
								resolve({item:{nazwa:itemik[select].nazwa,level: itemik[select].level, image_src:itemik[select].image_src, typ: itemik[select].typ1, val:created.val }});
							});
						});
					}
					else
					{
						resolve({item:""});
					}
				}
				else
				{
					resolve({item:""});
				}
			}
			else
			{
				if(losuj == 1)
				{
					if(custom.rand(0,100) <= 8)
					{
						var szansa = custom.rand(1,50000) / 1000;
						var finallySzansa = items1.szansaNaItem(szansa);
						
						items1.findAll({
							where: {
								szansa: finallySzansa
							}
						}).then(function(itemik){
							select = custom.rand(0,itemik.length);
							try
							{
								membersItem.create({
									itemID: itemik[select].itemID,
									val: custom.rand(itemik[select].min1, itemik[select].max1),
									uid: uid
								}).then(function(created){
									resolve({item:{nazwa:itemik[select].nazwa, image_src:itemik[select].image_src, typ: itemik[select].typ1, val:created.val, level:itemik[select].level }});
								});
							}catch(err){
								resolve({item:""});	
							};
						});
					}
					else
					{
					resolve({item:""});	
					}
				}
				else
				{
					resolve({item:""});
				}			
			}
		}); 
	  }
	  
	}
	
	
  }
  );
  

  
}