CERQ
====

CERQ (= **C**lient **ER**ror **Q**ueue) is a Javascript for logging client-side Javascript errors.

Distributed under BSD-3 Clause license.

### What can it do?

Log Javascript error information such as:

* Error message
* Error file
* Error line
* Page URL
* Browser name
* Browser version
* Timestamp (unix)
* Before or after the window load event.


### What version to use?

The script is available in two versions:

1. Send error data to Google Analytics as Events **cerq-ga.js**
	* Works out of the box!
	* Delay in GA showing the events data.
2. Send error data to Javascript Debug Console (via console.log) **cerq.js**
	* You will have to implement the `sendError` function.

### How to use?

Put the following code in the `<head>` tag

	<script type="text/javascript">
	var _cerq=[];(function(a,c){a.onerror=function(){_cerq.push(arguments)};
	var b=function(){var a=c.createElement("script");a.type="text/javascript";a.async=!0;
	a.src="/js/cerq-ga-min.js";var b=c.getElementsByTagName("script")[0];
	b.parentNode.insertBefore(a,b)};a.addEventListener&&(a.addEventListener("load",b,!1),1)
	||a.attachEvent&&a.attachEvent("onload",b)||b()})(window,document);
	</script>

Note: Be sure to change the script path in `a.src` as required.

### Using version 1 ([cerq-ga-min.js][cgm] minified via [Closure][gc])

Format of Event:  

	category: CERQ  
	action:   Error file URL  
	label:    JSON encoded error data object  

For example:   

	category: CERQ  
	action:   http://www.example.com/js/main.js  
	label:    {"m":"Uncaught ReferenceError: abc is not defined","l":299,"d":"before"}

Error data explained:

	{
		"m":"Uncaught ReferenceError: abc is not defined",	//error message
		"l":299,											//error line
		"d":"before"										//dom load state i.e. before or after
	}
	

Note: Page URL, Approximate Time, Browser Name & Browser Version are already
available in Google Analytics so they have been excluded.

If you are OK with this, then go ahead and use [cerq-ga-min.js][cgm] otherwise you can make changes in
[cerq-ga.js][cg].


### Using version 2 ([cerq.js][c]) or version 1 ([cerq-ga.js][cg])

For version 2, you need to implement the `sendError` function to transport the error as per your
needs.

See `processError` function for more details on the error data object.

Tips:

* If you enable the time stamp then GA won't be able to group the same error be default, instead you
will have to use the help of filters.
* Run finished script through [Closure][gc] for minfying. Closure removes the anonymous function
wrapper from the code, which must be put back in as follows:

		(function(){ /* Put the code in here */ })();


License
----

	Copyright (c) 2012, Prakhar Birla
	All rights reserved.

	Redistribution and use in source and binary forms, with or without
	modification, are permitted provided that the following conditions are met:
	    * Redistributions of source code must retain the above copyright
	      notice, this list of conditions and the following disclaimer.
	    * Redistributions in binary form must reproduce the above copyright
	      notice, this list of conditions and the following disclaimer in the
	      documentation and/or other materials provided with the distribution.
	    * Neither the name of the <organization> nor the
	      names of its contributors may be used to endorse or promote products
	      derived from this software without specific prior written permission.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
	ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	DISCLAIMED. IN NO EVENT SHALL PRAKHAR BIRLA BE LIABLE FOR ANY
	DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

[gc]: http://closure-compiler.appspot.com/home "Google's Closure Complier"
[cgm]: https://raw.github.com/birla/cerq/master/src/cerq-ga-min.js
[cg]: https://raw.github.com/birla/cerq/master/src/cerq-ga.js
[c]: https://raw.github.com/birla/cerq/master/src/cerq.js