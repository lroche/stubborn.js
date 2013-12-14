define(["dojo/i18n!testApp/nls/msg", "dojo/string"], function(msg, string){
	return function(){
		return string.trim(msg.hello);
	}
});