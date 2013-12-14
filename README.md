stubborn.js
========

What is it ?
-----
stubborn.js is an AMD helper module useful mainly for stubbing [Dojo](http://dojotoolkit.org)-built Components. 
It was been designed to be compliant with "Async" mode of Dojo AMD Loader only.




How to get it ?
-----

single file ready to use can be get directly from source: [stubborn.js](stubborn.js)

or you can use [volojs](http://volojs.org):

	volo add lroche/stubborn.js


How to use it ?
-----

stubborn.js is an AMD module, so it can be used like any other AMD module.

It provides a simple method to create a stub of AMD Module:

`sb.create(String targetAMD, Object stubMap): dojo/Promise`

such as:

*	targetAMD: is the sut (Subject Under Test).
*	stubMap: is the map of stubs used when sut will be created, this map may be a partial list of deps of sut.



Examples
-----
Here we set directly AMD dependencies impl, stub implementation can be partial:

	var sut;
	stubborn.create("pkg/AlmostHuman",{
		    "dojo/_base/lang": {
		    	isAlien:function(){
		    		return true;
		    	}
		    }
	}).then(function(ImAStubOfAlmostHuman){
		sut = ImAStubOfAlmostHuman;
	});
	//...Test something with stubbed module

Or you can use a external js to use another implementation to replace completly dependency:

	var sutStubbedModule;
	
	stubborn.create("pkg/sutModule",{
		    "dojo/_base/lang": "stub/dojoBaseLang"
	}).then(function(aStubAMD){
		sutStubbedModule = aStubAMD;
	});
	//...Test something with stubbed module

Take a look on `test` directory to have more examples.

Stub Transitive Dependencies
-----
stubborn.js has been developped to support transitive dependency stubbing.

Stub transitive dependency can be useful when
you have a deep hierarchy of inheritance and you don't want to use SuperMethod or SuperClass, or sometimes component can't run correctly in the test environmment.


So, it''s possible to embed stubs creation:


	var sut;
	stubborn.create("pkg/ComplexComponentAlmostHuman",{
		    "dojo/_base/lang": {
		    	isAlien:function(){
		    		return true;
		    	}
		    }
	}).then(function(ccStub){
		stubborn.create("pkg/mySUT", {
			"pkg/ComplexComponentAlmostHuman": ccStub
		}).then(function(m)){
			sut = m;
		});
	})




Take a look on tests to have more examples.


Development
-----


stubborn.js is tested with Karma-runner and uses a karma-dojo-adapter to run
with Karma 0.8.x.

To see it in action clone the repository from github: `git clone https://github.com/lroche/stubborn.js`
Use `npm install` to install dependencies.
and launch `grunt`.

To start a dev session: `grunt dev`

Limitations
-----

Dojo Toolkit 1.8 or more.


License
-----

The MIT License (MIT)

Copyright (c) 2013 Lionel Roche

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
