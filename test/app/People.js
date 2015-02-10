define(["dojo/_base/declare", 
		"dojo/Evented",
		"testApp/hello",
		"testApp/singleton"
		], function(declare, Evented, hello, singleton){
	
	return declare([Evented], {
		engage:function(){
			this.emit("hello", {message:hello()});
		},
		smile:function(){
			this.emit("smile", {message:singleton.value()})
		}
	});


})