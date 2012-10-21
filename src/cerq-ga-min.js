/*
 CERQ (Google Analytics)

 Copyright (c) 2012, Prakhar Birla
 All rights reserved.

 Distributed under BSD-3 Clause license.
*/
(function(){var c=window;function f(a){var b=[],i="[object Array]"==Object.prototype.toString.call(Object(a)),g;for(g in a){var d=a[g];if("object"==typeof d)i?b.push(f(d)):b[g]=f(d);else{var e="";i||(e='"'+g+'":');e="number"==typeof d?e+d:!1===d?e+"false":!0===d?e+"true":e+('"'+d+'"');b.push(e)}}a=b.join(",");return i?"["+a+"]":"{"+a+"}"}function h(){var a=j;for(j=[];0<a.length&&k(a[0])&&!(a.shift(),0<j.length););j=j.concat(a);return!0}
function l(a){j.push(a);m&&c.clearTimeout(m);m=c.setTimeout(h,0);return!0}function k(a){if(!a||3!=a.length)return!0;var b={m:a[0],f:a[1],l:a[2],d:n},a=b.f;delete b.f;b=f(b);b=["_trackEvent","CERQ",a,b];_gaq.push(b);return!0}var p=c._cerq,m,j=[],n="before";"[object Array]"==Object.prototype.toString.call(Object(p))&&(c._cerq=j,c._cerq.push=l,0<p.length&&(j=j.concat(p),h()),n="after")}();