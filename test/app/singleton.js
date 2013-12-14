define([], function(){
	var count = 0;;
	return {
		value: function(){
			return count++;
		}
	}
});