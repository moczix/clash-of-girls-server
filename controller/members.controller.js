membersController = function()
{
	this.req;
	this.deviceID;
	this.uid;	
}


membersController.prototype = {
	
	
	route: function(res)
	{
		switch(this.req.action)
		{
			case 'getSkills':
				members.getUserSkills(this.uid).then(function(dane){
					res.send(dane);
				});
			break;
			case 'addSkill':
				var uid = this.uid;
				members.addSkill(uid, this.req.skill).then(function(dane){
					return members.getUserSkills(uid);
				}).then(function(dane){
					res.send(dane);
				});
			break;
		}
	}
	
	
}