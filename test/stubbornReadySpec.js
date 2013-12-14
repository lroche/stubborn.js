define(["stubborn", "require"],function(sb, require, original){

	describe("stubborn", function(){
		it("should stub dojo/ready", function(){
			var app,
				readyStub = sinon.stub(),
				readySpy = sinon.spy();
			runs(function(){				
				sb.create("testApp/app", {
					"dojo/ready": readySpy
				}).then(function(m){
					app=m;
				});
			});
			waitsFor(function(){
				return typeof app !="undefined"
			}, "app should be here", 100);
			runs(function(){
				var onBoot = sinon.spy();
				app.on("boot", onBoot);
				//ready has been called
				expect(readySpy.called).toBe(true);				
				//Simulate ready event now:
				readySpy.callArg(0);
				expect(onBoot.called).toBe(true);
				expect(true).toBe(true)
				//original dojo custom config should be here:
				expect(onBoot.getCall(0).args[0]).toEqual({
					config:{
						foo:'bar',
        				car:'cdr',
        				welcomeMessage: "Hello World !"
					}
				})
			});
		});
		
	});
})