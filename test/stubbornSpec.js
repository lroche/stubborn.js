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
		
	});
})