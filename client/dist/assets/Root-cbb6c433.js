import{r as v,u as H,f as S,j as e,c as y,a as A,b as p,L as M,m as L}from"./index-860b29c8.js";import{N as C,B as w,S as O,c as _,a as k,I as z,L as T,H as V}from"./logo-422b5bda.js";import{u as P,M as U,a as X,b as $,c as R,V as q}from"./chunk-WO74RHXC-d1313f5d.js";function D(r){const{loading:a,src:n,srcSet:i,onLoad:t,onError:l,crossOrigin:c,sizes:s,ignoreFallback:d}=r,[g,f]=v.useState("pending");v.useEffect(()=>{f(n?"loading":"pending")},[n]);const u=v.useRef(),b=v.useCallback(()=>{if(!n)return;m();const o=new Image;o.src=n,c&&(o.crossOrigin=c),i&&(o.srcset=i),s&&(o.sizes=s),a&&(o.loading=a),o.onload=h=>{m(),f("loaded"),t==null||t(h)},o.onerror=h=>{m(),f("failed"),l==null||l(h)},u.current=o},[n,c,i,s,t,l,a]),m=()=>{u.current&&(u.current.onload=null,u.current.onerror=null,u.current=null)};return H(()=>{if(!d)return g==="loading"&&b(),()=>{m()}},[g,b,d]),d?"loaded":g}var J=(r,a)=>r!=="loaded"&&a==="beforeLoadOrError"||r==="failed"&&a==="onError";function K(r,a=[]){const n=Object.assign({},r);for(const i of a)i in n&&delete n[i];return n}var F=S(function(a,n){const{fallbackSrc:i,fallback:t,src:l,srcSet:c,align:s,fit:d,loading:g,ignoreFallback:f,crossOrigin:u,fallbackStrategy:b="beforeLoadOrError",referrerPolicy:m,...o}=a,h=i!==void 0||t!==void 0,I=g!=null||f||!h,G=D({...a,ignoreFallback:I}),B=J(G,b),x={ref:n,objectFit:d,objectPosition:s,...I?o:K(o,["onError","onLoad"])};return B?t||e(y.img,{as:C,className:"chakra-image__placeholder",src:i,...x}):e(y.img,{as:C,src:l,srcSet:c,crossOrigin:u,loading:g,referrerPolicy:m,className:"chakra-image",...x})});F.displayName="Image";var N=S((r,a)=>{const{icon:n,children:i,isRound:t,"aria-label":l,...c}=r,s=n||i,d=v.isValidElement(s)?v.cloneElement(s,{"aria-hidden":!0,focusable:!1}):null;return e(w,{padding:"0",borderRadius:t?"full":void 0,ref:a,"aria-label":l,...c,children:d})});N.displayName="IconButton";var j=S(function(a,n){const{templateAreas:i,gap:t,rowGap:l,columnGap:c,column:s,row:d,autoFlow:g,autoRows:f,templateRows:u,autoColumns:b,templateColumns:m,...o}=a,h={display:"grid",gridTemplateAreas:i,gridGap:t,gridRowGap:l,gridColumnGap:c,gridAutoColumns:b,gridColumn:s,gridRow:d,gridAutoFlow:g,gridAutoRows:f,gridTemplateRows:u,gridTemplateColumns:m};return e(y.div,{ref:n,__css:h,...o})});j.displayName="Grid";var E=S((r,a)=>e(O,{align:"center",...r,direction:"row",ref:a}));E.displayName="HStack";const Q="/assets/undraw_link_shortener-af1f8ff4.png";var W=_({displayName:"HamburgerIcon",viewBox:"0 0 24 24",d:"M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z"});const Y=()=>{const r=A(),a=P({base:!0,md:!1});return e(k,{as:"nav",boxShadow:"md",children:p(k,{display:"flex",justifyContent:"space-between",alignItems:"center",px:{base:"3",lg:"6"},py:{base:"3",lg:"4"},children:[e(k,{children:e(M,{to:"/",children:e(z,{src:T,width:"150px",height:"40px"})})}),a&&p(U,{children:[e(X,{as:N,"aria-label":"Options",icon:e(W,{}),variant:"outline"}),p($,{children:[e(R,{onClick:()=>r("/login"),children:"Sign in"}),e(R,{onClick:()=>r("/register"),children:"Sign up"})]})]}),!a&&p(E,{spacing:"3",children:[e(w,{variant:"ghost",onClick:()=>r("/login"),children:"Sign in"}),e(w,{colorScheme:"blue",onClick:()=>r("/register"),children:"Sign up"})]})]})})},re=()=>{const r=A();return p("section",{style:{overflowX:"hidden"},children:[e(Y,{}),e(k,{sx:{marginTop:5},display:"flex",alignItems:"center",width:"90%",height:"100%",mx:"auto",justifyContent:"center",children:p(j,{templateColumns:{base:"1fr",md:"1fr 1fr"},gap:6,justifyContent:"center",alignItems:"center",children:[e(L.div,{transition:{duration:1},initial:{x:"-100vw",opacity:0},animate:{x:0,opacity:1},children:p(q,{gap:5,children:[e(V,{textAlign:"center",children:"Shorten, share and track your URLs with ease!"}),e(w,{colorScheme:"whatsapp",size:"lg",onClick:()=>r("/register"),children:"Get Started"})]})}),e(L.div,{transition:{duration:1},initial:{x:"100vw",opacity:0},animate:{x:0,opacity:1},children:e(F,{src:Q,alt:"Hero image",objectFit:"cover"})})]})})]})};export{re as default};