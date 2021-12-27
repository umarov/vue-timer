(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-742d836a"],{"0366":function(t,e,r){var i=r("1c0b");t.exports=function(t,e,r){if(i(t),void 0===e)return t;switch(r){case 0:return function(){return t.call(e)};case 1:return function(r){return t.call(e,r)};case 2:return function(r,i){return t.call(e,r,i)};case 3:return function(r,i,n){return t.call(e,r,i,n)}}return function(){return t.apply(e,arguments)}}},"05a5":function(t,e,r){"use strict";r("c879")},"1c0b":function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},"1dde":function(t,e,r){var i=r("d039"),n=r("b622"),o=r("2d00"),a=n("species");t.exports=function(t){return o>=51||!i((function(){var e=[],r=e.constructor={};return r[a]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"2d00":function(t,e,r){var i,n,o=r("da84"),a=r("342f"),s=o.process,c=s&&s.versions,u=c&&c.v8;u?(i=u.split("."),n=i[0]+i[1]):a&&(i=a.match(/Edge\/(\d+)/),(!i||i[1]>=74)&&(i=a.match(/Chrome\/(\d+)/),i&&(n=i[1]))),t.exports=n&&+n},"342f":function(t,e,r){var i=r("d066");t.exports=i("navigator","userAgent")||""},5709:function(t,e,r){"use strict";r.r(e);var i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"timer"}},[r("timer-notification",{attrs:{"timer-worker":t.timerWorker},on:{"notification-state":t.allowNotification}}),r("audio",{ref:"audio",attrs:{src:"audio/foghorn-daniel_simon.mp3"}}),r("div",{staticClass:"timer"},[r("div",{staticClass:"timer-content__values green--text"},[t._v(" "+t._s(t.fullTimerDisplay)+" ")]),r("div",{staticClass:"timer-content"},[r("svg",{staticStyle:{transform:"rotate(-90deg)"},attrs:{xmlns:"http://www.w3.org/2000/svg",height:"300",width:"300"}},[r("circle",{staticClass:"progress-circular__underlay",attrs:{fill:"transparent",cx:"150",cy:"150",r:"147.5","stroke-width":"5","stroke-dasharray":"926.77","stroke-dashoffset":"0"}}),r("circle",{staticClass:"progress-circular__overlay",staticStyle:{transition:"none"},attrs:{fill:"transparent",cx:"150",cy:"150",r:"147.5","stroke-width":"5","stroke-dasharray":"926.77","stroke-dashoffset":t.percentageForDisplay}})])]),r("div",{staticClass:"timer-buttons"},[r("div",[r("v-btn",{staticClass:"btn--light-flat-focused white--text timer-button",attrs:{light:"",fab:"",outlined:"",color:"blue"},nativeOn:{click:function(e){return t.resetTimer()}}},[r("v-icon",[t._v("stop")])],1),r("p",{staticClass:"text-center subheading blue--text"},[t._v(" Stop ")])],1),t.timerActive?r("div",[r("v-btn",{staticClass:"btn--light-flat-focused white--text timer-button",attrs:{light:"",fab:"",outlined:"",color:"orange"},nativeOn:{click:function(e){return t.pauseTimer()}}},[r("v-icon",[t._v("pause_circle_outline")])],1),r("p",{staticClass:"text-center subheading orange--text"},[t._v(" Pause ")])],1):r("div",[r("v-btn",{staticClass:"btn--light-flat-focused white--text timer-button",attrs:{light:"",fab:"",outlined:"",color:"green"},nativeOn:{click:function(e){return t.startTimer()}}},[r("v-icon",[t._v("play_circle_outline")])],1),r("p",{staticClass:"text-center subheading green--text"},[t._v(" Start ")])],1)])])],1)},n=[],o=(r("d3b7"),r("3ca3"),r("ddb0"),r("a9e3"),r("d81d"),r("2b0e")),a=r("64d7"),s=o["default"].extend({name:"TimerDisplay",components:{"timer-notification":function(){return r.e("chunk-4044d162").then(r.bind(null,"2c87"))}},props:{timerAmount:{type:[Number,String],default:0}},data:function(){return{progressSize:100,timerValue:0,percentageForDisplay:0,fullTimerDisplay:"00:00:00:00",timerEndTime:0,timerActive:!1,notificationAllowed:!1,timerWorker:new Worker("./worker/timer.worker.js")}},created:function(){var t=this;document.addEventListener("visibilitychange",(function(){t.timerWorker.postMessage({checkTimerValue:!0})})),a["a"].onMessage((function(){t.resetTimer()})),this.notificationAllowed=!1,this.timerWorker.onmessage=function(e){if(!document.hidden){var r=e.data,i=r.timerValue,n=r.percentageForDisplay,o=r.fullTimerDisplay;if(0===i){var a=e.data.timerEndTime,s=(Date.now()-a)/10;if(t.notificationAllowed&&s<10){var c=t.$refs.audio;c.play()}t.resetTimer()}else requestAnimationFrame((function(){t.percentageForDisplay=n,t.fullTimerDisplay=o})),setTimeout((function(){t.timerValue=i}),0)}};var e=function(e){return function(r){r.matches&&(t.progressSize=e)}},r=[{query:window.matchMedia("(min-width: 950px)"),size:"600"},{query:window.matchMedia("(max-width: 949px)"),size:"450"},{query:window.matchMedia("(min-width: 600px)"),size:"450"},{query:window.matchMedia("(max-width: 599px)"),size:"400"},{query:window.matchMedia("(min-width: 426px)"),size:"380"},{query:window.matchMedia("(max-width: 425px)"),size:"350"},{query:window.matchMedia("(min-width: 321px)"),size:"280"},{query:window.matchMedia("(max-width: 320px)"),size:"250"}];r.map((function(r){return r.query.addListener(e.bind(t)(+r.size))})),r.map((function(r){return e.bind(t)(+r.size)(r.query)})),this.timerWorker.postMessage({resetTimer:!0,timerAmount:this.timerAmount,fullAmount:this.timerAmount}),this.timerActive=!1,setTimeout((function(){var t=document.querySelector(".progress-circular__overlay");t&&(t.style.transition="none",t.style.color="#4caf50")}),500)},destroyed:function(){this.resetTimer(),this.timerWorker.terminate()},methods:{startTimer:function(){if(this.timerActive=!0,this.timerValue===this.timerAmount){var t=this.$refs.audio;t.pause(),t.currentTime=0,this.timerWorker.postMessage({startTimer:!0,timerAmount:this.timerAmount,fullAmount:this.timerAmount,notificationAllowed:this.notificationAllowed})}else this.resumeTimer()},resumeTimer:function(){this.timerActive=!0,this.timerWorker.postMessage({startTimer:!0,timerAmount:this.timerValue,fullAmount:this.timerAmount})},pauseTimer:function(){this.timerActive=!1,this.timerWorker.postMessage({startTimer:!1})},resetTimer:function(){this.timerActive=!1,this.timerWorker.postMessage({resetTimer:!0,timerAmount:this.timerAmount,fullAmount:this.timerAmount})},allowNotification:function(t){this.notificationAllowed=t}}}),c=s,u=(r("05a5"),r("2877")),f=Object(u["a"])(c,i,n,!1,null,"ca620e8c",null);e["default"]=f.exports},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,r){var i=r("1d80"),n=r("5899"),o="["+n+"]",a=RegExp("^"+o+o+"*"),s=RegExp(o+o+"*$"),c=function(t){return function(e){var r=String(i(e));return 1&t&&(r=r.replace(a,"")),2&t&&(r=r.replace(s,"")),r}};t.exports={start:c(1),end:c(2),trim:c(3)}},"65f0":function(t,e,r){var i=r("861d"),n=r("e8b5"),o=r("b622"),a=o("species");t.exports=function(t,e){var r;return n(t)&&(r=t.constructor,"function"!=typeof r||r!==Array&&!n(r.prototype)?i(r)&&(r=r[a],null===r&&(r=void 0)):r=void 0),new(void 0===r?Array:r)(0===e?0:e)}},7156:function(t,e,r){var i=r("861d"),n=r("d2bb");t.exports=function(t,e,r){var o,a;return n&&"function"==typeof(o=e.constructor)&&o!==r&&i(a=o.prototype)&&a!==r.prototype&&n(t,a),t}},a9e3:function(t,e,r){"use strict";var i=r("83ab"),n=r("da84"),o=r("94ca"),a=r("6eeb"),s=r("5135"),c=r("c6b6"),u=r("7156"),f=r("c04e"),l=r("d039"),m=r("7c73"),d=r("241c").f,p=r("06cf").f,h=r("9bf2").f,v=r("58a8").trim,w="Number",g=n[w],y=g.prototype,b=c(m(y))==w,A=function(t){var e,r,i,n,o,a,s,c,u=f(t,!1);if("string"==typeof u&&u.length>2)if(u=v(u),e=u.charCodeAt(0),43===e||45===e){if(r=u.charCodeAt(2),88===r||120===r)return NaN}else if(48===e){switch(u.charCodeAt(1)){case 66:case 98:i=2,n=49;break;case 79:case 111:i=8,n=55;break;default:return+u}for(o=u.slice(2),a=o.length,s=0;s<a;s++)if(c=o.charCodeAt(s),c<48||c>n)return NaN;return parseInt(o,i)}return+u};if(o(w,!g(" 0o1")||!g("0b1")||g("+0x1"))){for(var x,T=function(t){var e=arguments.length<1?0:t,r=this;return r instanceof T&&(b?l((function(){y.valueOf.call(r)})):c(r)!=w)?u(new g(A(e)),r,T):A(e)},_=i?d(g):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;_.length>k;k++)s(g,x=_[k])&&!s(T,x)&&h(T,x,p(g,x));T.prototype=y,y.constructor=T,a(n,w,T)}},ae40:function(t,e,r){var i=r("83ab"),n=r("d039"),o=r("5135"),a=Object.defineProperty,s=function(t){throw t};t.exports=function(t,e){e||(e={});var r=[][t],c=!!o(e,"ACCESSORS")&&e.ACCESSORS,u=o(e,0)?e[0]:s,f=o(e,1)?e[1]:void 0;return!!r&&!n((function(){if(c&&!i)return!0;var t={length:-1},e=function(e){c?a(t,e,{enumerable:!0,get:s}):t[e]=1};e(1),e(2147483646),e(4294967294),r.call(t,u,f)}))}},b727:function(t,e,r){var i=r("0366"),n=r("44ad"),o=r("7b0b"),a=r("50c4"),s=r("65f0"),c=[].push,u=function(t){var e=1==t,r=2==t,u=3==t,f=4==t,l=6==t,m=5==t||l;return function(d,p,h,v){for(var w,g,y=o(d),b=n(y),A=i(p,h,3),x=a(b.length),T=0,_=v||s,k=e?_(d,x):r?_(d,0):void 0;x>T;T++)if((m||T in b)&&(w=b[T],g=A(w,T,y),t))if(e)k[T]=g;else if(g)switch(t){case 3:return!0;case 5:return w;case 6:return T;case 2:c.call(k,w)}else if(f)return!1;return l?-1:u||f?f:k}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)}},c879:function(t,e,r){},d81d:function(t,e,r){"use strict";var i=r("23e7"),n=r("b727").map,o=r("1dde"),a=r("ae40"),s=o("map"),c=a("map");i({target:"Array",proto:!0,forced:!s||!c},{map:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}})},e8b5:function(t,e,r){var i=r("c6b6");t.exports=Array.isArray||function(t){return"Array"==i(t)}}}]);
//# sourceMappingURL=chunk-742d836a.fb82de86.js.map