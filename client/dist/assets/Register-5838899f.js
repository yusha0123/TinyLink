import{q as v,r,m as a,F as b,j as e,L as I,y as k,n as A,z as L,B as T,C as j}from"./index-e9646c17.js";import{V as F,a as P}from"./chunk-WQWU3AO7-3e74b768.js";import{B as f,I as R,L as B,H as q,S as w,a as l}from"./logo-5279bed2.js";import{u as H,F as c,c as d,a as u,I as V,b as z,T as E}from"./chunk-P74GIWPW-b748c6c3.js";const G=()=>{const m=v(),S=H(),[h,x]=r.useState(!1),[y,g]=r.useState(!1),[t,i]=r.useState({email:"",username:"",password:""}),[p,o]=r.useState({open:!1,message:""}),C=s=>{if(s.preventDefault(),t.username.length<4){o({open:!0,message:"Please use a Valid Username!"});return}else if(t.password.length<6){o({open:!0,message:"Password length is too Short!"});return}g(!0),o({open:!1,message:""}),fetch("/api/auth/register",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:t.email,username:t.username,password:t.password})}).then(n=>n.json()).then(n=>{n.success&&(localStorage.setItem("accessToken",n.accessToken),m("/home")),S({title:n.message||n.error,status:n.success?"success":"error",duration:3e3,isClosable:!0,position:"top"})}).catch(n=>{console.log(n)}).finally(()=>{g(!1)})};return a(b,{children:[e(f,{position:"fixed",top:0,right:0,left:0,my:2,children:e(I,{to:"/",children:e(R,{src:B,width:"150px",height:"40px",mx:"auto"})})}),e(k,{minH:"100vh",align:"center",justify:"center",bg:"gray.200",children:e(f,{rounded:"lg",bg:"white",boxShadow:"lg",p:6,w:{base:"90%",md:"50%",lg:"30%"},children:a(A.div,{initial:{opacity:0},animate:{opacity:1},transition:{duration:.5},style:{width:"100%"},children:[e(q,{fontSize:"2xl",textAlign:"center",mb:6,children:"Create your account"}),a("form",{onSubmit:C,children:[a(w,{spacing:1,children:[p.open&&a(L,{status:"error",borderRadius:8,children:[e(T,{}),p.message,e(j,{onClick:()=>{o({open:!1,message:""})},ml:"auto"})]}),a(c,{isRequired:!0,children:[e(d,{children:"Username"}),e(u,{type:"text",autoComplete:"off",value:t.name,onChange:s=>{i({...t,username:s.target.value})}})]}),a(c,{isRequired:!0,children:[e(d,{children:"Email address"}),e(u,{type:"email",autoComplete:"off",value:t.email,onChange:s=>{i({...t,email:s.target.value})}})]}),a(c,{isRequired:!0,children:[e(d,{children:"Password"}),a(V,{children:[e(u,{type:h?"text":"password",autoComplete:"off",value:t.password,onChange:s=>{i({...t,password:s.target.value})}}),e(z,{h:"full",children:e(l,{variant:"ghost",onClick:()=>x(s=>!s),children:h?e(F,{}):e(P,{})})})]})]})]}),a(w,{spacing:3,mt:3,children:[e(l,{colorScheme:"messenger",type:"submit",isLoading:y,children:"Create Account"}),a(E,{textAlign:"center",fontSize:"md",children:["Already Have an Account?"," ",e(l,{colorScheme:"teal",variant:"link",onClick:()=>m("/login"),children:"Sign In"})]})]})]})]})})})]})};export{G as default};