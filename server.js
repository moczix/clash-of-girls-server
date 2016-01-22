
var server1 = require('http').createServer();
var io = require('socket.io')(server1);


var app = require('express')();
var http = require('http');
configDB = require('./config/config.js');

var fs = require('fs');


function updateSetti()
{
	fs.readFile('./config/sett.json', 'utf8', function (err, data) {
		try
		{
			var obj = JSON.parse(data);
			setti.sklepNextRefresh = obj.sklepNextRefresh;
			setti.rankingNextRefresh = obj.rankingNextRefresh;
			setti.haremHour = obj.haremHour;
		}catch(err){};
	});
}

setti = {
	sklepNextRefresh: 0,
	rankingNextRefresh: 0,
	haremHour: 0,
}
updateSetti();
setInterval(function(){
	updateSetti();
},30000);



Sequelize = require('sequelize');
gcm = require('node-gcm');
async = require('async');






sequelize = new Sequelize(configDB.db, configDB.username, configDB.password, {
  host: configDB.host,
  dialect: configDB.dialect,

  pool: {
    max: configDB.poolMax,
    min: configDB.poolMin,
    idle: configDB.Idle
  },
  //logging: false


});

members = sequelize.import(__dirname + "/model/members.model.js");
syndykatApplication = sequelize.import(__dirname + "/model/syndykatApplication.model.js");
syndykat =  sequelize.import(__dirname + "/model/syndykat.model.js");
membersPVPSkill = sequelize.import(__dirname + "/model/membersPVPSkill.model.js");
membersItem = sequelize.import(__dirname + "/model/membersItem.model.js"); 
latarniaLog = sequelize.import(__dirname + "/model/latarniaLog.model.js");
latarniaClientLog = sequelize.import(__dirname + "/model/latarniaClientLog.model.js");
latarniaClient = sequelize.import(__dirname + "/model/latarniaClient.model.js");
latarnia = sequelize.import(__dirname + "/model/latarnia.model.js");
items1 = sequelize.import(__dirname + "/model/items1.model.js");
notifyRaports = sequelize.import(__dirname + "/model/notifyRaports.model.js");
notifyRaportsDetail = sequelize.import(__dirname + "/model/notifyRaportsDetail.model.js");
notifyComments = sequelize.import(__dirname + "/model/notifyComments.model.js");
sklepAuction = sequelize.import(__dirname + "/model/sklepAuction.model.js");
tempSklep = sequelize.import(__dirname + "/model/tempSklep.model.js");
membersPushSettings = sequelize.import(__dirname + "/model/membersPushSettings.model.js");
membersStats = sequelize.import(__dirname + "/model/membersStats.model.js");
klachyChat = sequelize.import(__dirname + "/model/klachyChat.model.js");
harem = sequelize.import(__dirname + "/model/harem.model.js");
membersHarem = sequelize.import(__dirname + "/model/membersHarem.model.js");
sloneczkoApplication = sequelize.import(__dirname + "/model/sloneczkoApplication.model.js");
sloneczko =  sequelize.import(__dirname + "/model/sloneczko.model.js");

require('./data/custom.js');
require('./controller/boot.controller.js');
require('./controller/latarnia.controller.js');
require('./controller/members.controller.js');
require('./controller/syndykat.controller.js');
require('./controller/sadomaso.controller.js');
require('./controller/szafa.controller.js');
require('./controller/kurwisklep.controller.js');
require('./controller/harem.controller.js');
require('./controller/ustawienia.controller.js');
require('./controller/sloneczko.controller.js');


