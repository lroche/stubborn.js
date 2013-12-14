define(["dojo/Evented", "dojo/ready", "dojo/_base/config"],function(Evented, ready, cfg){
	var app = new Evented();
	ready(function(){
	
		app.emit("boot", {config: cfg.appConfig})
	});
	return app;
});