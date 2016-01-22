module.exports = function(sequelize,Sequelize, DataTypes) {


/*
WZOR NA KOSZT NIEWOLNICY
CIAG GEOMETRYCZNY -> SUMA CIAGOW, DLATEGO BO KUPUJEMY KILKA NARAZ ALBO JEDNA, A NIE ZE PO KOLEI , WTEDY TRZALOBY W PETLI

Sn = a1 * (1-q^n/1-q);
a1 = cena podstawowa niewolnicy
n = liczba niewolnic ktore chcemy zakupic (obecna ilosc minus nastepna i mamy roznice)
q = wspolczynnik procentowy!

max dziwek jakie mozemy kupic!!
liczmy z sumy ale chcemy otrzymac N

czyli powyzszy wzor po przeksztalcenia wyglada tak

n = Log(q, ((((Sn / a1)-(Sn / a1 * 1.1))-1)*-1));



*/

return sequelize.define('harem', {
	haremID: {     type: Sequelize.INTEGER, primaryKey: true, autoIncrement: false },
	lvl			:		Sequelize.INTEGER,
	val			:		Sequelize.INTEGER,
	hajs		:		Sequelize.INTEGER,
	cena		:		Sequelize.INTEGER,
	typ1		:		Sequelize.STRING,
	nazwa_pl	:		Sequelize.STRING
  },{
	createdAt: false,
	updatedAt: false,
	tableName: 'harem',
    classMethods: {
      associate: function(models) {
        // define relationships here
		//latarnia.hasMany(models.latarniaClient);
      },
	  

	  
	  buySlave: function(userInstance, haremID, amount)//dlatego tu bo glownym jest harem! 
	  {
		var harem = this;
		return new Promise(function(resolve, reject){
			harem.hasOne(membersHarem, {foreignKey:'haremID', as: 'userHarem'});
			harem.findOne({
				where:{haremID: haremID},
				include:[
					{
						model: membersHarem, as:'userHarem', required:false, where:{uid: userInstance.uid}
					}
				]
			}).then(function(res){
				if(res != null)
				{
					var haremHave = (res.userHarem != null)? res.userHarem.amount : 0;
					var currentPaid = custom.haremCostOnLvl(haremHave, res.cena,configDB.procentHaremUp);
					if(haremHave == 0) currentPaid = 0;
						
					var cena = custom.haremCostOnLvl(amount, res.cena, configDB.procentHaremUp)-currentPaid;
					var amountFixed = parseInt(amount) - haremHave;
					if(cena <= userInstance.hajs)
					{//stac mnie!
						if(res.lvl <= userInstance.level)
						{
							userInstance.hajs -= cena;
							userInstance.save().then(function(){
								if(res.userHarem != null)
								{
									res.userHarem.amount += amountFixed;
									res.userHarem.save().then(function(){
										resolve(true);
									});							
								}
								else
								{
									membersHarem.create({
										uid: userInstance.uid,
										haremID	: res.haremID,
										amount	: amountFixed 
									}).then(function(){
										resolve(true);
									});									
								}	
							});
						}
					}
				}				
			});
		}); 
	  },

	  getAvailableSlave: function(userInstance){
		var harem = this;
		return new Promise(function(resolve, reject){
			harem.hasOne(membersHarem, {foreignKey:'haremID', as: 'userHarem'});
			harem.findAll({
				where:{lvl: {$lte: userInstance.level+10}},
				include:[
					{
						model: membersHarem, as:'userHarem', required:false, where:{uid: userInstance.uid}
					}
				]
			}).then(function(result){
				var tempRes = [];
				var przychod = 0;
				var typ1 = {kosmetyki:0, odziez:0, bizuteria:0, obuwie:0, dodatki:0, bielizna:0, zabawki:0};
				console.log(userInstance.hajs);
				async.each(result, function(res, callback){
					var haremHave = (res.userHarem != null)? res.userHarem.amount : 0;
					var currentPaid = custom.haremCostOnLvl(haremHave, res.cena,configDB.procentHaremUp);
					if(haremHave == 0) currentPaid = 0;
					przychod += (haremHave * res.hajs);
					typ1[res.typ1] += (haremHave * res.val);
					
					var max = custom.mathLog(configDB.procentHaremUp,((((userInstance.hajs+currentPaid) / res.cena) - ((userInstance.hajs+currentPaid) / res.cena * configDB.procentHaremUp))-1)*-1),//liczone N z sumy ciagow geometrycznych//wzor na samej gorze!!;
					max = (max > haremHave)? max : haremHave;
					
					tempRes.push({
						cena: res.cena,
						hajs: res.hajs,
						haremID: res.haremID,
						lvl: res.lvl,
						typ1: res.typ1,
						val: res.val,
						have: haremHave,
						currentPaid: currentPaid,
						max: max,
						upHave: parseInt(haremHave),
						nazwa_pl: res.nazwa_pl,
						lock: res.lvl <= userInstance.level? 0: 1
					});
					callback();
				},function(done){
					
					latarniaLog.sum('haremProcent', { where: {uid:userInstance.uid }}).then(function(haremProcent) {//bonus z lokacji!
						if(haremProcent > 0)
						{
							haremProcent /= 100;
						}
						var bonusPrzychod = przychod * haremProcent;
						resolve({
							hajs: userInstance.hajs,
							przychod: przychod,
							bonusPrzychod: bonusPrzychod,
							currentHarem: userInstance.haremHajs,
							kosmetyki:typ1.kosmetyki,
							odziez:typ1.odziez,
							bizuteria:typ1.bizuteria,
							obuwie:typ1.obuwie,
							dodatki:typ1.dodatki,
							bielizna:typ1.bielizna,
							zabawki:typ1.zabawki,						
							haremki: tempRes,
						});
					});
				});
			});
		});		  
	  }
  
	}
	
	
  }
  );
  
  
  
}