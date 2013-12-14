define(["stubborn"], function(sb){
	describe("stubborn",function(){
		it("should stub transitive dependencies ", function(){
			var People,
				msg;
			runs(function(){
				
				sb.create("testApp/hello", {
					"dojo/_base/config":{
						appConfig: {
							welcomeMessage:"Hello You !"
						}
					}
				}).then(function(helloStub){
					sb.create("testApp/People", {
						"testApp/hello":helloStub
					}).then(function(p){
						People =p;
					})
				});
			});
			waitsFor(function(){
				return typeof People !="undefined"
			}, "People shoould be ready", 100);
			runs(function(){
				var p = new People();
				p.on("hello", function(e){
					msg = e.message;
				});
				p.engage();
			});
			waitsFor(function(){
				return msg == "Hello You !"
			},1, "message received from People instance doesn't match or something else");

		});
	});

});