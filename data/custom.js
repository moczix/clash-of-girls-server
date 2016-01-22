
Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));
    
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};


	custom = function()
	{

		
	};


custom.haremCostOnLvl = function(onLvl, cena,procent)
{
	return parseInt(cena * ((1-Math.pow(procent,onLvl)) / (1-procent)));//suma wyrazow ciagow geometrycznych!!!
}
	
	
custom.mathLog = function(base, extend)
{
	return parseInt((Math.log(extend)) / (Math.log(base)));
}
	
custom.push = function(devicePushID, title, tekst)
{
	try 
	{
		if(devicePushID != "")
		{
			//console.log(devicePushID);
				var googleApiKey = 'AIzaSyDPXZg2ZCjqnDWJafdywFfYpyhjST-7A0o';

			var message = new gcm.Message({
				notification: {
					title: title,
					body: tekst,
					//notId: custom.rand(1,1000000)
					style: 'inbox'
				}
			});

				var regTokens = [devicePushID];

				// Set up the sender with you API key
				var sender = new gcm.Sender(googleApiKey);

				// Now the sender can be used to send messages
				sender.send(message, { registrationTokens: regTokens }, function (err, response) {
					/*
					if(err) console.error(err);
					else    console.log(response);
					*/
				});
		}
	}
	catch(err){dumpError(err);};
}	
	
	
	
	
	
	
	
	
custom.IsNumeric = function(input){
    var RE = /^-{0,1}\d*\.{0,1}\d+$/;
    return (RE.test(input));
}	
	
custom.timeConverter = function(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var year = a.getFullYear();
  var month = a.getMonth()+1;
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  if(hour < 10) hour = '0'+hour;
  if(min < 10) min = '0'+min;
  if(sec < 10) sec = '0'+sec;
  if(month < 10) month = '0'+month;
  if(date < 10) date = '0'+date;


  
  return {
	Y: year,
	m: month,
	d: date,
	H: hour,
	i: min,
	s: sec 
  }
}
	
	custom.timeStr = function(timestamp)
	{
		
var date = custom.timeConverter(timestamp);
		
		var d = new Date();
		d.setHours(0,0,0,0);
		var today = d / 1000;
		
		var yesterday = today - (24 * 60 * 60);
		var tommorow = today + (24 * 60 * 60);
		var before2 = yesterday - (24 * 60 * 60);
		if(timestamp >= tommorow+(24 * 60 * 60)){
			koniec = date.Y+'-'+date.m+'-'+date.d+' '+date.H+':'+date.i+':'+date.s;
		}else if(timestamp >= tommorow){
			koniec = 'Jutro o '+date.H+':'+date.i+':'+date.s;
		}else if(timestamp >= today){
			koniec = 'Dziś o '+date.H+':'+date.i+':'+date.s;
		}else if(timestamp >= yesterday){
			koniec = 'Wczoraj o '+date.H+':'+date.i+':'+date.s;
		}else if(timestamp >= before2){
			koniec = 'Przedwczoraj o '+date.H+':'+date.i+':'+date.s;
		}else{
			koniec = date.Y+'-'+date.m+'-'+date.d+' '+date.H+':'+date.i+':'+date.s;
		}
		return koniec;
	}
	
	
	

custom.secStrDay = function(seconds,dayz)
{
	

	
	var day = Math.floor(seconds / 24 / 60 / 60);
	var left = seconds - day * 24 * 60 * 60;
	
	var hour = Math.floor( left / 60 / 60);
	
	//$hour = floor ($seconds / 60 / 60);
	//$hour = sprintf("%02d",  $hour);
	var min = seconds / 60;
	min = Math.floor(min % 60);

	//min = sprintf("%02d",  $min);
	var sec = Math.floor(seconds % 60);
	
	if(min <0) min *= -1;
	if(sec <0) sec *= -1;
	if(hour <0) hour *= -1;
	
	//sec = sprintf("%02d",  $sec);
	
	if(dayz == 1)
	{
		return day+'d '+hour+'g '+min+'m';
	}
	else
	{
		return hour+'g '+min+'m';
	}
}
	
	
	custom.rcpc = function(number)//aktualizuje po prostu, nie ma sensu zapisywac tych danych do pliku
	{
		number = ((parseInt(number) * 255) * 3);
		return number;
	};
	
	
	custom.rcpd = function(number)
	{
		return ((parseInt(number) / 255) / 3);
	};
	
	
	custom.makeString = function()
	{
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < 8; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}
	
	custom.time = function(){
		return Math.floor(new Date().getTime() / 1000);
	}
	
	custom.rand = function(min,max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
custom.dumpError = function(err){
  if (typeof err === 'object') {
    if (err.message) {
      console.log('\nMessage: ' + err.message)
    }
    if (err.stack) {
      console.log('\nStacktrace:')
      console.log('====================')
      console.log(err.stack);
    }
  } else {
    console.log('dumpError :: argument is not an object');
  }
}
	
	
	
	custom.sloneczkoEND = function(stamp)
	{
		return stamp+(1 * 60 * 60);
	}
	
	custom.syfEND = function(stamp)
	{
		return stamp+(1 * 24 * 60 * 60);
	}
	
	custom.okresEND = function(stamp)
	{
		return stamp+(3 * 24 * 60 * 60);
	}
	
	custom.ciazaEND = function(stamp)
	{
		return stamp+(2 * 24 * 60 * 60);
	}
	
	custom.findNextLevel = function(nextLevel)
	{
		if(nextLevel < 8)
		{
			switch(nextLevel)
			{
				case 1:
					return 10;
				break;
				case 2:
					return 25;
				break;
				case 3:
					return 45;
				break;
				case 4:
					return 65;
				break;
				case 5:
					return 105;
				break;
				case 6:
					return 155;
				break;
				case 7:
					return 225;
				break;
			}		
		}
		else
		{
			var start = 225;
			var skok = 125;
			var add = 7;
			for(var i = 7; i < nextLevel; ++i)
			{
				skok = skok +add;
				start += skok;
				if(i % 5 == 0)
				{
					add += 7;
				}
				if(i % 30 == 0)
				{
					add += 20;
				}
			}
			return start;
		}
	
	}