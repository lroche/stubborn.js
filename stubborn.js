/*!
	stubborn.js v0.6.0
	Copyright (c) 2013 Lionel Roche.
	Distributed under MIT license
	See https://github.com/lroche/stubborn.js for more details 
*/
define([
    "dojo/has",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/aspect",
    "dojo/Deferred"
], function(has, array, lang, aspect, Deferred) {
    
    var _stubs={};
    
    function cleanEnv(modulePath){
        var mapProgs = require.mapProgs;
        var idx = -1;

        //Clean environment now:
        delete require.map[modulePath];

        array.some(mapProgs, function(item, index){
            if(item[0] === modulePath){
                idx = index; 
                return true;//break
            }
        });

        if(idx !=-1){
            mapProgs.splice(idx,1);
        }
        if(_stubs[modulePath]){
            require.modules[modulePath] = _stubs[modulePath];
        }
        delete _stubs[modulePath];
    }
    function uid(){
        return new Date().getTime();
    }
    function _define(key, impl){
		define(key, [], function(){
			return impl; 
		});
    }
    function wrapDefine(key, deps){
		define(key, deps, function(fakeImplJs){
			return fakeImplJs;
        });
    }
    return {
        create: function (modulePath, stubs) {
            
            var deferred = new Deferred(),
                map = {},
                gc = []; //list of moduleName to be garbaged later
            
            if(!has("dojo-undef-api")){
                throw new Error("Configuration Error: dojo-undef-api should be enabled in dojo's config");
            }
            if(!has("dojo-publish-privates")){
                throw new Error("Configuration Error: dojo-publish-privates should be enabled in dojo's config");
            }
            
            //Remove module currently in cache.
            //But we keep a ref on original module to be restored when modulePath will be garbaged.
            _stubs[modulePath] = require.modules[modulePath];           
            require.undef(modulePath);
            
            map[modulePath]={};
            
            for(var key in stubs){
                //Create unique id from stubbed module
                var stubModuleKey = key+uid()+modulePath;
               
                if(lang.isString(stubs[key])){
                    //wrapper                      
                    wrapDefine(stubModuleKey, [stubs[key]]);
                }
                else{
                    _define(stubModuleKey, stubs[key]);                    
                }
              
                map[modulePath][key]= stubModuleKey;
                gc.push(stubModuleKey);

            }
            require({map:map},[modulePath], function(m){                
                deferred.resolve(m);
            });
            var garbage = function(){
                //Clean environment now:                
                cleanEnv(modulePath);
                //Remove all stubs of cache and main stubbed module               
                array.map(gc, require.undef);
            };
            if(typeof jasmine !="undefined"){
                
                var currentSpec = jasmine.getEnv().currentSpec; //Jasmine 1.3
                if(!currentSpec && (typeof jasmineBridge !="undefined")){ //Jasmine 2
                    currentSpec = jasmineBridge.getEnv().currentSpec;
                } 
                if(currentSpec){
                    //we can remove all stubs at the end of the currentSpec of jasmine.
                    var h = aspect.after(currentSpec, "finishCallback", function(){
                        h.remove();
                        garbage();
                    });
                }
            }else{
                //Clean-up immedialty
                garbage();
            }           
            return deferred.promise;

        }
    };
});
