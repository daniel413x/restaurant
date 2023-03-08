"use strict";(self.webpackChunkrestaurant=self.webpackChunkrestaurant||[]).push([[925],{6183:function(e,n,t){t.d(n,{Z:function(){return d}});t(2791);var r=t(4483),a=t(3174),o=t(3360),i=t(1733),c=t(184);function s(e){var n=e.foodItem,t=e.quantity,s=e.handleDeleteModal,l=e.increment,u=e.decrement,d=n.price,f=n.discount,m=(0,i.qH)(d*t,f);return(0,c.jsxs)("div",{className:"price-buttons",children:[(0,c.jsx)("div",{className:"quantity-input",children:(0,c.jsx)("div",{className:"quantity-wrapper",children:(0,c.jsx)("input",{value:t,className:"quantity",type:"number",min:"1",id:"item-quantity-counter",readOnly:!0})})}),(0,c.jsxs)("div",{className:"price",children:["$",m]}),(0,c.jsxs)("div",{className:"icon-buttons",children:[s&&(0,c.jsx)(o.Z,{id:"delete-item-button",onClick:s,children:(0,c.jsx)(r.G,{icon:a.gPx})}),(0,c.jsx)(o.Z,{id:"decrement-item-button",className:"".concat(t<=1&&"blocked"),onClick:u,children:(0,c.jsx)(r.G,{icon:a.eW2})}),(0,c.jsx)(o.Z,{id:"increment-item-button",onClick:l,children:(0,c.jsx)(r.G,{icon:a.l1h})})]})]})}s.defaultProps={handleDeleteModal:!1};var l=s;function u(e){var n=e.foodItem,t=e.handleDeleteModal,r=e.quantity,a=e.increment,o=e.decrement,i=n.name,s=n.ingredients,u=n.instructions,d=i.split(" ").join("-").toLowerCase();return(0,c.jsxs)("div",{className:"food-item-auxiliary",id:d,children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("div",{className:"name",children:i}),(0,c.jsx)("div",{children:null===s||void 0===s?void 0:s.join(", ")}),u&&(0,c.jsx)("textarea",{value:u,readOnly:!0})]}),(0,c.jsx)(l,{foodItem:n,handleDeleteModal:t,quantity:r,increment:a,decrement:o})]})}u.defaultProps={handleDeleteModal:!1};var d=u},2249:function(e,n,t){t(2791);var r=t(184);function a(e){var n=e.items,t=e.renderList,a=e.className,o=e.children,i=e.id;return(0,r.jsxs)("ul",{className:"".concat(a),id:i,children:[null===n||void 0===n?void 0:n.map(t),o]})}a.defaultProps={className:"",children:!1,id:""},n.Z=a},3391:function(e,n,t){t.d(n,{Ly:function(){return c},c5:function(){return l},x:function(){return s}});var r=t(5861),a=t(7757),o=t.n(a),i=t(5229),c=function(){var e=(0,r.Z)(o().mark((function e(n){var t,r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.G.post("api/fooditemincart",n);case 2:return t=e.sent,r=t.data,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),s=function(){var e=(0,r.Z)(o().mark((function e(n,t){var r,a;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.G.put("api/fooditemincart/".concat(n),{quantity:t});case 2:return r=e.sent,a=r.data,e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}(),l=function(){var e=(0,r.Z)(o().mark((function e(n){var t,r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.G.delete("api/fooditemincart/".concat(n));case 2:return t=e.sent,r=t.data,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()},5316:function(e,n,t){t.d(n,{Z:function(){return B}});var r,a=t(885),o=t(5987),i=t(1413),c=t(1694),s=t.n(c),l=t(3070),u=t(7357),d=t(8376),f=t(6382);function m(e){if((!r&&0!==r||e)&&u.Z){var n=document.createElement("div");n.style.position="absolute",n.style.top="-9999px",n.style.width="50px",n.style.height="50px",n.style.overflow="scroll",document.body.appendChild(n),r=n.offsetWidth-n.clientWidth,document.body.removeChild(n)}return r}var p=t(7731),v=t(9007),h=t(3201),b=t(1683),x=t(3690),Z=t(2791),y=t(1835),N=t(5137),g=t(2709),w=t(6543),j=(0,w.Z)("modal-body"),k=t(9820),E=t(162),C=t(184),D=["bsPrefix","className","contentClassName","centered","size","fullscreen","children","scrollable"],F=Z.forwardRef((function(e,n){var t=e.bsPrefix,r=e.className,a=e.contentClassName,c=e.centered,l=e.size,u=e.fullscreen,d=e.children,f=e.scrollable,m=(0,o.Z)(e,D);t=(0,E.vE)(t,"modal");var p="".concat(t,"-dialog"),v="string"===typeof u?"".concat(t,"-fullscreen-").concat(u):"".concat(t,"-fullscreen");return(0,C.jsx)("div",(0,i.Z)((0,i.Z)({},m),{},{ref:n,className:s()(p,r,l&&"".concat(t,"-").concat(l),c&&"".concat(p,"-centered"),f&&"".concat(p,"-scrollable"),u&&v),children:(0,C.jsx)("div",{className:s()("".concat(t,"-content"),a),children:d})}))}));F.displayName="ModalDialog";var P=F,R=(0,w.Z)("modal-footer"),M=t(8024),O=["bsPrefix","className"],T=Z.forwardRef((function(e,n){var t=e.bsPrefix,r=e.className,a=(0,o.Z)(e,O);return t=(0,E.vE)(t,"modal-header"),(0,C.jsx)(M.Z,(0,i.Z)((0,i.Z)({ref:n},a),{},{className:s()(r,t)}))}));T.displayName="ModalHeader",T.defaultProps={closeLabel:"Close",closeButton:!1};var q=T,H=(0,t(7472).Z)("h4"),I=(0,w.Z)("modal-title",{Component:H}),S=["bsPrefix","className","style","dialogClassName","contentClassName","children","dialogAs","aria-labelledby","aria-describedby","aria-label","show","animation","backdrop","keyboard","onEscapeKeyDown","onShow","onHide","container","autoFocus","enforceFocus","restoreFocus","restoreFocusOptions","onEntered","onExit","onExiting","onEnter","onEntering","onExited","backdropClassName","manager"],A={show:!1,backdrop:!0,keyboard:!0,autoFocus:!0,enforceFocus:!0,restoreFocus:!0,animation:!0,dialogAs:P};function G(e){return(0,C.jsx)(g.Z,(0,i.Z)((0,i.Z)({},e),{},{timeout:null}))}function L(e){return(0,C.jsx)(g.Z,(0,i.Z)((0,i.Z)({},e),{},{timeout:null}))}var z=Z.forwardRef((function(e,n){var t=e.bsPrefix,r=e.className,c=e.style,g=e.dialogClassName,w=e.contentClassName,j=e.children,D=e.dialogAs,F=e["aria-labelledby"],P=e["aria-describedby"],R=e["aria-label"],M=e.show,O=e.animation,T=e.backdrop,q=e.keyboard,H=e.onEscapeKeyDown,I=e.onShow,A=e.onHide,z=e.container,B=e.autoFocus,K=e.enforceFocus,W=e.restoreFocus,U=e.restoreFocusOptions,_=e.onEntered,$=e.onExit,J=e.onExiting,Q=e.onEnter,V=e.onEntering,X=e.onExited,Y=e.backdropClassName,ee=e.manager,ne=(0,o.Z)(e,S),te=(0,Z.useState)({}),re=(0,a.Z)(te,2),ae=re[0],oe=re[1],ie=(0,Z.useState)(!1),ce=(0,a.Z)(ie,2),se=ce[0],le=ce[1],ue=(0,Z.useRef)(!1),de=(0,Z.useRef)(!1),fe=(0,Z.useRef)(null),me=(0,p.Z)(),pe=(0,a.Z)(me,2),ve=pe[0],he=pe[1],be=(0,h.Z)(n,he),xe=(0,v.Z)(A),Ze=(0,E.SC)();t=(0,E.vE)(t,"modal");var ye=(0,Z.useMemo)((function(){return{onHide:xe}}),[xe]);function Ne(){return ee||(0,N.t)({isRTL:Ze})}function ge(e){if(u.Z){var n=Ne().getScrollbarWidth()>0,t=e.scrollHeight>(0,d.Z)(e).documentElement.clientHeight;oe({paddingRight:n&&!t?m():void 0,paddingLeft:!n&&t?m():void 0})}}var we=(0,v.Z)((function(){ve&&ge(ve.dialog)}));(0,b.Z)((function(){(0,f.Z)(window,"resize",we),null==fe.current||fe.current()}));var je=function(){ue.current=!0},ke=function(e){ue.current&&ve&&e.target===ve.dialog&&(de.current=!0),ue.current=!1},Ee=function(){le(!0),fe.current=(0,x.Z)(ve.dialog,(function(){le(!1)}))},Ce=function(e){"static"!==T?de.current||e.target!==e.currentTarget?de.current=!1:null==A||A():function(e){e.target===e.currentTarget&&Ee()}(e)},De=(0,Z.useCallback)((function(e){return(0,C.jsx)("div",(0,i.Z)((0,i.Z)({},e),{},{className:s()("".concat(t,"-backdrop"),Y,!O&&"show")}))}),[O,Y,t]),Fe=(0,i.Z)((0,i.Z)({},c),ae);Fe.display="block";return(0,C.jsx)(k.Z.Provider,{value:ye,children:(0,C.jsx)(y.Z,{show:M,ref:be,backdrop:T,container:z,keyboard:!0,autoFocus:B,enforceFocus:K,restoreFocus:W,restoreFocusOptions:U,onEscapeKeyDown:function(e){q||"static"!==T?q&&H&&H(e):(e.preventDefault(),Ee())},onShow:I,onHide:A,onEnter:function(e,n){e&&ge(e),null==Q||Q(e,n)},onEntering:function(e,n){null==V||V(e,n),(0,l.ZP)(window,"resize",we)},onEntered:_,onExit:function(e){null==fe.current||fe.current(),null==$||$(e)},onExiting:J,onExited:function(e){e&&(e.style.display=""),null==X||X(e),(0,f.Z)(window,"resize",we)},manager:Ne(),transition:O?G:void 0,backdropTransition:O?L:void 0,renderBackdrop:De,renderDialog:function(e){return(0,C.jsx)("div",(0,i.Z)((0,i.Z)({role:"dialog"},e),{},{style:Fe,className:s()(r,t,se&&"".concat(t,"-static")),onClick:T?Ce:void 0,onMouseUp:ke,"aria-label":R,"aria-labelledby":F,"aria-describedby":P,children:(0,C.jsx)(D,(0,i.Z)((0,i.Z)({},ne),{},{onMouseDown:je,className:g,contentClassName:w,children:j}))}))}})})}));z.displayName="Modal",z.defaultProps=A;var B=Object.assign(z,{Body:j,Header:q,Title:I,Footer:R,Dialog:P,TRANSITION_DURATION:300,BACKDROP_TRANSITION_DURATION:150})}}]);
//# sourceMappingURL=925.5bec3bf3.chunk.js.map