(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3e3572fa"],{"1dde":function(t,e,n){var r=n("d039"),s=n("b622"),o=n("2d00"),i=s("species");t.exports=function(t){return o>=51||!r((function(){var e=[],n=e.constructor={};return n[i]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"25f0":function(t,e,n){"use strict";var r=n("6eeb"),s=n("825a"),o=n("d039"),i=n("ad6d"),a="toString",u=RegExp.prototype,c=u[a],d=o((function(){return"/a/b"!=c.call({source:"a",flags:"b"})})),l=c.name!=a;(d||l)&&r(RegExp.prototype,a,(function(){var t=s(this),e=String(t.source),n=t.flags,r=String(void 0===n&&t instanceof RegExp&&!("flags"in u)?i.call(t):n);return"/"+e+"/"+r}),{unsafe:!0})},"2d00":function(t,e,n){var r,s,o=n("da84"),i=n("342f"),a=o.process,u=a&&a.versions,c=u&&u.v8;c?(r=c.split("."),s=r[0]+r[1]):i&&(r=i.match(/Edge\/(\d+)/),(!r||r[1]>=74)&&(r=i.match(/Chrome\/(\d+)/),r&&(s=r[1]))),t.exports=s&&+s},"2d5f":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"timer-input"}},[n("div",{staticClass:"time-values"},[n("v-container",{attrs:{fluid:""}},[n("v-layout",{staticClass:"text-center",attrs:{row:"","justify-space-around":""}},[n("code",{staticClass:"time-values__minutes"},[t._v(t._s(t.hours)+":"+t._s(t.minutes)+":"+t._s(t.seconds))])])],1)],1),n("div",{staticClass:"time-adjusters"},[n("v-container",{attrs:{fluid:""}},[n("v-layout",{staticClass:"text-center",attrs:{row:"","justify-space-around":""}},[n("div",{staticClass:"number-inputs"},[t._l(9,(function(e){return n("v-btn",{key:e,staticClass:"white--text",attrs:{rounded:"",color:"blue"},on:{click:function(n){return t.addSeconds(e)}}},[t._v(" "+t._s(e)+" ")])})),n("v-btn",{staticClass:"last-number-input-button white--text",attrs:{rounded:"",color:"blue"},on:{click:function(e){return t.addSeconds(0)}}},[t._v(" 0 ")])],2)])],1)],1),n("div",{staticClass:"time-submitter"},[n("v-container",{attrs:{fluid:""}},[n("v-layout",{staticClass:"d-flex justify-space-around"},[n("v-btn",{staticClass:"red--text",attrs:{text:""},nativeOn:{click:function(e){return t.resetValues()}}},[t._v(" Reset ")]),n("v-btn",{staticClass:"white--text",attrs:{raised:"",color:"green"},nativeOn:{click:function(e){return t.onTimerAmountSet()}}},[t._v(" Prepare timer ")])],1)],1)],1)])},s=[],o=(n("d3b7"),n("25f0"),n("99af"),n("2b0e")),i=o["default"].extend({name:"TimerInput",data:function(){return{totalNumber:0,longPressed:!1,longPressTimeout:0}},computed:{seconds:function(){if(this.totalNumber/10<1)return"0".concat(this.totalNumber);var t=this.totalNumber.toString();return t.substring(t.length-2)},minutes:function(){var t=Math.floor(this.totalNumber/100);if(t/10<1)return"0".concat(t);var e=t.toString();return e.substring(e.length-2)},hours:function(){var t=Math.floor(this.totalNumber/1e4);return t/10<1?"0".concat(t):"".concat(t)}},destroyed:function(){this.resetValues()},methods:{resetValues:function(){this.totalNumber=0},addSeconds:function(t){this.totalNumber<1e5&&(this.totalNumber=+"".concat(this.totalNumber).concat(t))},onTimerAmountSet:function(){var t=+this.seconds,e=+this.minutes,n=+this.hours,r=100*t+6e3*e+36e5*n;r>0&&this.$router.push({name:"timer-display",params:{timerAmount:r.toString()}})}}}),a=i,u=(n("7ae8"),n("2877")),c=Object(u["a"])(a,r,s,!1,null,"67eee0d2",null);e["default"]=c.exports},"342f":function(t,e,n){var r=n("d066");t.exports=r("navigator","userAgent")||""},"65f0":function(t,e,n){var r=n("861d"),s=n("e8b5"),o=n("b622"),i=o("species");t.exports=function(t,e){var n;return s(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!s(n.prototype)?r(n)&&(n=n[i],null===n&&(n=void 0)):n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},"7ae8":function(t,e,n){"use strict";n("800d")},"800d":function(t,e,n){},8418:function(t,e,n){"use strict";var r=n("c04e"),s=n("9bf2"),o=n("5c6c");t.exports=function(t,e,n){var i=r(e);i in t?s.f(t,i,o(0,n)):t[i]=n}},"99af":function(t,e,n){"use strict";var r=n("23e7"),s=n("d039"),o=n("e8b5"),i=n("861d"),a=n("7b0b"),u=n("50c4"),c=n("8418"),d=n("65f0"),l=n("1dde"),f=n("b622"),v=n("2d00"),m=f("isConcatSpreadable"),p=9007199254740991,b="Maximum allowed index exceeded",h=v>=51||!s((function(){var t=[];return t[m]=!1,t.concat()[0]!==t})),g=l("concat"),x=function(t){if(!i(t))return!1;var e=t[m];return void 0!==e?!!e:o(t)},y=!h||!g;r({target:"Array",proto:!0,forced:y},{concat:function(t){var e,n,r,s,o,i=a(this),l=d(i,0),f=0;for(e=-1,r=arguments.length;e<r;e++)if(o=-1===e?i:arguments[e],x(o)){if(s=u(o.length),f+s>p)throw TypeError(b);for(n=0;n<s;n++,f++)n in o&&c(l,f,o[n])}else{if(f>=p)throw TypeError(b);c(l,f++,o)}return l.length=f,l}})},ad6d:function(t,e,n){"use strict";var r=n("825a");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},e8b5:function(t,e,n){var r=n("c6b6");t.exports=Array.isArray||function(t){return"Array"==r(t)}}}]);
//# sourceMappingURL=chunk-3e3572fa.6651f3c9.js.map