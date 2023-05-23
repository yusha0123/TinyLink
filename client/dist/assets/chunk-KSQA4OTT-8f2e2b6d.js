import{a as T,S as _,b as g,d as L}from"./logo-6702995d.js";import{f as p,r as b,j as h,w as V,i as E,x as k}from"./index-5db04834.js";var j=p((e,t)=>{const{icon:n,children:a,isRound:o,"aria-label":i,...c}=e,l=n||a,u=b.isValidElement(l)?b.cloneElement(l,{"aria-hidden":!0,focusable:!1}):null;return h(T,{padding:"0",borderRadius:o?"full":void 0,ref:t,"aria-label":i,...c,children:u})});j.displayName="IconButton";function v(e){return e!=null&&typeof e=="object"&&"nodeType"in e&&e.nodeType===Node.ELEMENT_NODE}function y(e){var t;if(!v(e))return!1;const n=(t=e.ownerDocument.defaultView)!=null?t:window;return e instanceof n.HTMLElement}function F(e){var t,n;return(n=(t=w(e))==null?void 0:t.defaultView)!=null?n:window}function w(e){return v(e)?e.ownerDocument:document}function P(e){return w(e).activeElement}var x=e=>e.hasAttribute("tabindex"),I=e=>x(e)&&e.tabIndex===-1;function N(e){return!!e.getAttribute("disabled")||!!e.getAttribute("aria-disabled")}function A(e){return e.parentElement&&A(e.parentElement)?!0:e.hidden}function B(e){const t=e.getAttribute("contenteditable");return t!=="false"&&t!=null}function M(e){if(!y(e)||A(e)||N(e))return!1;const{localName:t}=e;if(["input","select","textarea","button"].indexOf(t)>=0)return!0;const a={a:()=>e.hasAttribute("href"),audio:()=>e.hasAttribute("controls"),video:()=>e.hasAttribute("controls")};return t in a?a[t]():B(e)?!0:x(e)}function Q(e){return e?y(e)&&M(e)&&!I(e):!1}var D=p((e,t)=>h(_,{align:"center",...e,direction:"column",ref:t}));D.displayName="VStack";function S(e,t={}){const{ssr:n=!0,fallback:a}=t,{getWindow:o}=V(),i=Array.isArray(e)?e:[e];let c=Array.isArray(a)?a:[a];c=c.filter(r=>r!=null);const[l,u]=b.useState(()=>i.map((r,d)=>({media:r,matches:n?!!c[d]:o().matchMedia(r).matches})));return b.useEffect(()=>{const r=o();u(i.map(s=>({media:s,matches:r.matchMedia(s).matches})));const d=i.map(s=>r.matchMedia(s)),f=s=>{u(O=>O.slice().map(m=>m.media===s.media?{...m,matches:s.matches}:m))};return d.forEach(s=>{typeof s.addListener=="function"?s.addListener(f):s.addEventListener("change",f)}),()=>{d.forEach(s=>{typeof s.removeListener=="function"?s.removeListener(f):s.removeEventListener("change",f)})}},[o]),l.map(r=>r.matches)}function H(e,t,n=g){let a=Object.keys(e).indexOf(t);if(a!==-1)return e[t];let o=n.indexOf(t);for(;o>=0;){const i=n[o];if(e.hasOwnProperty(i)){a=o;break}o-=1}if(a!==-1){const i=n[a];return e[i]}}function R(e){var t,n;const a=k(e)?e:{fallback:e??"base"},i=E().__breakpoints.details.map(({minMaxQuery:r,breakpoint:d})=>({breakpoint:d,query:r.replace("@media screen and ","")})),c=i.map(r=>r.breakpoint===a.fallback),u=S(i.map(r=>r.query),{fallback:c,ssr:a.ssr}).findIndex(r=>r==!0);return(n=(t=i[u])==null?void 0:t.breakpoint)!=null?n:a.fallback}function z(e,t){var n;const a=k(t)?t:{fallback:t??"base"},o=R(a),i=E();if(!o)return;const c=Array.from(((n=i.__breakpoints)==null?void 0:n.keys)||[]),l=Array.isArray(e)?Object.fromEntries(Object.entries(L(e,c)).map(([u,r])=>[u,r])):e;return H(l,o,c)}export{j as I,D as V,F as a,M as b,P as g,Q as i,z as u};
