// ==ClosureCompiler==
// @output_file_name cerq-min.js
// @compilation_level ADVANCED_OPTIMIZATIONS
// ==/ClosureCompiler==

/**
 * @preserve CERQ
 * 
 * Copyright (c) 2012, Prakhar Birla
 * All rights reserved.
 *
 * Distributed under BSD-3 Clause license.
 */
(function(w){
	//helpers
	
	/**
	 * isArray
	 * @param  {*} a target
	 * @return {boolean}   true if target is an array
	 */
	function isArray(a) {
		return '[object Array]' == Object.prototype.toString.call(Object(a));
	}

	/**
	 * Remove and return a property from the given object.
	 * @param  {Object} o Object to process
	 * @param  {string} p Property of object to pop
	 * @return 		return the value of property in object
	 */
	function objectPop(o,p){
		var r=o[p];
		delete o[p];
		return r;
	}

	/**
	 * JSON encode an object/array
	 * @param  {*} a Value to JSOB encode
	 * @return {string}   JSON encoded data
	 * @link http://www.openjs.com/scripts/data/json_encode.php
	 */
	function toJson(a) {
		var parts = [];
		var is_list = isArray(a);

		for(var key in a) {
			var v = a[key];
			if(typeof v == "object") { //Custom handling for arrays
				if(is_list) parts.push(toJson(v)); // RECURSION
				else parts[key] = toJson(v); // RECURSION
			} else {
				var str = "";
				if(!is_list) str = '"' + key + '":';

				//Custom handling for multiple data types
				if(typeof v == "number") str += v; //Numbers
				else if(v === false) str += 'false'; //The booleans
				else if(v === true) str += 'true';
				else str += '"' + v + '"'; //All other things

				parts.push(str);
			}
		}
		var json = parts.join(",");

		if(is_list) return '[' + json + ']';//Return numerical JSON
		return '{' + json + '}';//Return associative JSON
	}

	/**
	 * Get browser info
	 * @return {Array} [Browser Name, Browser Version]
	 */
	function browserInfo(){
		/**
		 * @link http://stackoverflow.com/questions/5916900/detect-version-of-browser/5918791
		 */
		
		var N= navigator.appName, ua= navigator.userAgent, tem;
		var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
		return M ? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
	}

	//main internals

	/**
	 * Process the internal Error Stack stored in erroQueue
	 * @return {boolean} always true
	 */
	function processErrorStack(){
		var res = errorQueue;
		//process and discard from queue
		for(errorQueue = []; 0 < res.length && processError(res[0]) && !(res.shift(), 0 < errorQueue.length) ; ){}
		//put leftovers back in the queue
		errorQueue = errorQueue.concat(res);
		return !0;
	}

	/**
	 * Handle push operation on global _cerq
	 * @param  {Arguments} e Arguments of window.onerror function
	 * @return {boolean}   always true
	 */
	function push(e){
		//push error to the internal error queue
		errorQueue.push(e);
		//clear old timeout if exists
		timeout && w.clearTimeout(timeout);
		//call processErrorStack when call stack is idle
		timeout = w.setTimeout(processErrorStack,0);
		return !0;
	}

	/**
	 * Process a single error.
	 * Create the error data object and call sendError for transport.
	 * @param  {Arguments} e Arguments of window.onerror function
	 * @return {boolean}   always true
	 */
	function processError(e){
		//if undefined or not error then do not process
		if(!e || e.length != 3) return !0;
		//create the error data object
		var p = {
			"m":e[0],										//error message
			"f":e[1],										//error file
			"l":e[2],										//error line
			"p":w.location.href,							//page url
			"b":bInfo[0],									//browser name
			"bv":bInfo[1],									//browser ver
			"t":Math.round((new Date()).getTime() / 1000),	//unix timestamp,
			"d":domState 									//dom load state i.e. before or after
		};
		//transport the error
		sendError(p);
		return !0;
	}

	/**
	 * Handle error data object transport
	 * @param  {Object} e Error data object
	 */
	function sendError(e){

		/**
		 * put your code to transport the error object here
		 * @note use toJson function to encode error in JSON
		 */

		//log to console, if available
		console.log && console.log(e);
	}

	//execute only once, on load
	var	oldInstance = w['_cerq'], //get the old instance of _cerq
	bInfo = browserInfo(), //load browser info
	timeout, //variable for timeout
	errorQueue = [], //internal error queue
	domState='before'; //initial dom load state

	if(isArray(oldInstance)) {
		//set _cerq as errorQueue, bind push to _cerq.push
		(w['_cerq']=errorQueue,w['_cerq'].push=push);
		//if old instance has any errors, then put them in the queue & process them
		oldInstance.length>0 && (errorQueue=errorQueue.concat(oldInstance),processErrorStack());
		//assuming that this script is loaded after dom, any new errors henceforth will be after dom load
		domState='after';
	}
})(window);