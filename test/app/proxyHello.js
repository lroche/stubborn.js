define(["testApp/amdPlugin!testApp/hello"],function(hello){
	return function(){
		return hello();
	}

});