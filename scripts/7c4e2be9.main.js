!function(){define("config",[],function(){return{FONTS:["Gilroy-Medium","Gilroy-Bold","Gilroy-Extra-Bold","Gilroy-Heavy"],FONT_STACK:{BASE:"#{Helvetica, Arial, sans-serif}",PRIMARY:"#{'Helvetica Neue', Helvetica, Arial, sans-serif}",SECONDARY:"#{Georgia, 'Times New Roman', sans-serif}",CODE:"#{'source code pro', monospace}"},SECTIONS:{DEFAULT:{BODY_BACKGROUND_COLOR:"#303442",BODY_COLOR:"#9297a7",ACCENT_COLOR:"#f4373b",LOGO_COLOR:"#f4373b",TITLE_COLOR:"#f4373b"},INTRO:{BODY_BACKGROUND_COLOR:"#303442",BODY_COLOR:"#9297a7",ACCENT_COLOR:"#f4373b",LOGO_COLOR:"#f4373b",TITLE_COLOR:"#f4373b"},EAVIS:{BODY_BACKGROUND_COLOR:"#222222",BODY_COLOR:"#fff",ACCENT_COLOR:"#36e2ae",LOGO_COLOR:"#36e2ae",TITLE_COLOR:"#fff"},REDBURN:{BODY_BACKGROUND_COLOR:"#090909",BODY_COLOR:"#fff",ACCENT_COLOR:"#3E8EDE",LOGO_COLOR:"#FFC627",TITLE_COLOR:"#fff"},ANDROID:{BODY_BACKGROUND_COLOR:"#141926",BODY_COLOR:"#00FF8D",ACCENT_COLOR:"#00FF8D",LOGO_COLOR:"#00FF8D",TITLE_COLOR:"#00FF8D"},NATIONAL_THEATRE:{BODY_BACKGROUND_COLOR:"#33f",BODY_COLOR:"#ff9",ACCENT_COLOR:"#ff9",LOGO_COLOR:"#ff9",TITLE_COLOR:"#ff9"},GUARDIAN:{BODY_BACKGROUND_COLOR:"#000E3E",BODY_COLOR:"#FF9500",ACCENT_COLOR:"#FF9500",LOGO_COLOR:"#FF9500",TITLE_COLOR:"#FF9500"}},TRANSITIONS:{BASE:{TIME:300,DELAY:300,TYPE:"ease"}},MARGINS:{TOP:{INDEX_TITLE:"27.25vh",PAGE_TITLE:2,PROJECT_INTRO:4}},TRANSFORM:"rotateY(0deg) translateZ(288px)",SOME_TEXT:"some text content",PATH:"some/path/to/some/file.png"}}),define("dispatcher",[],function(){"use strict";return function(){function a(a,b){d[a]=d[a]||[],d[a].push(b)}function b(a,b){a in d!=!1&&d[a].splice(d[a].indexOf(b),1)}function c(a){if(a in d!=!1)for(var b=0;b<d[a].length;b++)d[a][b].apply(Array.prototype.slice.call(arguments,1))}var d={};return{on:a,off:b,trigger:c}}}),define("domutils",["jquery"],function(a){"use strict";function b(b,c){return a(b).addClass(c)}function c(b,c){return a(b).removeClass(c)}function d(b,c){return a(b).hasClass(c)}function e(a,e){return d(a,e)?c(a,e):b(a,e)}function f(a,c){return d(a,c)?a:b(a,c)}function g(b,c){var d=[];return c||(c=document),a(c).find(b).each(function(a,b){d.push(b)}),d}function h(a,b){var c=g(a,b);return c[0]||null}function i(a){var b,c,d=a.offsetWidth,e=a.offsetHeight,f=getComputedStyle(a);return b=d+parseInt(f.marginLeft)+parseInt(f.marginRight),c=e+parseInt(f.marginTop)+parseInt(f.marginBottom),{width:d,height:e,outerWidth:b,outerHeight:c}}function j(b,c,d){var e=h(c,d);return e?a(e).data(b):void 0}function k(b,c,d,e){var f=h(d,e);return f?a(f).data(b,c):void 0}function l(b,c){var d,e=b||"div";return d=a(document.createElement(e)),d.html(c),d}function m(b,c,d){if(b){var e=c||document;return d&&d===u?a(e).prepend(b):a(e).append(b),b}}function n(b,c,d){return a(b).attr(c,d)}function o(b,c,d){return a(b).css(c,d)}function p(){return window.location.hash.substring(1)}function q(a){return a&&(window.location.hash=a.toLowerCase()),p()}function r(b,c,d,e){a(b).bind(c,function(){d.apply(e,arguments)})}function s(){return"ontouchstart"in window||navigator.MaxTouchPoints>0||navigator.msMaxTouchPoints>0}function t(a,b){window.scrollTo(a,b)}const u="start";return{isTouchable:s,getWindowHash:p,setWindowHash:q,getElements:g,getElement:h,getSize:i,getData:j,setData:k,createElement:l,setAttribue:n,setStyle:o,addElementToDOM:m,bindEvent:r,addClass:b,removeClass:c,hasClass:d,toggleClass:e,setWindowPosition:t,addSingleClassInstance:f}}),define("jsutils",[],function(){"use strict";function a(a,b,c,d){return setTimeout(function(){a.apply(c,d)},b)}function b(a,b,c){var d;return function(){var e=this,f=arguments,g=function(){d=null,c||a.apply(e,f)},h=c&&!d;clearTimeout(d),d=setTimeout(g,b),h&&a.apply(e,f)}}function c(a,b,c){var d=Number(new Date)+(b||2e3);c=c||100;var e=function(b,f){var g=a();g?b(g):Number(new Date)<d?setTimeout(e,c,b,f):f(new Error("timed out for "+a+": "+arguments))};return new Promise(e)}function d(a,b){var c;return function(){return a&&(c=a.apply(b||this,arguments),a=null),c}}function e(a,b,c){var d=Math.random()*(b-a)+a;return c?0|d:d}function f(a){var b=document.createElement("div");return b.innerHTML=a,b.textContent}var g=function(){var a;return function(b){return a||(a=document.createElement("a")),a.href=b,a.href}}();return{delay:a,debounce:b,poll:c,once:d,getAbsoluteUrl:g,rand:e,stripTags:f}}),define("pagetrans",["Barba","jsutils"],function(a,b){"use strict";function c(){a.Prefetch.init(),a.Pjax.start()}function d(b,c){a.Pjax.Dom.containerClass=b,a.Pjax.Dom.wrapperId=c}function e(){h=a.BaseTransition.extend({start:function(){a.Dispatcher.trigger("transitionStart",this),this.newContainerLoading.then(this.delayFinishToAnimate.bind(this))},delayFinishToAnimate:function(){a.Dispatcher.trigger("delayFinishToAnimate",this),b.delay(this.finish.bind(this),i)},finish:function(){this.newContainer.removeAttribute("style"),a.Dispatcher.trigger("transitionFinish",this),this.delayDoneToAnimate()},delayDoneToAnimate:function(){a.Dispatcher.trigger("delayDoneToAnimate",this),b.delay(this.done.bind(this),i)}}),a.Pjax.getTransition=function(){return h}}function f(a,b,f){i=f||g,d(a,b),e(),c()}const g=200;var h,i;return{init:f,get events(){return a.Dispatcher}}}),define("itemlist",["dispatcher"],function(a){"use strict";return function(b){function c(){s.trigger(r),t.onUpdate&&t.onUpdate(arguments)}function d(a,b){return t.checkEqual?t.checkEqual(a,b):a===b?!0:!1}function e(a,b){return a[b]}function f(a,b){if(!a||!b)return null;for(var c=b.length;c>0;c--)if(d(a,b[c-1]))return c-1;return null}function g(){return u}function h(){return 1>v}function i(){return v>u.length-1}function j(a){v=a,c()}function k(){return v}function l(a,b,c){return c&&a!==b&&a>-1&&a<u.length&&j(a),k()}function m(a,b,c){return l(b+a,b,c)}function n(){return u&&v>-1?e(u,v):null}function o(a,b,c){var d=f(a,c);return l(d,b,c)}function p(){s=new a}function q(){p(),u=b,v=u.length>0?0:-1}const r="update";var s,t,u=[],v=-1;return t={get events(){return s},get items(){return g()},get atStart(){return h()},get atEnd(){return i()},get currentItem(){return n()},set currentItem(a){return o(a,k(),g())},get currentIndex(){return k()},set currentIndex(a){return l(a,k(),g())},next:function(){return m(1,k(),g())},prev:function(){return m(-1,k(),g())},checkEqual:null,onUpdate:null},b&&Array.isArray(b)?(q(),t):null}}),define("nav",["domutils","itemlist","dispatcher"],function(a,b,c){"use strict";return function(){function d(a){v.trigger(a)}function e(){return z.items}function f(){return z.currentItem}function g(a){a!==z.currentItem&&(z.currentItem=a)}function h(a){z&&0!==a&&(a>0?z.next():z.prev())}function i(a,b,c){return B?!1:(y=new a(b),y.addItems(c),B=!0,void d("typeMenuInitialised"))}function j(a){return y?!1:(y=a,void(u&&z&&i(y,u,z)))}function k(a,b){return C?!1:(w=new a(b,{recognizers:[[a.Swipe,{direction:a.DIRECTION_HORIZONTAL}]]}),w.on("swipeleft",function(){h(1)}),w.on("swiperight",function(){h(-1)}),C=!0,void d("touchControllerInitialised"))}function l(a){return w?!1:(w=a,void(u&&k(w,u)))}function m(a,b){return D?!1:(x=new a,x.init(b),x.events.on("next",function(){h(1)}),x.events.on("previous",function(){h(-1)}),D=!0,void d("mouseControllerInitialised"))}function n(a){return x?!1:(x=a,void(u&&m(x,u)))}function o(a){var b=[];return a.forEach(function(a){a&&a.id&&b.push(a.id)}),b}function p(a,c){var e=new b(a);return e.events.on("update",function(){d("sectionUpdate")}),e}function q(){v=new c}function r(){q()}function s(b,c,e){var f;return b&&c&&!A?(u=a.getElement(b),f=o(a.getElements(c,u)),z=p(f,e),e&&g(e),d("sectionUpdate"),u&&w&&k(w,u),u&&x&&m(x,u),u&&y&&z&&i(y,u,z),void(A=!0)):!1}var t,u,v,w,x,y,z,A=!1,B=!1,C=!1,D=!1;return t={init:s,addTouchController:l,addMouseController:n,addTypeMenu:j,sectionIndexChange:h,get events(){return v},get sections(){return e()},get section(){return f()},set section(a){return g(a)}},r(),t}}),define("prevnext",["domutils","dispatcher"],function(a,b){"use strict";const c="initialised",d="previous",e="next",f="controls",g=[{name:"Next",classes:"control control-next",direction:1},{name:"Previous",classes:"control control-previous",direction:-1}];return function(){function h(){m=new b}function i(a){m.trigger(a)}function j(b,c,f,g){var h;h=a.createElement(),a.addClass(h,f),c&&a.addAttribue(h,"id",c),g.forEach(function(b){var c=a.createElement("button",b.name);a.addClass(c,b.classes),a.bindEvent(c,"click",function(a){a.originalEvent&&a.originalEvent.preventDefault();var c=b.direction>0?e:d;return i(c),!1},this),a.addElementToDOM(c,h)}),a.addElementToDOM(h,b)}function k(){h()}function l(a,b){return!a||o?!1:(j(a,b,f,g),o=!0,void i(c))}var m,n,o=!1;return n={init:l,get events(){return m}},k(),n}}),define("typemenu",["domutils","dispatcher"],function(a,b){"use strict";const c="initialised";return function(d){function e(){m=new b}function f(a){m.trigger(a)}function g(){return a.createElement()}function h(b,c){a.addElementToDOM(b,c,"start")}function i(a){a.events.on("update",function(){console.log("typemenu.list.update",a.currentItem)})}function j(a,b){console.log("typemenu.init",a,b),p=g(),i(b),h(p,a)}function k(a){return e(),!a||q?!1:(o=a,q=!0,void f(c))}function l(a){console.log("typemenu.addItems",a),a&&o&&j(o,a)}var m,n,o,p,q=!1;return n={addItems:l,get events(){return m}},k(d),n}}),define("images",["config","domutils","dispatcher","photoswipe","photoswipeUI"],function(a,b,c,d,e){"use strict";const f=".pswp",g="data-pswp-uid";return function(){function a(b,c){return b&&(c(b)?b:a(b.parentNode,c))}function c(){var a=window.location.hash.substring(1),b={};if(a.length<5)return b;for(var c=a.split("&"),d=0;d<c.length;d++)if(c[d]){var e=c[d].split("=");e.length<2||(b[e[0]]=e[1])}return b.gid&&(b.gid=parseInt(b.gid,10)),b}function h(a){for(var c,d,e,f,g=b.getElements("figure",a),h=g.length,i=[],j=0;h>j;j++)c=g[j],1===c.nodeType&&(d=c.children[0],e=d.getAttribute("data-size").split("x"),f={src:d.getAttribute("href"),w:parseInt(e[0],10),h:parseInt(e[1],10)},c.children.length>1&&(f.title=c.children[1].innerHTML),d.children.length>0&&(f.msrc=d.children[0].getAttribute("src")),f.el=c,i.push(f));return i}function i(a,b,c,i){var j,k,l,m=document.querySelectorAll(f)[0];if(l=h(b),k={galleryUID:b.getAttribute(g),getThumbBoundsFn:function(a){var b=l[a].el.getElementsByTagName("img")[0],c=window.pageYOffset||document.documentElement.scrollTop,d=b.getBoundingClientRect();return{x:d.left,y:d.top+c,w:d.width}}},i)if(k.galleryPIDs){for(var n=0;n<l.length;n++)if(l[n].pid===a){k.index=n;break}}else k.index=parseInt(a,10)-1;else k.index=parseInt(a,10);isNaN(k.index)||(c&&(k.showAnimationDuration=0),j=new d(m,e,l,k),j.init())}function j(b){console.log("Images.onThumbnailsClick",b),b=b||window.event,b.preventDefault?b.preventDefault():b.returnValue=!1;var c=b.target||b.srcElement,d=a(c,function(a){return a.tagName&&"LI"===a.tagName.toUpperCase()});if(d){for(var e,f=d.parentNode,g=d.parentNode.childNodes,h=g.length,j=0,k=0;h>k;k++)if(1===g[k].nodeType){if(g[k]===d){e=j;break}j++}return e>=0&&i(e,f),!1}}function k(a){l=b.getElements(a);for(var d=0,e=l.length;e>d;d++)l[d].setAttribute(g,d+1),l[d].onclick=j;var f=c();f.pid&&f.gid&&i(f.pid,l[f.gid-1],!0,!0)}var l,m,n={};return m={init:k,get events(){return n}}}}),define("workpage",["domutils","jsutils","itemlist","waypoints","dispatcher"],function(a,b,c,d,e){"use strict";const f=".image-gallery",g=".project-background-image",h=".work-body",i=".project-section",j=64,k=64,l="scrolled";return function(){function c(a){B.trigger(a)}function m(){return C.items}function n(){return C.currentItem}function o(){if(E){var b=window.pageYOffset;if(D)if(b>0){var c=2-b/200;D.style.opacity=c}else D.style.opacity=100;b>k?a.addClass(h,l):a.removeClass(h,l)}}function p(){D=a.getElement(g),console.log("Workpage.newBackgroundImage",D)}function q(){console.log("Workpage.newImageControl"),A=new z,A.init(f)}function r(){console.log("Workpage.destroyOldPage"),D=null,C=null,d.destroyAll()}function s(){console.log("Workpage.newScrollingSections");var b,c=0,e=[],f=a.getElements(i),g=f.length;for(b=0;g>b;b++)if(f[b]&&f[b].clientHeight){var h=a.getSize(f[b]).outerHeight,k=a.getSize(f[b]).height;console.log(" -- ",f[b],f[b].offsetTop),a.setStyle(f[b],"position","absolute"),a.setStyle(f[b],"margin-top","calc( 2rem + "+c+"px)");var l=new d({element:f[b],handler:function(b){console.log(" -- wp",this.adapter),"down"===b?(a.setStyle(this.element,"position","fixed"),a.setStyle(this.element,"margin-top","calc( 100vh - "+this.options.height+"px - "+j+"px )"),a.setStyle(this.element,"top","0")):(a.setStyle(this.element,"position","absolute"),a.setStyle(this.element,"margin-top","calc( 2rem + "+this.options.sectionHeight+"px)"),a.setStyle(this.element,"top","auto"))},offset:function(){return this.context.innerHeight()-this.adapter.outerHeight()-j},index:b,outerHeight:h,height:k,sectionHeight:c});e.push({section:f[b],waypoint:l}),c+=h,l=null}}function t(a){console.log("Workpage.newPage",a),r(),a&&(q(),p(),s(),o()),E=a}function u(){var c=b.debounce(o,1);a.bindEvent(window,"scroll",c)}function v(){B=new e}function w(){console.log("Workpage.privateInit"),v()}function x(a){console.log("Workpage.init"),z=a,u(),c("workpageInit"),b.delay(o,500),F=!0}var y,z,A,B,C,D,E=!1,F=!1;return y={init:x,newPage:t,get events(){return B},get sections(){return m()},get section(){return n()}},w(),y}}),define("app",["config","dispatcher","domutils","jsutils","pagetrans","nav","hammer","prevnext","typemenu","images","workpage","ffo"],function(a,b,c,d,e,f,g,h,i,j,k,l){"use strict";function m(){c.setWindowPosition(0,0,100)}function n(a,b,d){c.removeClass(a,d),c.addClass(a,b)}function o(){return c.addSingleClassInstance(Y,W)}function p(){n(Y,X,"")}function q(){n(Y,"",X)}function r(){c.setAttribue(Z,ia,""),c.setAttribue(Z,ha,"")}function s(){return c.getWindowHash()}function t(a){return a!==s()&&c.setWindowHash(a),s()}function u(){return console.log("app.currentPageIsIndex",Z,$,c.hasClass(Z,$)),c.hasClass(Z,$)}function v(){return console.log("app.currentPageIsWork",Z,_,c.hasClass(Z,_)),c.hasClass(Z,_)}function w(){la.newPage(v())}function x(){la=new k,la.init(j)}function y(a){console.log(" --> app.updatePageSection",a),t(a),n(Z,a,ja.sections.join(" "))}function z(){console.log("app.updateSectionFromNav"),u()&&(console.log("  --> app.updateSectionFromNav",ja.section),y(ja.section))}function A(a){ja.section=a}function B(){ja=new f,ja.events.on("sectionUpdate",z),ja.addTouchController(g),ja.addMouseController(h),ja.addTypeMenu(i),ja.init(aa,ba,s())}function C(){console.log("app.hashChange",s()),na&&A(s())}function D(a,b){var d=37,e=39,f=71;a===d&&ja.sectionIndexChange(-1),a===e&&ja.sectionIndexChange(1),a===f&&c.toggleClass(Z,"grid")}function E(){c.bindEvent(window,"hashchange",function(){C()},this),c.bindEvent(window,"keyup",function(a){D(a.keyCode,a.altKey||a.shiftKey)},this)}function F(a,b){var d,e,f=c.getData(fa,b),g=c.getData(fa,a),h=c.getData(ga,b),i=c.getData(ga,a);d=c.getElement(Z).className,e=d.replace(f,g),e=e.replace(h,i),n(Z,e,d)}function G(a,b){console.log("pageChangeComplete",a,b),n(Z,"",ea),r(),C(),w()}function H(b,c){console.log("app.pageTransitionCompleted",b,c),m(),d.delay(G,a.TRANSITIONS.BASE.DELAY,this,[b,c])}function I(b){console.log("app.pageTransitionFinish",b);var e=c.getData(ga,b.newContainer);c.setAttribue(Z,ha,e),d.delay(F,Math.abs(a.TRANSITIONS.BASE.DELAY/2),this,[b.newContainer,b.oldContainer])}function J(a,b,c){console.log("app.newPageReady",a,b,c),q()}function K(a){console.log("app.pageTransitionStart",a);var b=c.getData(ga,a.oldContainer);c.setAttribue(Z,ia,b)}function L(a){console.log("app.pageInitStateChange",a),n(Z,ea,"")}function M(a){console.log("app.pageLinkClicked",a),p(),m()}function N(a){a.events.on("linkClicked",M),a.events.on("initStateChange",L),a.events.on("transitionStart",K),a.events.on("transitionFinish",I),a.events.on("transitionCompleted",H),a.events.on("newPageReady",J)}function O(b){ka=b,N(ka),ka.init(da,ca,a.TRANSITIONS.BASE.DELAY)}function P(a){var b=new l(a);b.load().then(function(){n(Z,a,"")})}function Q(a){return a.replace(/_/g,"-")}function R(a){return a.replace(/(\b[a-z](?!\s))/g,function(a){return a.toUpperCase()})}function S(a){return a=a.toLowerCase(),a=Q(a),a=R(a)}function T(){if(a.FONTS)for(var b in a.FONTS)P(S(a.FONTS[b]))}function U(){ma=new b}function V(){console.log("app.init",a),na=!0,T(),m(),E(),U(),B(),x(),O(e),o()}const W="loaded",X="loading",Y="html",Z="body",$="index-body",_="work-body",aa=".nav-content",ba=".nav-item",ca="content-wrapper",da="page-content",ea="page-transition",fa="pageName",ga="pageType",ha="data-trans-in",ia="data-trans-out";var ja,ka,la,ma,na=!1;return{init:V,get events(){return ma}}}),require.config({paths:{jquery:["//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min","../bower_components/jquery/dist/jquery.min"],hammer:["//cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min","../bower_components/hammerjs/hammer.min"],Barba:["../bower_components/barba.js/dist/barba"],ffo:["//cdnjs.cloudflare.com/ajax/libs/fontfaceobserver/2.0.1/fontfaceobserver.min","../bower_components/fontfaceobserver/fontfaceobserver"],svg4everyone:["//cdnjs.cloudflare.com/ajax/libs/svg4everybody/2.1.1/svg4everybody","/bower_components/svg4everybody/dist/svg4everybody.min"],photoswipe:["//cdnjs.cloudflare.com/ajax/libs/photoswipe/4.1.2/photoswipe.min","/bower_components/photoswipe/dist/photoswipe.min"],photoswipeUI:["//cdnjs.cloudflare.com/ajax/libs/photoswipe/4.1.2/photoswipe-ui-default.min","/bower_components/photoswipe/dist/photoswipe-ui-default.min"],waypoints:["//cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.1/noframework.waypoints.min","/bower_components/waypoints/lib/noframework.waypoints.min"],config:"./config/config",domutils:"./utils/DOMUtils",jsutils:"./utils/jsUtils",dispatcher:"./core/dispatcher",itemlist:"./core/itemlist",pagetrans:"./pagetrans",prevnext:"./prevnext",typemenu:"./typemenu",images:"./images",workpage:"./workpage",nav:"./nav"},shim:{ffo:{exports:"FontFaceObserver"},waypoints:{exports:"Waypoint"}}}),require(["app","domutils","svg4everyone","hammer","Barba","ffo","photoswipe","photoswipeUI","waypoints"],function(a,b,c,d,e,f,g,h,i){"use strict";function j(){console.log(" ----- Running jQuery %s",$().jquery),console.log(" ----- Depandancies"),console.log("app",a),console.log("domutils",b),console.log("svg4everyone",c),console.log("hammer",d),console.log("Barba",e),console.log("ffo",f),console.log("photoswipe",g),console.log("photoswipeUI",h),console.log("waypoints",i)}function k(){return Array.prototype.forEach&&"querySelector"in document&&"localStorage"in window&&"addEventListener"in window?!0:!1}function l(){var a=document.readyState;return"loaded"===a||"interactive"===a||"complete"===a?!0:!1}function m(){c(),a.init()}var n=!0;n!==!1&&window.console||(window.console={},["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeLine","msIsIndependentlyComposed","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"].each(function(a){a in window.console||(window.console[a]=function(){})})),j(),k()&&(l()?m():b.bindEvent(window,"load",m,this))}),define("main",function(){})}();