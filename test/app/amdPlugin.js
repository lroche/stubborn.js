define({
		//A simple plugin which loads any AMD module
		//for tests purpose
		//usage: plugin!amdModule
      load: function (id, require, load) {
          require([id], function (value) {
              load(value);
          });
      }
  });