define(["stubborn", "dojo/i18n"], function(sb){
	describe("stubborn supports", function(){

		it("plugin stubbing", function(){
			var hello;
			runs(function(){
				sb.create("testApp/proxyHello",{
					"testApp/amdPlugin":{
						load:sinon.stub().callsArgWith(2, sinon.stub().returns("salut")),
						dynamic:true
					}
				}
				).then(function(h){
					hello = h;
				});
			});
			waitsFor(function(){
				return typeof hello!="undefined"
			}, "hello should be here", 100);
			runs(function(){
				expect(hello()).toEqual("salut");
			});
		});
		it("to make stubs on module which need plugins", function(){
			var hello;
			runs(function(){
				sb.create("testApp/proxyHello").then(function(h){
					hello = h;
				});
			});
			waitsFor(function(){
				return typeof hello!="undefined"
			}, "hello should be here", 100);
			runs(function(){
				expect(hello()).toEqual("Hello World !");
			});
		});
		it("i18n plugin", function(){
			var hello;
			runs(function(){
				sb.create("testApp/helloi18n", {
					"dojo/i18n":{
						load:sinon.stub().callsArgWith(2, {hello:" salut "} ),
						dynamic:true
					}
				}).then(function(h){
					hello = h;
				});
			});
			waitsFor(function(){
				return typeof hello!="undefined"
			}, "helloi18n should be loaded", 100);
			runs(function(){
				expect(hello()).toEqual("salut");
			});
		});
		it("i18n plugin and more", function(){
			var hello;
			runs(function(){
				sb.create("testApp/helloi18n", {
					"dojo/i18n":{
						load:sinon.stub().callsArgWith(2, {hello:" salut "} ),
						dynamic:true
					},
					"dojo/string":{
						trim:sinon.stub().returnsArg(0)
					}
				}).then(function(h){
					hello = h;
				});
			});
			waitsFor(function(){
				return typeof hello!="undefined"
			}, "hello should be here", 100);
			runs(function(){
				expect(hello()).toEqual(" salut ");
			});
		});
		
	});
});