/*! For license information please see main.js.LICENSE.txt */
(()=>{var e={669:(e,t,n)=>{e.exports=n(609)},448:(e,t,n)=>{"use strict";var r=n(867),o=n(26),i=n(372),s=n(327),a=n(97),c=n(109),u=n(985),l=n(61),f=n(655),h=n(263);e.exports=function(e){return new Promise((function(t,n){var d,p=e.data,m=e.headers,g=e.responseType;function v(){e.cancelToken&&e.cancelToken.unsubscribe(d),e.signal&&e.signal.removeEventListener("abort",d)}r.isFormData(p)&&delete m["Content-Type"];var y=new XMLHttpRequest;if(e.auth){var w=e.auth.username||"",x=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";m.Authorization="Basic "+btoa(w+":"+x)}var b=a(e.baseURL,e.url);function S(){if(y){var r="getAllResponseHeaders"in y?c(y.getAllResponseHeaders()):null,i={data:g&&"text"!==g&&"json"!==g?y.response:y.responseText,status:y.status,statusText:y.statusText,headers:r,config:e,request:y};o((function(e){t(e),v()}),(function(e){n(e),v()}),i),y=null}}if(y.open(e.method.toUpperCase(),s(b,e.params,e.paramsSerializer),!0),y.timeout=e.timeout,"onloadend"in y?y.onloadend=S:y.onreadystatechange=function(){y&&4===y.readyState&&(0!==y.status||y.responseURL&&0===y.responseURL.indexOf("file:"))&&setTimeout(S)},y.onabort=function(){y&&(n(l("Request aborted",e,"ECONNABORTED",y)),y=null)},y.onerror=function(){n(l("Network Error",e,null,y)),y=null},y.ontimeout=function(){var t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",r=e.transitional||f.transitional;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(l(t,e,r.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",y)),y=null},r.isStandardBrowserEnv()){var E=(e.withCredentials||u(b))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;E&&(m[e.xsrfHeaderName]=E)}"setRequestHeader"in y&&r.forEach(m,(function(e,t){void 0===p&&"content-type"===t.toLowerCase()?delete m[t]:y.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(y.withCredentials=!!e.withCredentials),g&&"json"!==g&&(y.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&y.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&y.upload&&y.upload.addEventListener("progress",e.onUploadProgress),(e.cancelToken||e.signal)&&(d=function(e){y&&(n(!e||e&&e.type?new h("canceled"):e),y.abort(),y=null)},e.cancelToken&&e.cancelToken.subscribe(d),e.signal&&(e.signal.aborted?d():e.signal.addEventListener("abort",d))),p||(p=null),y.send(p)}))}},609:(e,t,n)=>{"use strict";var r=n(867),o=n(849),i=n(321),s=n(185),a=function e(t){var n=new i(t),a=o(i.prototype.request,n);return r.extend(a,i.prototype,n),r.extend(a,n),a.create=function(n){return e(s(t,n))},a}(n(655));a.Axios=i,a.Cancel=n(263),a.CancelToken=n(972),a.isCancel=n(502),a.VERSION=n(288).version,a.all=function(e){return Promise.all(e)},a.spread=n(713),a.isAxiosError=n(268),e.exports=a,e.exports.default=a},263:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},972:(e,t,n)=>{"use strict";var r=n(263);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;this.promise.then((function(e){if(n._listeners){var t,r=n._listeners.length;for(t=0;t<r;t++)n._listeners[t](e);n._listeners=null}})),this.promise.then=function(e){var t,r=new Promise((function(e){n.subscribe(e),t=e})).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.prototype.subscribe=function(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]},o.prototype.unsubscribe=function(e){if(this._listeners){var t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},502:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},321:(e,t,n)=>{"use strict";var r=n(867),o=n(327),i=n(782),s=n(572),a=n(185),c=n(875),u=c.validators;function l(e){this.defaults=e,this.interceptors={request:new i,response:new i}}l.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=a(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=e.transitional;void 0!==t&&c.assertOptions(t,{silentJSONParsing:u.transitional(u.boolean),forcedJSONParsing:u.transitional(u.boolean),clarifyTimeoutError:u.transitional(u.boolean)},!1);var n=[],r=!0;this.interceptors.request.forEach((function(t){"function"==typeof t.runWhen&&!1===t.runWhen(e)||(r=r&&t.synchronous,n.unshift(t.fulfilled,t.rejected))}));var o,i=[];if(this.interceptors.response.forEach((function(e){i.push(e.fulfilled,e.rejected)})),!r){var l=[s,void 0];for(Array.prototype.unshift.apply(l,n),l=l.concat(i),o=Promise.resolve(e);l.length;)o=o.then(l.shift(),l.shift());return o}for(var f=e;n.length;){var h=n.shift(),d=n.shift();try{f=h(f)}catch(e){d(e);break}}try{o=s(f)}catch(e){return Promise.reject(e)}for(;i.length;)o=o.then(i.shift(),i.shift());return o},l.prototype.getUri=function(e){return e=a(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(e){l.prototype[e]=function(t,n){return this.request(a(n||{},{method:e,url:t,data:(n||{}).data}))}})),r.forEach(["post","put","patch"],(function(e){l.prototype[e]=function(t,n,r){return this.request(a(r||{},{method:e,url:t,data:n}))}})),e.exports=l},782:(e,t,n)=>{"use strict";var r=n(867);function o(){this.handlers=[]}o.prototype.use=function(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},97:(e,t,n)=>{"use strict";var r=n(793),o=n(303);e.exports=function(e,t){return e&&!r(t)?o(e,t):t}},61:(e,t,n)=>{"use strict";var r=n(481);e.exports=function(e,t,n,o,i){var s=new Error(e);return r(s,t,n,o,i)}},572:(e,t,n)=>{"use strict";var r=n(867),o=n(527),i=n(502),s=n(655),a=n(263);function c(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new a("canceled")}e.exports=function(e){return c(e),e.headers=e.headers||{},e.data=o.call(e,e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||s.adapter)(e).then((function(t){return c(e),t.data=o.call(e,t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(c(e),t&&t.response&&(t.response.data=o.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},481:e=>{"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}},e}},185:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t){t=t||{};var n={};function o(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function i(n){return r.isUndefined(t[n])?r.isUndefined(e[n])?void 0:o(void 0,e[n]):o(e[n],t[n])}function s(e){if(!r.isUndefined(t[e]))return o(void 0,t[e])}function a(n){return r.isUndefined(t[n])?r.isUndefined(e[n])?void 0:o(void 0,e[n]):o(void 0,t[n])}function c(n){return n in t?o(e[n],t[n]):n in e?o(void 0,e[n]):void 0}var u={url:s,method:s,data:s,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutMessage:a,withCredentials:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,responseEncoding:a,validateStatus:c};return r.forEach(Object.keys(e).concat(Object.keys(t)),(function(e){var t=u[e]||i,o=t(e);r.isUndefined(o)&&t!==c||(n[e]=o)})),n}},26:(e,t,n)=>{"use strict";var r=n(61);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},527:(e,t,n)=>{"use strict";var r=n(867),o=n(655);e.exports=function(e,t,n){var i=this||o;return r.forEach(n,(function(n){e=n.call(i,e,t)})),e}},655:(e,t,n)=>{"use strict";var r=n(867),o=n(16),i=n(481),s={"Content-Type":"application/x-www-form-urlencoded"};function a(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var c,u={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(c=n(448)),c),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(a(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)||t&&"application/json"===t["Content-Type"]?(a(t,"application/json"),function(e,t,n){if(r.isString(e))try{return(0,JSON.parse)(e),r.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(0,JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){var t=this.transitional||u.transitional,n=t&&t.silentJSONParsing,o=t&&t.forcedJSONParsing,s=!n&&"json"===this.responseType;if(s||o&&r.isString(e)&&e.length)try{return JSON.parse(e)}catch(e){if(s){if("SyntaxError"===e.name)throw i(e,this,"E_JSON_PARSE");throw e}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],(function(e){u.headers[e]={}})),r.forEach(["post","put","patch"],(function(e){u.headers[e]=r.merge(s)})),e.exports=u},288:e=>{e.exports={version:"0.23.0"}},849:e=>{"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},327:(e,t,n)=>{"use strict";var r=n(867);function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(r.isURLSearchParams(t))i=t.toString();else{var s=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),s.push(o(t)+"="+o(e))})))})),i=s.join("&")}if(i){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}},303:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},372:(e,t,n)=>{"use strict";var r=n(867);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,i,s){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(i)&&a.push("domain="+i),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},793:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},268:e=>{"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}},985:(e,t,n)=>{"use strict";var r=n(867);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},16:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},109:(e,t,n)=>{"use strict";var r=n(867),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(r.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;s[t]="set-cookie"===t?(s[t]?s[t]:[]).concat([n]):s[t]?s[t]+", "+n:n}})),s):s}},713:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},875:(e,t,n)=>{"use strict";var r=n(288).version,o={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){o[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}}));var i={};o.transitional=function(e,t,n){function o(e,t){return"[Axios v"+r+"] Transitional option '"+e+"'"+t+(n?". "+n:"")}return function(n,r,s){if(!1===e)throw new Error(o(r," has been removed"+(t?" in "+t:"")));return t&&!i[r]&&(i[r]=!0,console.warn(o(r," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(n,r,s)}},e.exports={assertOptions:function(e,t,n){if("object"!=typeof e)throw new TypeError("options must be an object");for(var r=Object.keys(e),o=r.length;o-- >0;){var i=r[o],s=t[i];if(s){var a=e[i],c=void 0===a||s(a,i,e);if(!0!==c)throw new TypeError("option "+i+" must be "+c)}else if(!0!==n)throw Error("Unknown option "+i)}},validators:o}},867:(e,t,n)=>{"use strict";var r=n(849),o=Object.prototype.toString;function i(e){return"[object Array]"===o.call(e)}function s(e){return void 0===e}function a(e){return null!==e&&"object"==typeof e}function c(e){if("[object Object]"!==o.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function u(e){return"[object Function]"===o.call(e)}function l(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),i(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:function(e){return null!==e&&!s(e)&&null!==e.constructor&&!s(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isPlainObject:c,isUndefined:s,isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:u,isStream:function(e){return a(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:l,merge:function e(){var t={};function n(n,r){c(t[r])&&c(n)?t[r]=e(t[r],n):c(n)?t[r]=e({},n):i(n)?t[r]=n.slice():t[r]=n}for(var r=0,o=arguments.length;r<o;r++)l(arguments[r],n);return t},extend:function(e,t,n){return l(t,(function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t})),e},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},621:(e,t,n)=>{"use strict";n.d(t,{Z:()=>a});var r=n(81),o=n.n(r),i=n(645),s=n.n(i)()(o());s.push([e.id,"#dogeDonateBox{\r\n    opacity:0\r\n}\r\n\r\n#dogeDonateBox > canvas {\r\n    border:5px #BA8C63 solid;\r\n    margin:0px auto;\r\n}\r\n\r\n#doge_img{\r\n    opacity:0\r\n}",""]);const a=s},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,o,i){"string"==typeof e&&(e=[[null,e,void 0]]);var s={};if(r)for(var a=0;a<this.length;a++){var c=this[a][0];null!=c&&(s[c]=!0)}for(var u=0;u<e.length;u++){var l=[].concat(e[u]);r&&s[l[0]]||(void 0!==i&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=i),n&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=n):l[2]=n),o&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=o):l[4]="".concat(o)),t.push(l))}},t}},81:e=>{"use strict";e.exports=function(e){return e[1]}},277:(e,t,n)=>{var r,o,i;i=function(){var e,t,n=document,r=n.getElementsByTagName("head")[0],o={},i={},s={},a={};function c(e,t){for(var n=0,r=e.length;n<r;++n)if(!t(e[n]))return!1;return 1}function u(e,t){c(e,(function(e){return t(e),1}))}function l(t,n,r){t=t.push?t:[t];var h=n&&n.call,d=h?n:r,p=h?t.join(""):n,m=t.length;function g(e){return e.call?e():o[e]}function v(){if(!--m)for(var e in o[p]=1,d&&d(),s)c(e.split("|"),g)&&!u(s[e],g)&&(s[e]=[])}return setTimeout((function(){u(t,(function t(n,r){return null===n?v():(r||/^https?:\/\//.test(n)||!e||(n=-1===n.indexOf(".js")?e+n+".js":e+n),a[n]?(p&&(i[p]=1),2==a[n]?v():setTimeout((function(){t(n,!0)}),0)):(a[n]=1,p&&(i[p]=1),void f(n,v)))}))}),0),l}function f(e,o){var i,s=n.createElement("script");s.onload=s.onerror=s.onreadystatechange=function(){s.readyState&&!/^c|loade/.test(s.readyState)||i||(s.onload=s.onreadystatechange=null,i=1,a[e]=2,o())},s.async=1,s.src=t?e+(-1===e.indexOf("?")?"?":"&")+t:e,r.insertBefore(s,r.lastChild)}return l.get=f,l.order=function(e,t,n){!function r(o){o=e.shift(),e.length?l(o,r):l(o,t,n)}()},l.path=function(t){e=t},l.urlArgs=function(e){t=e},l.ready=function(e,t,n){e=e.push?e:[e];var r,i=[];return!u(e,(function(e){o[e]||i.push(e)}))&&c(e,(function(e){return o[e]}))?t():(r=e.join("|"),s[r]=s[r]||[],s[r].push(t),n&&n(i)),l},l.done=function(e){l([null],e)},l},e.exports?e.exports=i():void 0===(o="function"==typeof(r=i)?r.call(t,n,t,e):r)||(e.exports=o)},379:e=>{"use strict";var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var i={},s=[],a=0;a<e.length;a++){var c=e[a],u=r.base?c[0]+r.base:c[0],l=i[u]||0,f="".concat(u," ").concat(l);i[u]=l+1;var h=n(f),d={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==h)t[h].references++,t[h].updater(d);else{var p=o(d,r);r.byIndex=a,t.splice(a,0,{identifier:f,updater:p,references:1})}s.push(f)}return s}function o(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,o){var i=r(e=e||[],o=o||{});return function(e){e=e||[];for(var s=0;s<i.length;s++){var a=n(i[s]);t[a].references--}for(var c=r(e,o),u=0;u<i.length;u++){var l=n(i[u]);0===t[l].references&&(t[l].updater(),t.splice(l,1))}i=c}}},569:e=>{"use strict";var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:e=>{"use strict";e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{"use strict";e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{"use strict";e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var i=n.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{"use strict";e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},817:e=>{e.exports=function(){var e=[];return e.active=!1,e.place=function(t){e.push(t),e.active||e.next()},e.next=function(){if(e.length){var t=e.shift();e.active=!0,t()}else e.active=!1},e.clear=function(){e.length=0,e.active=!1},e}},980:(e,t,n)=>{"use strict";e.exports=n.p+"images/bbc147bb328b344663da.png"}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={id:r,exports:{}};return e[r](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{"use strict";var e=Matter.Bodies,t=Matter.Body;class r{constructor(e,t,n,r,o){this.x=e,this.y=t,this.lenght=n,this.height=r,this.angle=o,this.line=0}toMatter(){return this.line=e.rectangle(this.x,this.y,this.lenght,this.height,{isStatic:!0}),t.rotate(this.line,this.angle/180*Math.PI),this.line}printOnP5(e){e.push(),e.translate(this.line.position.x,this.line.position.y),e.rectMode(e.CENTER),e.rotate(this.line.angle),e.rect(0,0,this.lenght,this.height),e.pop()}}var o=Matter.World;class i{constructor(e){this.size=e,this.lines=[],this.create()}create(){let e=this.size+10,t=this.size,n=Math.floor(this.size/2),o=new r(n,-10,1.2*t,10,0);this.lines.push(o);let i=new r(-10,n,t,10,90);this.lines.push(i);let s=new r(e,n,t,10,90);this.lines.push(s);let a=Math.floor(t/3),c=new r(Math.floor(a/2),a,2*a,5,20);this.lines.push(c);let u=2*Math.floor(t/3),l=new r(Math.floor(u),u,1.2*u,5,-20);this.lines.push(l)}toMatterWorld(e){for(let t=0;t<this.lines.length;t++)o.add(e,this.lines[t].toMatter())}printOnP5(e){for(let t=0;t<this.lines.length;t++)this.lines[t].printOnP5(e)}}var s=n(980),a=Matter.Bodies;class c{static#e;constructor(e,t,n){this.x=e,this.y=t,this.size=n,this.coin}toMatter(){return void 0===this.coin&&(this.coin=a.circle(this.x,this.y,this.size,{frictionAir:0,friction:.005,restitution:.9})),this.coin}printOnP5(e){void 0===c.#e&&(c.#e=e.loadImage(s));let t=this.coin.position;e.push(),e.translate(t.x,t.y),e.rotate(this.coin.angle),e.imageMode(e.CENTER);let n=Math.floor(2*this.size);e.image(c.#e,0,0,n,n),e.pop()}}var u=Matter.Composite,l=n(669),f=n.n(l);function h(e){var t,n,r=window.location.search.substring(1).split("&");for(n=0;n<r.length;n++)if((t=r[n].split("="))[0]===e)return void 0===typeof t[1]||decodeURIComponent(t[1]);return!1}var d=n(379),p=n.n(d),m=n(795),g=n.n(m),v=n(569),y=n.n(v),w=n(565),x=n.n(w),b=n(216),S=n.n(b),E=n(589),T=n.n(E),O=n(621),C={};C.styleTagTransform=T(),C.setAttributes=x(),C.insert=y().bind(null,"head"),C.domAPI=g(),C.insertStyleElement=S(),p()(O.Z,C),O.Z&&O.Z.locals&&O.Z.locals;var j=n(277),P=new(n(817)),A=Matter.Engine,M=Matter.Runner;let N,B=A.create(),R=B.world,D=M.create();M.run(D,B);let U=Math.floor(window.innerHeight),k=Math.floor(1.5*U),L=new class{constructor(e,t){this.dogecoins=[],this.matterWorld=e,this.autoCleanTime=2e3,this.toDeleteDropHeight=t,this.autoClean()}addToMatter(e){this.dogecoins.push(e),u.add(this.matterWorld,e.toMatter())}addOneDogecoinToMatter(e,t,n){let r=new c(e,t,n);this.addToMatter(r)}printOnP5(e){for(let t=0;t<this.dogecoins.length;t++)this.dogecoins[t].printOnP5(e)}autoClean(){setInterval((()=>{for(let e=0;e<this.dogecoins.length;e++){let t=this.dogecoins[e].toMatter();if(t.position.y>this.toDeleteDropHeight){u.remove(this.matterWorld,t);let n=this.dogecoins.indexOf(this.dogecoins[e]);this.dogecoins.splice(n,1)}}}),this.autoCleanTime)}}(R,k),_=h("dogecoinAddress");0==_&&(console.log("Not set dogecoinAddress in URL"),console.log("..../justBox.html?dogecoinAddress={your dogecoin address}"),console.log("ex. ..../justBox.html?dogecoinAddress=D6BoLmatJzBUBoikmww1LBYNZFzbbrrh2n"));let I="";console.log(_),_&&"D"==_[0]?(console.log("in at "),I="https://chain.so/api/v2/get_tx_received/DOGE/"):I="https://chain.so/api/v2/get_tx_received/DOGETEST/";let q=new class{constructor(e,t,n){this.detectCoinApi=n,this.dogecoinManage=e,this.address=t,this.hasShowed=[],this.monitorCycleTime=10,this.checkDonateTime=600,this.lastTxidHasShowed}addCoinsV2(e,t,n,r){for(let o=0;o<e;o++)setTimeout((()=>{this.dogecoinManage.addOneDogecoinToMatter(t,0,n),o===e-1&&r()}),50*o)}printOnP5(e){this.dogecoinManage.printOnP5(e)}checkNewTXs(e){let t="",n=this.detectCoinApi,r=[];t=void 0===this.lastTxidHasShowed?n+this.address:n+this.address+"/"+this.lastTxidHasShowed,f().get(t).then((e=>{let t=e.data.data.txs;for(let e=0;e<t.length;e++){let n=t[e].time,o=t[e].txid;Math.floor(Date.now()/1e3)-n<this.checkDonateTime&&!1===this.findTxid(o)&&(this.hasShowed.push(t[e]),r.push(t[e])),e==t.length-1&&(this.lastTxidHasShowed=o)}})).catch((function(e){console.log(e)})).then((function(){e(r)}))}findTxid(e){for(let t=0;t<this.hasShowed.length;t++)if(this.hasShowed[t].txid===e)return!0;return this.cleanHasShowed(),!1}cleanHasShowed(){let e=Math.floor(Date.now()/1e3);for(let t=0;t<this.hasShowed.length;t++)if(e-this.hasShowed[t].time>this.checkDonateTime){let e=this.hasShowed.indexOf(this.hasShowed[t]);this.hasShowed.splice(e,1)}}}(L,_,I);const H=function(e,t,n){P.place((()=>{V().then((()=>z())).then((()=>W(2))).then((()=>F(e,t,n))).then((()=>W(8))).then((()=>J())).then((()=>X())).then((()=>{P.next()}))}))},z=function(){return new Promise(((e,t)=>{$("#dogeDonateBox").animate({opacity:.8},5e3,e)}))},F=function(e,t,n){return new Promise(((r,o)=>{e=Math.floor(e),q.addCoinsV2(e,t,n,r)}))},J=function(){return new Promise(((e,t)=>{$("#dogeDonateBox").animate({opacity:0},2e3,e)}))},W=function(e){return new Promise(((t,n)=>{setTimeout(t,1e3*e)}))},V=function(){return new Promise(((e,t)=>{$("#doge_img").animate({opacity:.8},2e3,e)}))},X=function(){return new Promise(((e,t)=>{$("#doge_img").animate({opacity:0},2e3,e)}))},Z=e=>{e.setup=function(){let t=Math.floor(U/15);e.createCanvas(U,U).parent("dogeDonateBox"),$("#doge_img").width(U),N=new i(U),N.toMatterWorld(R);let n=h("setcoin");n&&n>0&&K(n,10,t),0!=_&&setInterval((()=>{q.checkNewTXs((function(e){for(let n=0;n<e.length;n++){let r=Math.floor(e[n].value);H(r,10,t)}}))}),1e3)},e.draw=function(){e.background(51),N.printOnP5(e),q.printOnP5(e)}};var G;G=()=>{new p5(Z)},j("https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js",(function(){G()}));const K=function(e,t,n){H(e,t,n),H(e,t,n),H(e,t,n)}})()})();