var socketMembers = [];
io.sockets.on('connection', function (socket) {
    console.log('socket connected: '+socket.id);
	
	
	socket.on('switchChat', function(data){
		async.forEachOf(socketMembers, function(value, key, callback){
			(value.socket == socket.id)? callback(value) : callback();
		},function(find){
			if(find)
			{
				socket.leave(find.country);
				find.country = data.room;
				socket.join(find.country);
				klachyChat.getNewestMsg(find.country).then(function(msgs){
					io.to(socket.id).emit('joinBar',{data:msgs});
				});
			}
		});
	});
	
	socket.on('sendKlach', function(data){
		if(data.msg.length <= 1000)
		{
			if(data.msg.length > 0)
			{
				async.forEachOf(socketMembers, function(value, key, callback){
					(value.socket == socket.id)? callback(value) : callback();
				},function(find){
					if(find)
					{
						klachyChat.addNewMsg(find.uid, data.msg, find.country).then(function(result){
							io.to(find.country).emit("newMsg",{"msg":data.msg,"room":find.country, uid:custom.rcpc(find.uid), "login":find.login, "timestamp":custom.timeStr(custom.time())});
						});
					}
				});
			}
		}		
	});
	
	socket.on('joinChat', function(data){
		members.getInfoForSocket(data.user).then(function(result){
			async.forEachOf(socketMembers, function(value, key, callback){
				console.log("find: "+value.socket);
				if(value.socket == socket.id)
				{
					callback(key);
				}
				callback();
			},function(find){
				if(!find || find === null)
				{
					socketMembers.push({
							socket: socket.id,
							login: result.login,
							uid: result.uid,
							country: result.country
					});
					socket.join(result.country);
					klachyChat.getNewestMsg(result.country).then(function(msgs){
						io.to(socket.id).emit('joinBar',{data:msgs});
					});
					//joinBar
				}
			});

			
		});
	});
	

    socket.on('disconnect', function () {
		
			async.forEachOf(socketMembers, function(value, key, callback){
				if(value.socket == socket.id)
				{
					socketMembers.splice(key, 1)
				}
				callback();
			});
        console.log('socket disconnected: '+socket.id);
    });

    socket.emit('text', 'wow. such event. very real time.');
});

server1.listen(3703);

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next){
	res.send('gownp');
});

app.post('/', function (req, res) {
		var deviceID = req.query.device;
		var uid = req.query.user;
		if(typeof deviceID != 'undefined' || uid != 0)
		{
			switch(req.query.typ)
			{
				case 'main':
					switch(req.query.section)
					{
						case 'player':
							var controller = new bootController();
							controller.req = req.query;
							controller.deviceID = deviceID;
							controller.uid = uid;
							controller.route(res);
						break;	
						case 'latarnia':
							var controller = new latarniaController();
							controller.req = req.query;
							controller.deviceID = deviceID;
							controller.uid = uid;
							controller.route(res);
						break;
						case 'postac':
							var controller = new membersController();
							controller.req = req.query;
							controller.deviceID = deviceID;
							controller.uid = uid;
							controller.route(res);
						break;
						case 'syndykat':
							var controller = new syndykatController();
							controller.req = req.query;
							controller.deviceID = deviceID;
							controller.uid = uid;
							controller.route(res);
						break;
						case 'sadomaso':
						
							var controller = new sadomasoController();
							controller.req = req.query;
							controller.deviceID = deviceID;
							controller.uid = uid;
							controller.route(res);
						break;
						case 'szafa':
							var controller = new szafaController();
							controller.req = req.query;
							controller.deviceID = deviceID;
							controller.uid = uid;
							controller.route(res);
						break;
						case 'kurwisklep':
							var controller = new kurwisklepController();
							controller.req = req.query;
							controller.deviceID = deviceID;
							controller.uid = uid;
							controller.route(res);
						break;
						case 'harem':
							var controller = new haremController();
							controller.req = req.query;
							controller.deviceID = deviceID;
							controller.uid = uid;
							controller.route(res);
						break;
						case 'ustawienia':
							var controller = new ustawieniaController();
							controller.req = req.query;
							controller.deviceID = deviceID;
							controller.uid = uid;
							controller.route(res);
						break;
						case 'sloneczko':
							var controller = new sloneczkoController();
							controller.req = req.query;
							controller.deviceID = deviceID;
							controller.uid = uid;
							controller.route(res);
						break;
					}
				break;
				
				
				
			}
			
		}
	//res.send(data);
});

var server = app.listen(3702,function () {
	
  var host = server.address().address;
  var port = server.address().port;
  
  console.log('Example app listening at http://%s:%s', host, port);
});

