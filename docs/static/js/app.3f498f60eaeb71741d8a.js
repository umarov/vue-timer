webpackJsonp([4],[,,,function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a(0),n=a(7),s=a.n(n),i=a(8),r=(a.n(i),a(10)),c=a(14);o.a.config.productionTip=!1,o.a.use(s.a),new o.a({el:"#app",router:c.a,template:"<App/>",components:{App:r.a}})},,,,,function(t,e){},,function(t,e,a){"use strict";function o(t){a(11)}var n=a(12),s=a(13),i=a(2),r=o,c=i(n.a,s.a,!1,r,null,null);e.a=c.exports},function(t,e){},function(t,e,a){"use strict";e.a={name:"app",data:function(){return{activeTab:"",showBackButton:!1,showBottomBar:!1}},watch:{$route:function(t){var e=t.meta,a=e.showBackButton,o=e.showBottomBar;this.showBackButton=a,this.showBottomBar=o,this.activeTab=t.name}},methods:{goBack:function(){this.$router.go(-1)},navigate:function(t){this.$router.push(t)}}}},function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("v-toolbar",{staticClass:"green",attrs:{dark:""}},[a("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.showBackButton,expression:"showBackButton"}],attrs:{icon:"",dark:""},on:{click:t.goBack}},[a("v-icon",{attrs:{color:"white"}},[t._v("arrow_back")])],1),t._v(" "),a("v-toolbar-title",{staticClass:"white--text"},[t._v("Code Shop Timer")]),t._v(" "),a("v-spacer")],1),t._v(" "),a("main",{staticClass:"app-content"},[a("v-content",{staticClass:"pa-2",attrs:{fluid:""}},[a("router-view")],1)],1),t._v(" "),a("v-tabs",{directives:[{name:"show",rawName:"v-show",value:t.showBottomBar,expression:"showBottomBar"}],staticClass:"bottom-tabs",attrs:{light:"",fixed:"",icons:"",centered:""},model:{value:t.activeTab,callback:function(e){t.activeTab=e},expression:"activeTab"}},[a("v-tabs-bar",{staticClass:"green"},[a("v-tabs-slider",{attrs:{color:"yellow"}}),t._v(" "),a("v-tabs-item",{key:"home",attrs:{href:"home"},on:{click:function(e){t.navigate("/")}}},[a("v-icon",{attrs:{color:"white"}},[t._v("home")]),t._v(" "),a("span",{staticClass:"white--text"},[t._v("Home")])],1),t._v(" "),a("v-tabs-item",{key:"timer",attrs:{href:"timer"},on:{click:function(e){t.navigate("/timer")}}},[a("v-icon",{attrs:{color:"white"}},[t._v("timelapse ")]),t._v(" "),a("span",{staticClass:"white--text"},[t._v("Set Timer")])],1)],1)],1)],1)},n=[],s={render:o,staticRenderFns:n};e.a=s},function(t,e,a){"use strict";var o=a(0),n=a(15),s=function(){return a.e(0).then(a.bind(null,18))},i=function(){return a.e(0).then(a.bind(null,19))},r=function(){return a.e(2).then(a.bind(null,20))},c=function(){return a.e(1).then(a.bind(null,21))};o.a.use(n.a),e.a=new n.a({routes:[{path:"/",name:"home",component:i,meta:{showBackButton:!1,showBottomBar:!0}},{path:"/timer",component:s,children:[{path:"/",name:"timer",component:r,meta:{showBackButton:!1,showBottomBar:!0}},{path:"/display/:timerAmount",name:"timer-display",component:c,props:!0,meta:{showBackButton:!0,showBottomBar:!1}}]}]})}],[3]);
//# sourceMappingURL=app.3f498f60eaeb71741d8a.js.map