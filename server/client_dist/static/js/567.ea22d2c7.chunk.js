"use strict";(self.webpackChunkrestaurant=self.webpackChunkrestaurant||[]).push([[567],{6188:function(e,s,n){var i=n(885),a=(n(2791),n(2677)),t=n(2592),r=n(1733),o=n(184);function c(e){var s=e.time;if(!s)return null;var n=(0,i.Z)(s,2),a=n[0],t=n[1];return(0,o.jsxs)("span",{children:["Time:"," ",a,"-",t," ","Minutes |"," "]})}function d(e){var s=e.foodItem,n=e.bootstrapWidth,i=e.demo,d=s.image,l=s.name,u=s.time,h=s.serves,m=s.price,x=s.discount,j=s.ingredients,f=(0,r.qH)(m),p=x?(0,r.qH)(m,x):null;return(0,o.jsxs)(a.Z,{className:"food-item",md:n,children:[(0,o.jsx)(t.Z,{className:"food-image",src:"".concat(i?"":"https://restaurant-36o0.onrender.com/").concat(d)}),(0,o.jsxs)(a.Z,{className:"below-image-col",children:[(0,o.jsxs)(a.Z,{className:"info-col",children:[(0,o.jsx)("span",{className:"name",children:l}),(0,o.jsx)("span",{className:"ingredients",children:null===j||void 0===j?void 0:j.join(" \u2022 ")}),(0,o.jsxs)("span",{className:"misc-info",children:[(0,o.jsx)(c,{time:u}),(0,o.jsxs)("span",{children:["Serves:"," ",h]})]}),(0,o.jsxs)("div",{className:"price-row",children:[(0,o.jsxs)("span",{className:"current-price",children:["$",x?p:f," "]}),x?(0,o.jsxs)("span",{className:"previous-price",children:["$",f]}):null]})]}),(0,o.jsx)(a.Z,{className:"order-now-button btn btn-primary",children:"Order Now"})]})]})}d.defaultProps={bootstrapWidth:!1,demo:!1},s.Z=d},4715:function(e,s,n){n.r(s),n.d(s,{default:function(){return Y}});var i=n(2791),a=n(7022),t=n(2677),r=n(3360),o=n(4483),c=n(3174),d=n(3504),l=n(3983),u=n(5861),h=n(885),m=n(7757),x=n.n(m),j=n(9349);var f=function(e){var s=e.ref,n=e.func,a=e.timeout,t=void 0===a?350:a,r=(0,i.useState)(!1),o=(0,h.Z)(r,2),c=o[0],d=o[1],l=(0,i.useState)(!1),m=(0,h.Z)(l,2),f=m[0],p=m[1],v=(0,j.Y)(s);return(0,i.useEffect)((function(){v&&!c&&setTimeout((function(){v&&(d(!0),n&&(0,u.Z)(x().mark((function e(){return x().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,n();case 3:return e.prev=3,p(!0),e.finish(3);case 6:case"end":return e.stop()}}),e,null,[[0,,3,6]])})))())}),t)}),[v]),{fixated:c,loaded:f}},p=n(184),v=(0,i.forwardRef)((function(e,s){var n=e.className,a=e.children,t=e.id,r=e.timeout,o=e.func,c=e.animation,d=(0,i.useRef)(null),l=s||d,u=f({ref:l,func:o,timeout:r,id:t}),h=u.fixated,m=u.loaded,x=o&&!m,j=o&&m||!o&&h;return(0,p.jsx)("div",{className:"".concat(n," shown-in-view ").concat(j&&"show"," ").concat(j&&c),id:t,ref:l,style:{height:x?"100vh":""},children:a})}));v.defaultProps={className:"",animation:"anim-one",id:void 0,timeout:void 0,func:void 0};var b=v;var g=function(){return(0,p.jsx)(b,{children:(0,p.jsx)("header",{id:"header",children:(0,p.jsx)(a.Z,{children:(0,p.jsxs)(t.Z,{className:"fg-card",children:[(0,p.jsxs)("h2",{children:["Sed tempus",(0,p.jsx)("br",{}),"d urna et pharetra."]}),(0,p.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et purus a odio finibus bibendum amet leo."}),(0,p.jsxs)(d.OL,{className:"order-now-button btn btn-primary",to:l.YW,children:["Order Now",(0,p.jsx)(o.G,{icon:c.szZ})]}),(0,p.jsxs)(r.Z,{children:["Learn More",(0,p.jsx)(o.G,{icon:c._tD})]})]})})})})};function Z(e){var s=e.IconSvg,n=e.text,i=e.timeout;return(0,p.jsx)(b,{timeout:i,children:(0,p.jsxs)("div",{children:[s,(0,p.jsx)("h6",{children:n})]})})}var w=function(){return(0,p.jsx)(b,{timeout:1e3,children:(0,p.jsxs)("div",{id:"icon-pitch",children:[(0,p.jsx)(Z,{timeout:1050,IconSvg:(0,p.jsx)(o.G,{icon:c.jTV}),text:"Locally sourced"}),(0,p.jsx)(Z,{timeout:1200,IconSvg:(0,p.jsx)(o.G,{icon:c.zzZ}),text:"Handmade"}),(0,p.jsx)(Z,{timeout:1350,IconSvg:(0,p.jsx)(o.G,{icon:c.dLy}),text:"To order"}),(0,p.jsx)(Z,{timeout:1500,IconSvg:(0,p.jsx)(o.G,{icon:c.m6i}),text:"Eat well"})]})})},N=n(9743),y=n(2592),S=n.p+"static/media/about-us-1.0579908ec0e5eb2aeb38.png",k=n.p+"static/media/about-us-2.d5208eea26f0efb606d9.png",E=n(6188);function L(){return(0,p.jsx)(a.Z,{className:"explore-our-foods",children:(0,p.jsxs)(b,{timeout:2200,children:[(0,p.jsx)("h2",{children:"Explore Our Foods"}),(0,p.jsx)("ul",{children:l.$.map((function(e,s){return(0,p.jsx)("li",{children:(0,p.jsx)(b,{timeout:800*(s+1),children:(0,p.jsx)(E.Z,{foodItem:e,demo:!0})})},e.name)}))})]})})}function C(){return(0,p.jsx)(a.Z,{className:"mission-statement",children:(0,p.jsxs)(t.Z,{children:[(0,p.jsx)(b,{children:(0,p.jsxs)(N.Z,{children:[(0,p.jsx)(t.Z,{md:7,children:(0,p.jsx)(b,{timeout:700,children:(0,p.jsx)(y.Z,{className:"image-one",src:S})})}),(0,p.jsxs)(t.Z,{className:"text-col",md:5,children:[(0,p.jsx)("h2",{children:"We pride ourselves on making real food from the best ingredients."}),(0,p.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et purus a odio finibus bibendum in sit amet leo. Mauris feugiat erat tellus.Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts."}),(0,p.jsx)(r.Z,{children:"Learn More"})]})]})}),(0,p.jsx)(b,{animation:"anim-two",children:(0,p.jsxs)(N.Z,{children:[(0,p.jsxs)(t.Z,{className:"lower-col",md:5,children:[(0,p.jsx)("h2",{children:"We make everything by hand with the best possible ingredients."}),(0,p.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et purus a odio finibus bibendum in sit amet leo. Mauris feugiat erat tellus."}),(0,p.jsxs)("ul",{children:[(0,p.jsxs)("li",{children:[(0,p.jsx)(o.G,{icon:c.ThO}),"Etiam sed dolor ac diam volutpat."]},"bp-1"),(0,p.jsxs)("li",{children:[(0,p.jsx)(o.G,{icon:c.ThO}),"Erat volutpat aliquet imperdiet."]},"bp-2"),(0,p.jsxs)("li",{children:[(0,p.jsx)(o.G,{icon:c.ThO}),"purus a odio finibus bibendum."]},"bp-3")]}),(0,p.jsx)(r.Z,{children:"Learn More"})]}),(0,p.jsx)(t.Z,{md:7,children:(0,p.jsx)(b,{timeout:700,animation:"anim-two",children:(0,p.jsx)(y.Z,{className:"image-two",src:k})})})]})})]})})}function T(){return(0,p.jsx)(b,{animation:"anim-three",children:(0,p.jsxs)(t.Z,{className:"video-presentation",children:[(0,p.jsx)("h2",{children:"When one's stomach is full it makes no difference whether they are rich or poor."}),(0,p.jsx)("p",{children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et purus a odio finibus bibendum in sit amet leo. Mauris feugiat erat tellus."}),(0,p.jsxs)("a",{href:"https://www.youtube.com/watch?v=bZx8rPd-PKQ",children:[(0,p.jsx)(o.G,{icon:c.zc}),"Watch Our Story"]})]})})}var O=function(){return(0,p.jsxs)("div",{id:"about-us",children:[(0,p.jsx)(L,{}),(0,p.jsx)(C,{}),(0,p.jsx)(T,{})]})},q=n(1413),G=n(5717),I=n.p+"static/media/review-1-temp.960ff282036e3c4e63eb.jpg";function P(e){var s=e.testimonial;return(0,p.jsxs)("div",{className:"testimonial",children:[(0,p.jsx)(y.Z,{src:I}),(0,p.jsx)("div",{className:"body",children:'"'.concat(s.body,'"')}),(0,p.jsx)("div",{className:"name",children:s.user.name})]})}var M=function(){var e=(0,i.useState)([]),s=(0,h.Z)(e,2),n=s[0],a=s[1];return(0,i.useEffect)((function(){a([{id:1,body:"\u041f\u0440\u043e\u0442\u044f\u0433\u043e\u043c \u043d\u0430\u0441\u0442\u0443\u043f\u043d\u0438\u0445 \u0443\u0440\u043e\u043a\u0456\u0432 \u043c\u0438 \u0431\u0443\u0434\u0435\u043c \u043a\u0440\u043e\u043a \u0437\u0430 \u043a\u0440\u043e\u043a\u043e\u043c \u0441\u0442\u0432\u043e\u0440\u044e\u0432\u0430\u0442\u0438 \u0432\u0435\u0431-\u0434\u043e\u0434\u0430\u0442\u043e\u043a Cat Photo \u043c\u043e\u0432\u043e\u044e HTML5.",user:{name:"\u0421\u043a\u0456\u0441\u043d\u0430",email:"fdsf",avatar:"fgdg"}},{id:2,body:"\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044c \u0443\u0441\u0456 \u0442\u0435\u0433\u0438 li \u0443 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u0456 \u0432\u0438\u043a\u043e\u0440\u0438\u0441\u0442\u043e\u0432\u0443\u044e\u0447\u0438 .selectAll() \u0442\u0430 \u0437\u043c\u0456\u043d\u0456\u0442\u044c \u0457\u0445 \u0442\u0435\u043a\u0441\u0442 \u043d\u0430 \u0440\u044f\u0434\u043e\u043a list item, \u043f\u043e\u0441\u043b\u0456\u0434\u043e\u0432\u043d\u043e \u0441\u043a\u043e\u0440\u0438\u0441\u0442\u0430\u0432\u0448\u0438\u0441\u044c \u043c\u0435\u0442\u043e\u0434\u043e\u043c .text().",user:{name:"C\u043a\u043e\u0440\u0438\u0441\u0442\u0430\u0432\u0448\u0438\u0441\u044c",email:"fdsf",avatar:"fgdg"}},{id:3,body:"\u0412\u0430\u0448 \u043a\u043e\u0434 \u043c\u0430\u0454 \u0437\u0430\u0441\u0442\u043e\u0441\u043e\u0432\u0443\u0432\u0430\u0442\u0438 \u043c\u0435\u0442\u043e\u0434select. \u0412\u0430\u0448 \u043a\u043e\u0434 \u043c\u0430\u0454 \u0437\u0430\u0441\u0442\u043e\u0441\u043e\u0432\u0443\u0432\u0430\u0442\u0438 \u043c\u0435\u0442\u043e\u0434 append. \u0412\u0430\u0448 \u043a\u043e\u0434 \u043c\u0430\u0454 \u0437\u0430\u0441\u0442\u043e\u0441\u043e\u0432\u0443\u0432\u0430\u0442\u0438 \u043c\u0435\u0442\u043e\u0434 text.",user:{name:"\u0417\u0430\u0441\u0442\u043e\u0441\u043e\u0432\u0443\u0432\u0430\u0442\u0438",email:"fdsf",avatar:"fgdg"}}])}),[]),(0,p.jsx)(b,{animation:"anim-four",children:(0,p.jsxs)("div",{id:"testimonials",children:[(0,p.jsx)("h2",{children:"Testimonials"}),(0,p.jsx)(G.Z,(0,q.Z)((0,q.Z)({},{dots:!0,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,arrows:!1}),{},{children:n.map((function(e){return(0,p.jsx)(P,{testimonial:e},e.id)}))}))]})})};var W=function(){return(0,p.jsx)(b,{animation:"anim-four",timeout:200,children:(0,p.jsxs)(a.Z,{id:"faq",children:[(0,p.jsx)("h2",{children:"Frequently Asked Questions"}),(0,p.jsxs)("div",{className:"grid",children:[(0,p.jsxs)(t.Z,{children:[(0,p.jsxs)("span",{className:"question",children:[(0,p.jsx)("span",{className:"tilda",children:"~"}),"Is your bread really baked fresh each day?"]}),(0,p.jsx)("span",{className:"answer",children:"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language."})]}),(0,p.jsxs)(t.Z,{children:[(0,p.jsxs)("span",{className:"question",children:[(0,p.jsx)("span",{className:"tilda",children:"~"}),"Do you bake breads containing animal fats or products?"]}),(0,p.jsx)("span",{className:"answer",children:"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language."})]}),(0,p.jsxs)(t.Z,{children:[(0,p.jsxs)("span",{className:"question",children:[(0,p.jsx)("span",{className:"tilda",children:"~"}),"Can I order your products online?"]}),(0,p.jsx)("span",{className:"answer",children:"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language."})]}),(0,p.jsxs)(t.Z,{children:[(0,p.jsxs)("span",{className:"question",children:[(0,p.jsx)("span",{className:"tilda",children:"~"}),"When are you opening a shop near me?"]}),(0,p.jsx)("span",{className:"answer",children:"Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language."})]})]})]})})},F=n(6560),V=function(e){var s,n=(0,i.useState)(0),a=(0,h.Z)(n,2),t=a[0],r=a[1],o=(0,i.useState)(0),c=(0,h.Z)(o,2),d=c[0],l=c[1],u=(0,F.Z)().height;return(0,i.useEffect)((function(){var s=function(){var s;l(t/u*150),r(window.pageYOffset+200-((null===(s=e.current)||void 0===s?void 0:s.offsetTop)-u))};return window.addEventListener("scroll",s),function(){window.removeEventListener("scroll",s)}}),[window.pageYOffset,null===(s=e.current)||void 0===s?void 0:s.offsetTop,u]),{parallaxPosition:d}};var H=function(){var e=(0,i.useRef)(null),s=V(e).parallaxPosition;return(0,p.jsx)("div",{id:"parallax",ref:e,children:(0,p.jsx)("div",{className:"parallax-img",style:{backgroundPosition:"0px -".concat(s,"px")},children:(0,p.jsx)("h2",{className:"overlay-header",children:"Prepared fresh daily with passion."})})})},z=n(3855);var B=function(){var e=(0,i.useState)(""),s=(0,h.Z)(e,2),n=s[0],r=s[1];return(0,p.jsx)(a.Z,{id:"subscribe",children:(0,p.jsxs)(t.Z,{md:8,className:"content",children:[(0,p.jsx)("h2",{children:"Hurry up! Subscribe to our newsletter and get 25% Off"}),(0,p.jsx)("p",{children:"Limited promotion. No credit card required."}),(0,p.jsx)(z.Z,{onSubmit:function(e){return function(e){e.preventDefault()}(e)},children:(0,p.jsxs)(N.Z,{children:[(0,p.jsx)(t.Z,{children:(0,p.jsx)(z.Z.Control,{placeholder:"Email address",type:"text",value:n,onChange:function(e){return r(e.target.value)}})}),(0,p.jsx)(t.Z,{md:"auto",children:(0,p.jsx)(z.Z.Control,{type:"submit",value:"Subscribe"})})]})})]})})};var Y=function(){return(0,p.jsxs)("div",{children:[(0,p.jsx)(g,{}),(0,p.jsx)(w,{}),(0,p.jsx)(O,{}),(0,p.jsx)(M,{}),(0,p.jsx)(W,{}),(0,p.jsx)(H,{}),(0,p.jsx)(B,{})]})}}}]);
//# sourceMappingURL=567.ea22d2c7.chunk.js.map