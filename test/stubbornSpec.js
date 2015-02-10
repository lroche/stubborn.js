define(["stubborn", "require", "testApp/singleton"],function(sb, require, original){

	describe("stubborn", function(){
		
		it("should support singleton", function(){
			var singleton;
			runs(function(){				
				sb.create("testApp/singleton").then(function(m){
					singleton=m;
				});
			});
			waitsFor(function(){
				return typeof singleton !="undefined"
			}, "singleton should be here", 100);
			runs(function(){
				expect(singleton.value()).toBe(0);
				expect(singleton.value()).toBe(1);
			});
		});
		it("should clean cache correctly after each testCase", function(){
			var singleton = require("testApp/singleton");
			expect(singleton).toBe(original);
		});
		it("should support singleton really", function(){
			var singleton;
			runs(function(){				
				sb.create("testApp/singleton").then(function(m){
					singleton=m;
				});
			});
			waitsFor(function(){
				return typeof singleton !="undefined"
			}, "singleton should be here", 100);
			runs(function(){
				expect(singleton.value()).toBe(0);
				expect(singleton.value()).toBe(1);
			});
		});
		it("should support external fake implementation", function(){
			var hello;
			runs(function(){				
				sb.create("testApp/hello", {
					"dojo/_base/config": "testStub/fakeConfig"
				}).then(function(m){
					hello=m;
				});
			});
			waitsFor(function(){
				return typeof hello !="undefined"
			}, "hello module should be here", 100);
			runs(function(){
				expect(hello()).toEqual("Hello from Fake Config");
				
			});

		});
		it("should restore dependencies correctly", function(){
			var valueOriginal = original.value(), //now value is 1
				People; 
			runs(function(){
				sb.create("testApp/People", {
					"dojo/_base/config": "testStub/fakeConfig",
					"testApp/singleton": {
						value: function(){
							return -1;
						}
					}
				}).then(function(m){
					People=m;
				});
			});
			waitsFor(function(){
				return typeof People !="undefined"
			}, "People shoould be ready", 100);
			runs(function(){
				var p = new People();
				p.on("smile", function(e){
					msg = e.message;
				});
				p.smile();
			});
			waitsFor(function(){
				return msg == "-1"
			},1, "message received from People instance doesn't match or something else");
			runs(function(){
				//Check the original value, each dependency of stub module should be restored
				var singleton = require("testApp/singleton");
				expect(singleton).toBe(original);
				expect(require("testApp/singleton").value()).toBe(1);
			})
		});
		
	});
})