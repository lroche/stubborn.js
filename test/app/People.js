define(["dojo/_base/declare", 
		"dojo/Evented",
		"testApp/hello"
		], function(declare, Evented, hello, bye){
	
	return declare([Evented], {
		engage:function(){
			this.emit("hello", {message:hello()});
		},
		retire:function(){
			this.emit("bye", {message:bye()});
		},
	});


})