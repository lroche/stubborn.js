//Dojo Configuration  :
var dojoConfig = {
    async:true, //All your sources MUST be AMD compliant !
    
	baseUrl: "/base/src",
    
    cacheBust:new Date(),
    packages:[
    	{name:"dojo", location:"/base/node_modules/dojo"},
    	{name:"stubborn", location:"/base", main:"stubborn"},

    	{name:"testApp", location:"/base/test/app"},
        {name:"testStub", location:"/base/test/stub"}
    ],
    //updated by karma-dojo-adapter:
    deps: null, 
    waitSeconds:30, 
    //custom objects for test purposes
    appConfig:{ 
    	foo:'bar',
        car:'cdr',
        welcomeMessage: "Hello World !"
    },
    has:{    	
        "dojo-undef-api":1
    },
    //Dojo Trace API 
    //for debugging :
    trace:{
    	"loader-run-factory":0,
    	"loader-define":0
    },
    //callback used when specified deps will be loaded:
    callback:null, //updated by karma-dojo-adapter
    loaderPatch: {
        undef: function(moduleId, referenceModule){
			// In order to reload a module, it must be undefined (this routine) and then re-requested.
			// This is useful for testing frameworks (at least).
			delete require.modules[moduleId];
			
		}
    },
    locale:"en"
}