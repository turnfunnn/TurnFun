import{useState,useEffect,useRef,useCallback,useMemo}from”react”;

// ===== SPLASH CANVAS ORBS =====
const ORB_COUNT = 7;

// ===== SPLASH SCREEN =====
function SplashScreen({onDone}) {
const canvasRef = useRef(null);
useEffect(() => {
const t = setTimeout(onDone, 1600);
return () => clearTimeout(t);
}, [onDone]);

useEffect(() => {
const canvas = canvasRef.current;
if (!canvas) return;
const ctx = canvas.getContext(“2d”);
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;
const onR = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
window.addEventListener(“resize”, onR);
const orbs = Array.from({ length: ORB_COUNT }, (_, i) => ({
x: 0.1 + Math.random() * 0.8, y: 0.52 + Math.random() * 0.4,
r: 50 + Math.random() * 75, phase: Math.random() * Math.PI * 2,
speed: 0.0008 + Math.random() * 0.0006, hue: 260 + Math.random() * 40,
}));
let raf;
const draw = () => {
ctx.clearRect(0, 0, W, H);
const bg = ctx.createRadialGradient(W*.5, H*.35, 0, W*.5, H*.5, Math.max(W,H));
bg.addColorStop(0,“rgba(18,10,45,1)”); bg.addColorStop(0.5,“rgba(8,5,22,1)”); bg.addColorStop(1,“rgba(3,2,10,1)”);
ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
ctx.strokeStyle=“rgba(140,100,255,0.035)”; ctx.lineWidth=1;
for(let x=0;x<W;x+=44){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
for(let y=0;y<H;y+=44){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
orbs.forEach((orb,i)=>{
orb.phase+=orb.speed;
const ox=orb.x*W+Math.sin(orb.phase*.7+i)*W*.06;
const oy=orb.y*H+Math.cos(orb.phase*.5+i*.8)*H*.04;
const r=orb.r*(1+.08*Math.sin(orb.phase*1.3));
const glow=ctx.createRadialGradient(ox,oy,0,ox,oy,r*2.2);
glow.addColorStop(0,`hsla(${orb.hue},80%,70%,0.12)`); glow.addColorStop(1,“transparent”);
ctx.beginPath();ctx.arc(ox,oy,r*2.2,0,Math.PI*2);ctx.fillStyle=glow;ctx.fill();
const glass=ctx.createRadialGradient(ox-r*.28,oy-r*.28,0,ox,oy,r);
glass.addColorStop(0,`hsla(${orb.hue},60%,88%,0.22)`); glass.addColorStop(.4,`hsla(${orb.hue},70%,65%,0.1)`);
glass.addColorStop(.85,`hsla(${orb.hue},80%,55%,0.06)`); glass.addColorStop(1,`hsla(${orb.hue},90%,70%,0.18)`);
ctx.beginPath();ctx.arc(ox,oy,r,0,Math.PI*2);ctx.fillStyle=glass;ctx.fill();
ctx.save();ctx.beginPath();ctx.arc(ox,oy,r,0,Math.PI*2);ctx.clip();
const spec=ctx.createRadialGradient(ox-r*.32,oy-r*.36,0,ox-r*.25,oy-r*.25,r*.55);
spec.addColorStop(0,“rgba(255,255,255,0.55)”);spec.addColorStop(.5,“rgba(255,255,255,0.08)”);spec.addColorStop(1,“transparent”);
ctx.fillStyle=spec;ctx.fillRect(ox-r,oy-r,r*2,r*2);
ctx.strokeStyle=`hsla(${orb.hue},70%,80%,0.25)`;ctx.lineWidth=1;
ctx.beginPath();ctx.arc(ox,oy,r,0,Math.PI*2);ctx.stroke();ctx.restore();
});
raf=requestAnimationFrame(draw);
};
draw();
return()=>{cancelAnimationFrame(raf);window.removeEventListener(“resize”,onR);};
},[]);

return (

<div style={{position:"fixed",inset:0,background:"#060408",overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:99999}}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&family=DM+Sans:wght@300;400&display=swap'); @keyframes wavTop{0%,100%{transform:translateY(0)}40%{transform:translateY(-3px)}70%{transform:translateY(2px)}} @keyframes wavBot{0%,100%{transform:translateY(0)}40%{transform:translateY(3px)}70%{transform:translateY(-2px)}} @keyframes spGlow{0%,100%{filter:drop-shadow(0 0 18px rgba(170,130,255,.6)) drop-shadow(0 0 50px rgba(110,75,230,.3))}50%{filter:drop-shadow(0 0 38px rgba(200,170,255,.95)) drop-shadow(0 0 90px rgba(140,95,245,.55))}} @keyframes spFloat{0%,100%{transform:translateY(0)}40%{transform:translateY(-7px)}70%{transform:translateY(4px)}} @keyframes spNameIn{0%{opacity:0;transform:translateY(28px);filter:blur(12px)}100%{opacity:1;transform:none;filter:blur(0)}} @keyframes spTagIn{0%{opacity:0;transform:translateY(14px)}100%{opacity:1;transform:none}} @keyframes spPillPop{0%{opacity:0;transform:scale(.65) translateY(12px)}100%{opacity:1;transform:scale(1) translateY(0)}} @keyframes spLineGrow{0%{width:0;opacity:0}100%{width:65px;opacity:1}} @keyframes spShimmer{0%{background-position:200% center}100%{background-position:-200% center}} @keyframes spDot{0%,100%{transform:scale(1);opacity:.4}50%{transform:scale(1.65);opacity:1}} @keyframes spRing{0%{transform:scale(.7);opacity:.6}100%{transform:scale(2.6);opacity:0}} .sp-logo{animation:spGlow 2.5s ease-in-out .6s infinite,spFloat 3.8s ease-in-out .6s infinite} .sp-wt{animation:wavTop 3.8s ease-in-out infinite} .sp-wb{animation:wavBot 3.8s ease-in-out .18s infinite}`}</style>
<canvas ref={canvasRef} style={{position:"absolute",inset:0,zIndex:0}}/>
{[0,.9,1.8].map((d,i)=>(
<div key={i} style={{position:"absolute",width:180,height:180,borderRadius:"50%",border:"1px solid rgba(160,120,255,.18)",animation:`spRing 3s ease-out ${d}s infinite`,opacity:0,zIndex:1}}/>
))}
<div style={{position:"relative",zIndex:2,display:"flex",flexDirection:"column",alignItems:"center"}}>
<div className="sp-logo" style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:8}}>
<svg className="sp-wt" width="60" height="14" viewBox="0 0 68 16" fill="none" style={{display:"block",marginBottom:2,filter:"drop-shadow(0 0 8px rgba(200,175,255,.7))"}}>
<defs><linearGradient id="spwg1" x1="0" y1="0" x2="68" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="rgba(180,155,255,0.25)"/><stop offset="35%" stopColor="rgba(255,255,255,0.95)"/><stop offset="65%" stopColor="rgba(210,190,255,0.88)"/><stop offset="100%" stopColor="rgba(160,130,255,0.3)"/></linearGradient></defs>
<path d="M2 11 C12 3, 24 1, 34 6 C44 11, 56 2, 66 7" stroke="url(#spwg1)" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
<path d="M2 11 C12 3, 24 1, 34 6 C44 11, 56 2, 66 7" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="8 28"/>
</svg>
<span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:38,letterSpacing:"-.042em",lineHeight:1,display:"block",background:"linear-gradient(135deg,rgba(210,200,255,.6) 0%,#fff 25%,rgba(205,185,255,.95) 55%,rgba(170,135,255,.8) 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",backgroundSize:"200% auto",animation:"spShimmer 3s linear 1s infinite"}}>TURNFUN</span>
<svg className="sp-wb" width="60" height="12" viewBox="0 0 68 14" fill="none" style={{display:"block",marginTop:2,filter:"drop-shadow(0 0 6px rgba(180,150,255,.55))"}}>
<defs><linearGradient id="spwg2" x1="0" y1="0" x2="68" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="rgba(155,120,255,0.2)"/><stop offset="45%" stopColor="rgba(255,255,255,0.82)"/><stop offset="80%" stopColor="rgba(190,165,255,0.7)"/><stop offset="100%" stopColor="rgba(145,112,255,0.22)"/></linearGradient></defs>
<path d="M2 5 C14 11, 26 13, 34 8 C42 3, 54 11, 66 6" stroke="url(#spwg2)" strokeWidth="3" strokeLinecap="round" fill="none"/>
<path d="M2 5 C14 11, 26 13, 34 8 C42 3, 54 11, 66 6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round" fill="none" strokeDasharray="6 24"/>
</svg>
</div>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20,animation:"spTagIn .6s cubic-bezier(.22,1,.36,1) .7s both"}}>
<div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(168,138,255,.68))",animation:"spLineGrow .7s cubic-bezier(.22,1,.36,1) .75s both"}}/>
<span style={{fontFamily:"'DM Sans',sans-serif",fontWeight:400,fontSize:11.5,letterSpacing:".26em",color:"rgba(192,170,255,.72)",textTransform:"uppercase",whiteSpace:"nowrap"}}>All in One</span>
<div style={{height:1,background:"linear-gradient(90deg,rgba(168,138,255,.68),transparent)",animation:"spLineGrow .7s cubic-bezier(.22,1,.36,1) .75s both"}}/>
</div>
<div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",maxWidth:300}}>
{[["📚","HSC & SSC"],["🎮","Gaming"],["🎬","Movies"],["📰","Stories"]].map(([e,l],i)=>(
<div key={i} style={{padding:"6px 13px",borderRadius:50,border:"1px solid rgba(200,175,255,.2)",background:"linear-gradient(135deg,rgba(255,255,255,.08),rgba(180,150,255,.05))",backdropFilter:"blur(22px)",boxShadow:"0 1px 0 rgba(255,255,255,.12) inset,0 4px 16px rgba(0,0,0,.35)",fontFamily:"'DM Sans',sans-serif",fontSize:11.5,color:"rgba(208,192,255,.85)",animation:`spPillPop .5s cubic-bezier(.34,1.4,.64,1) ${.9+i*.1}s both`}}>
{e} {l}
</div>
))}
</div>
<div style={{display:"flex",gap:8,marginTop:28,animation:"spTagIn .4s ease 1.3s both"}}>
{[0,1,2].map(i=>(<div key={i} style={{width:5,height:5,borderRadius:"50%",background:"rgba(175,145,255,.5)",animation:`spDot 1.1s ease-in-out ${i*.22}s infinite`}}/>))}
</div>
</div>
</div>
);
}

const T={
dark:{id:“dark”,bg:”#07070a”,grad:“radial-gradient(ellipse 130% 100% at 15% 5%,#0f0e1a,#060508,#000)”,b1:“rgba(80,60,160,.18)”,b2:“rgba(40,30,100,.14)”,b3:“rgba(100,80,200,.1)”,vig:“radial-gradient(ellipse 92% 88% at 50% 50%,transparent 40%,rgba(0,0,0,.72))”,txt:“rgba(255,255,255,.9)”,sub:“rgba(255,255,255,.34)”,mid:“rgba(255,255,255,.6)”,div:“rgba(255,255,255,.05)”,cbg:“linear-gradient(145deg,rgba(255,255,255,.11),rgba(255,255,255,.04) 50%,rgba(255,255,255,.08))”,cb:“rgba(255,255,255,.16)”,cbh:“rgba(255,255,255,.32)”,cs:“0 1px 0 rgba(255,255,255,.18) inset,0 4px 16px rgba(0,0,0,.55),0 16px 48px rgba(0,0,0,.65)”,csh:“0 1px 0 rgba(255,255,255,.28) inset,0 12px 40px rgba(0,0,0,.75)”,ibg:“linear-gradient(145deg,rgba(255,255,255,.14),rgba(255,255,255,.05))”,ib:“rgba(255,255,255,.22)”,is:“0 1px 0 rgba(255,255,255,.22) inset,0 4px 16px rgba(0,0,0,.5)”,ic:“rgba(255,255,255,.82)”,pbg:“rgba(255,255,255,.048)”,pb:“rgba(255,255,255,.1)”,ps:“0 1px 0 rgba(255,255,255,.1) inset,0 6px 32px rgba(0,0,0,.42)”,sbg:“rgba(255,255,255,.065)”,sbd:“rgba(255,255,255,.14)”,inp:“rgba(255,255,255,.85)”,bbg:“rgba(255,255,255,.09)”,bbd:“rgba(255,255,255,.18)”,nbg:”#fff”,nc:”#000”,dm:true,par:[“rgba(255,255,255,.7)”,“rgba(200,180,255,.6)”,“rgba(180,200,255,.5)”],r1:“rgba(255,255,255,.06)”,sh:“rgba(255,255,255,.07)”,hl:“rgba(255,255,255,.55)”,lf:“rgba(255,255,255,.12)”,ca:“rgba(255,255,255,.06)”,bg1:“rgba(80,60,160,.18)”,bg2:“rgba(40,30,100,.14)”,bg3:“rgba(100,80,200,.1)”},
liquid:{id:“liquid”,bg:”#000000”,grad:“radial-gradient(ellipse 150% 120% at 20% 10%,rgba(20,60,100,.08),rgba(10,30,60,.04),#000000) no-repeat fixed”,b1:“rgba(20,80,140,.08)”,b2:“rgba(15,60,110,.06)”,b3:“rgba(25,90,150,.07)”,vig:“radial-gradient(ellipse 95% 90% at 50% 50%,transparent 35%,rgba(0,0,0,.9))”,txt:“rgba(255,255,255,.9)”,sub:“rgba(255,255,255,.34)”,mid:“rgba(255,255,255,.6)”,div:“rgba(255,255,255,.05)”,cbg:“linear-gradient(145deg,rgba(255,255,255,.11),rgba(255,255,255,.04) 50%,rgba(255,255,255,.08))”,cb:“rgba(255,255,255,.16)”,cbh:“rgba(255,255,255,.32)”,cs:“0 1px 0 rgba(255,255,255,.18) inset,0 4px 16px rgba(0,0,0,.55),0 16px 48px rgba(0,0,0,.65)”,csh:“0 1px 0 rgba(255,255,255,.28) inset,0 12px 40px rgba(0,0,0,.75)”,ibg:“linear-gradient(145deg,rgba(255,255,255,.14),rgba(255,255,255,.05))”,ib:“rgba(255,255,255,.22)”,is:“0 1px 0 rgba(255,255,255,.22) inset,0 4px 16px rgba(0,0,0,.5)”,ic:“rgba(255,255,255,.82)”,pbg:“rgba(255,255,255,.048)”,pb:“rgba(255,255,255,.1)”,ps:“0 1px 0 rgba(255,255,255,.1) inset,0 6px 32px rgba(0,0,0,.42)”,sbg:“rgba(255,255,255,.065)”,sbd:“rgba(255,255,255,.14)”,inp:“rgba(255,255,255,.85)”,bbg:“rgba(255,255,255,.09)”,bbd:“rgba(255,255,255,.18)”,nbg:”#fff”,nc:”#000”,dm:true,par:[“rgba(255,255,255,.7)”,“rgba(200,180,255,.6)”,“rgba(180,200,255,.5)”],r1:“rgba(255,255,255,.06)”,sh:“rgba(255,255,255,.07)”,hl:“rgba(255,255,255,.55)”,lf:“rgba(255,255,255,.12)”,ca:“rgba(255,255,255,.06)”,bg1:“rgba(20,80,140,.08)”,bg2:“rgba(15,60,110,.06)”,bg3:“rgba(25,90,150,.07)”}
};

const boards=[{id:1,n:“Dhaka Board”,e:“🏛️”},{id:2,n:“Rajshahi Board”,e:“🏫”},{id:3,n:“Comilla Board”,e:“📖”},{id:4,n:“Jessore Board”,e:“📚”},{id:5,n:“Chittagong Board”,e:“🌊”},{id:6,n:“Barisal Board”,e:“⚓”},{id:7,n:“Sylhet Board”,e:“🍃”},{id:8,n:“Dinajpur Board”,e:“🌾”},{id:9,n:“Mymensingh Board”,e:“🏞️”},{id:10,n:“Madrasah Board”,e:“☪️”},{id:11,n:“Technical Board”,e:“⚙️”}];
const groups=[{id:1,n:“Science”,s:“Science Group”,e:“🔬”},{id:2,n:“Business”,s:“Business Group”,e:“💼”},{id:3,n:“Arts”,s:“Arts Group”,e:“🎨”}];
const subs={Science:{m:[{id:1,n:“Bangla”,e:“📖”},{id:2,n:“English”,e:“🔤”},{id:3,n:“ICT”,e:“💻”},{id:4,n:“Physics”,e:“⚛️”},{id:5,n:“Chemistry”,e:“🧪”},{id:6,n:“Higher Math”,e:“📐”},{id:7,n:“Biology”,e:“🧬”}],o:[{id:8,n:“Higher Math”,e:“📐”},{id:9,n:“Biology”,e:“🧬”}]},Business:{m:[{id:1,n:“Bangla”,e:“📖”},{id:2,n:“English”,e:“🔤”},{id:3,n:“ICT”,e:“💻”},{id:4,n:“Accounting”,e:“🧾”},{id:5,n:“Business Org.”,e:“🏢”},{id:6,n:“Finance”,e:“🏦”},{id:7,n:“Marketing”,e:“📦”}],o:[{id:8,n:“Economics”,e:“📊”},{id:9,n:“Statistics”,e:“📈”}]},Arts:{m:[{id:1,n:“Bangla”,e:“📖”},{id:2,n:“English”,e:“🔤”},{id:3,n:“ICT”,e:“💻”},{id:4,n:“Civics”,e:“⚖️”},{id:5,n:“Economics”,e:“📊”},{id:6,n:“Logic”,e:“🧠”},{id:7,n:“History”,e:“🏛️”}],o:[{id:8,n:“Islamic Studies”,e:“☪️”},{id:9,n:“Agriculture”,e:“🌾”}]}};
const years=[2025,2024,2023,2022,2021,2020,2019,2018,2017,2016,2015];
const exams=[{id:1,n:“MCQ”,s:“Multiple Choice”,e:“📝”},{id:2,n:“CQ”,s:“Creative Questions”,e:“✍️”},{id:3,n:“MCQ Answer”,s:“Correct answers”,e:“✅”},{id:4,n:“CQ Answer”,s:“Detailed answers”,e:“📋”}];
const stories=[{id:1,t:“The Fall of Rome”,s:“How an empire crumbled overnight”,e:“🏛️”,r:“8 min”},{id:2,t:“Tesla’s Last Dream”,s:“The invention that never was”,e:“⚡”,r:“5 min”},{id:3,t:“The Lost Library”,s:“Alexandria’s burning secret”,e:“📜”,r:“6 min”},{id:4,t:“Ocean of Stars”,s:“A fisherman & the cosmos”,e:“🌊”,r:“4 min”},{id:5,t:“The Silk Road”,s:“Where worlds collided”,e:“🐫”,r:“7 min”}];
const notifs=[{id:1,t:“New board questions added!”,time:“2m ago”,u:true},{id:2,t:“Gaming file updated”,time:“1h ago”,u:true},{id:3,t:“Welcome to TurnFun!”,time:“1d ago”,u:false}];
const homeCards=[{id:1,l:“All Boards (HSC)”,s:“Higher Secondary”,e:“📚”,v:“hsc”},{id:2,l:“All Boards (SSC)”,s:“Secondary Certificate”,e:“📖”,v:“ssc”},{id:3,l:“Gaming File”,s:“Your saves”,e:“🎮”,v:“gaming”},{id:4,l:“Movie / Series”,s:“Watch list”,e:“🎬”,v:“movie”},{id:5,l:“Stories”,s:“Read Now”,e:“📰”,v:“stories”},{id:6,l:“Free Card”,s:“Explore freely”,e:“⚡”,v:“free”,free:true}];

function useList(n,k){
const[v,sv]=useState([]);
useEffect(()=>{
sv([]);
if(!n)return;
const ts=Array.from({length:n},(_,i)=>setTimeout(()=>sv(p=>[…p,i]),i*60+180));
return()=>ts.forEach(clearTimeout);
},[k]);
return v;
}

function Snow({th}){
const ref=useRef(null);const anim=useRef(null);const ps=useRef([]);const shk=useRef({x:0,y:0});
useEffect(()=>{
const c=ref.current;if(!c)return;
const ctx=c.getContext(“2d”);
let W=c.width=window.innerWidth,H=c.height=window.innerHeight;
const onR=()=>{W=c.width=window.innerWidth;H=c.height=window.innerHeight;};
window.addEventListener(“resize”,onR);
const cols=th.par;
ps.current=Array.from({length:130},(_,i)=>({x:Math.random()*W,y:Math.random()*H,r:.8+Math.random()*2.5,vx:(Math.random()-.5)*.15,vy:.1+Math.random()*.28,op:.25+Math.random()*.55,col:cols[i%cols.length],wb:Math.random()*Math.PI*2,ws:.006+Math.random()*.012,type:i<40?“g”:“s”,ga:Math.random()*Math.PI*2,gs:.02+Math.random()*.04,d:.3+Math.random()*.7}));
const onM=e=>{shk.current.x+=(e.movementX||0)*.003;shk.current.y+=(e.movementY||0)*.003;};
window.addEventListener(“mousemove”,onM);
let t=0;
const draw=()=>{
ctx.clearRect(0,0,W,H);
shk.current.x*=.92;shk.current.y*=.92;
for(let i=0;i<3;i++){const y=H*(.2+i*.28+.04*Math.sin(t*.0001+i));const g=ctx.createLinearGradient(0,y,W,y+2);g.addColorStop(0,“transparent”);g.addColorStop(.5,th.dm?“rgba(255,255,255,.05)”:“rgba(255,255,255,.2)”);g.addColorStop(1,“transparent”);ctx.fillStyle=g;ctx.fillRect(0,y,W,3);}
[{x:W*(.2+.15*Math.sin(t*.00018)),y:H*(.15+.1*Math.cos(t*.00022)),r:W*.28},{x:W*(.75+.12*Math.cos(t*.00014)),y:H*(.45+.18*Math.sin(t*.00016)),r:W*.22}].forEach(ci=>{const g=ctx.createRadialGradient(ci.x,ci.y,0,ci.x,ci.y,ci.r);g.addColorStop(0,th.ca);g.addColorStop(1,“transparent”);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);});
ps.current.forEach(p=>{
p.wb+=p.ws;p.x+=p.vx+Math.sin(p.wb)*.2+shk.current.x*p.d;p.y+=p.vy+shk.current.y*p.d*.5;p.ga+=p.gs;
if(p.y>H+10){p.y=-10;p.x=Math.random()*W;}if(p.x<-10)p.x=W+10;if(p.x>W+10)p.x=-10;
const op=p.op*p.d,r=p.r*(.5+p.d*.5);
if(p.type===“g”){
ctx.save();ctx.globalAlpha=op*(.6+.4*Math.sin(p.ga));ctx.translate(p.x,p.y);ctx.rotate(p.ga);
const gr=r*1.8;ctx.beginPath();
for(let j=0;j<4;j++){const a=(j/4)*Math.PI*2,l=j%2===0?gr:gr*.25;j===0?ctx.moveTo(Math.cos(a)*l,Math.sin(a)*l):ctx.lineTo(Math.cos(a)*l,Math.sin(a)*l);}
ctx.closePath();const gg=ctx.createRadialGradient(0,0,0,0,0,gr);gg.addColorStop(0,th.dm?“rgba(255,255,255,.95)”:“rgba(255,255,255,1)”);gg.addColorStop(1,“transparent”);ctx.fillStyle=gg;ctx.fill();
ctx.strokeStyle=th.dm?“rgba(255,255,255,.4)”:“rgba(255,255,255,.7)”;ctx.lineWidth=.4;ctx.beginPath();ctx.moveTo(-gr*1.2,0);ctx.lineTo(gr*1.2,0);ctx.moveTo(0,-gr*1.2);ctx.lineTo(0,gr*1.2);ctx.stroke();ctx.restore();
}else{
ctx.save();ctx.globalAlpha=op;const gs=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,r*2.5);gs.addColorStop(0,p.col);gs.addColorStop(1,“transparent”);ctx.beginPath();ctx.arc(p.x,p.y,r*2.5,0,Math.PI*2);ctx.fillStyle=gs;ctx.fill();ctx.globalAlpha=op*.8;ctx.beginPath();ctx.arc(p.x,p.y,r*.7,0,Math.PI*2);ctx.fillStyle=th.dm?“rgba(255,255,255,.7)”:“rgba(255,255,255,.9)”;ctx.fill();ctx.restore();
}
});
const ts2=ctx.createLinearGradient(0,0,0,H*.15);ts2.addColorStop(0,th.dm?“rgba(255,255,255,.05)”:“rgba(255,255,255,.3)”);ts2.addColorStop(1,“transparent”);ctx.fillStyle=ts2;ctx.fillRect(0,0,W,H*.15);
t++;anim.current=requestAnimationFrame(draw);
};
draw();
return()=>{cancelAnimationFrame(anim.current);window.removeEventListener(“resize”,onR);window.removeEventListener(“mousemove”,onM);};
},[th]);
return <canvas ref={ref} style={{position:“fixed”,inset:0,zIndex:0,pointerEvents:“none”}}/>;
}

function Ripple({x,y,id,onDone,th}){
useEffect(()=>{const t=setTimeout(()=>onDone(id),900);return()=>clearTimeout(t);},[id,onDone]);
const c=th.dm?“rgba(255,255,255,”:“rgba(80,60,160,”;
return <div style={{position:“fixed”,left:x,top:y,transform:“translate(-50%,-50%)”,pointerEvents:“none”,zIndex:9999}}>
<span style={{position:“absolute”,left:“50%”,top:“50%”,transform:“translate(-50%,-50%)”,width:5,height:5,borderRadius:“50%”,background:th.dm?“rgba(255,255,255,.9)”:“rgba(0,0,0,.5)”,animation:“rDot .3s ease-out forwards”}}/>
<span style={{position:“absolute”,left:“50%”,top:“50%”,transform:“translate(-50%,-50%)”,width:0,height:0,borderRadius:“50%”,border:`1px solid ${c}0.6)`,animation:“rR1 .55s cubic-bezier(.15,.9,.3,1) forwards”}}/>
<span style={{position:“absolute”,left:“50%”,top:“50%”,transform:“translate(-50%,-50%)”,width:0,height:0,borderRadius:“50%”,border:`0.7px solid ${c}0.3)`,animation:“rR2 .7s cubic-bezier(.15,.9,.3,1) 45ms forwards”}}/>
<span style={{position:“absolute”,left:“50%”,top:“50%”,transform:“translate(-50%,-50%)”,width:0,height:0,borderRadius:“50%”,border:`0.5px solid ${c}0.12)`,animation:“rR3 .88s cubic-bezier(.1,.8,.25,1) 100ms forwards”}}/>

</div>;
}

function Card({label,sub,emoji,idx,vis,th,onClick,badge}){
const[h,sh]=useState(false);
return <div onClick={onClick} onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}
style={{position:“relative”,padding:“17px 18px”,minHeight:74,display:“flex”,alignItems:“center”,gap:15,borderRadius:20,cursor:“pointer”,overflow:“hidden”,
opacity:vis?1:0,transform:vis?“translateY(0)”:“translateY(22px)”,
transition:`opacity .48s cubic-bezier(.22,1,.36,1) ${idx*.056}s,transform .48s cubic-bezier(.22,1,.36,1) ${idx*.056}s,box-shadow .3s,border-color .25s`,
background:th.cbg,border:`1px solid ${h?th.cbh:th.cb}`,backdropFilter:“blur(44px) saturate(2.6)”,WebkitBackdropFilter:“blur(44px) saturate(2.6)”,boxShadow:h?th.csh:th.cs}}>

<div style={{position:"absolute",top:0,left:"6%",right:"6%",height:"1px",background:`linear-gradient(90deg,transparent,${th.hl}88,${th.hl},${th.hl}88,transparent)`,pointerEvents:"none"}}/>
<div style={{position:"absolute",top:0,left:h?"115%":"-65%",width:"40%",height:"100%",background:`linear-gradient(90deg,transparent,${th.sh},transparent)`,transform:"skewX(-16deg)",transition:"left .6s",pointerEvents:"none"}}/>
<div style={{position:"absolute",bottom:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${th.r1},transparent)`,pointerEvents:"none"}}/>
<div style={{width:44,height:44,borderRadius:13,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,background:th.ibg,border:`1px solid ${th.ib}`,boxShadow:th.is,transform:h?"scale(1.07)":"scale(1)",transition:"transform .3s cubic-bezier(.34,1.4,.64,1)"}}>{emoji}</div>
<div style={{flex:1,minWidth:0}}>
<div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:500,fontSize:14.5,color:th.txt,marginBottom:3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{label}</div>
<div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontSize:11.5,color:th.sub}}>{sub}</div>
</div>
{badge&&<span style={{fontSize:8.5,fontWeight:700,letterSpacing:".12em",color:th.mid,border:`1px solid ${th.div}`,borderRadius:20,padding:"2px 8px",flexShrink:0,textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>{badge}</span>}
<div style={{color:th.sub,opacity:.5,flexShrink:0}}>
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
</div>
</div>;
}

function BigCard({card,th,onClick,vis,idx}){
const[h,sh]=useState(false);
return <div onClick={onClick} onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}
style={{position:“relative”,padding:“20px”,minHeight:94,display:“flex”,alignItems:“center”,gap:18,borderRadius:22,cursor:“pointer”,overflow:“hidden”,
background:th.cbg,border:`1px solid ${h?th.cbh:th.cb}`,backdropFilter:“blur(52px) saturate(3)”,WebkitBackdropFilter:“blur(52px) saturate(3)”,
boxShadow:h?th.csh:th.cs,
transition:`opacity .52s cubic-bezier(.22,1,.36,1) ${idx*.076}s,transform .52s cubic-bezier(.22,1,.36,1) ${idx*.076}s,box-shadow .3s,border-color .25s`,
opacity:vis?1:0,transform:vis?(h?“scale(1.015) translateY(-5px)”:“scale(1)”):“translateY(26px)”}}>

<div style={{position:"absolute",top:0,left:"5%",right:"5%",height:"1.5px",background:`linear-gradient(90deg,transparent,${th.hl}cc,transparent)`,pointerEvents:"none"}}/>
<div style={{position:"absolute",top:0,left:h?"118%":"-68%",width:"42%",height:"100%",background:`linear-gradient(90deg,transparent,${th.sh},transparent)`,transform:"skewX(-16deg)",transition:"left .72s",pointerEvents:"none"}}/>
<div style={{position:"absolute",inset:0,borderRadius:22,background:`radial-gradient(ellipse at 92% 8%,${th.lf},transparent 50%)`,pointerEvents:"none",opacity:h?1:.55,transition:"opacity .35s"}}/>
{card.free&&<div style={{position:"absolute",top:12,right:14,padding:"2px 9px",borderRadius:20,border:`1px solid ${th.div}`,fontSize:8.5,fontWeight:700,letterSpacing:".14em",color:th.mid,textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>FREE</div>}
<div style={{width:52,height:52,borderRadius:16,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,background:th.ibg,border:`1px solid ${th.ib}`,boxShadow:th.is,transform:h?"scale(1.08)":"scale(1)",transition:"transform .38s cubic-bezier(.34,1.4,.64,1)"}}>{card.e}</div>
<div style={{flex:1}}>
<div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,color:th.txt,marginBottom:4,lineHeight:1.2}}>{card.l}</div>
<div style={{fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontSize:12,color:th.sub}}>{card.s}</div>
</div>
<div style={{color:th.sub,opacity:.45,flexShrink:0}}>
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
</div>
</div>;
}

function StoryCard({st,th}){
const[h,sh]=useState(false);
return <div onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}
style={{position:“relative”,borderRadius:20,overflow:“hidden”,background:th.cbg,border:`1px solid ${h?th.cbh:th.cb}`,
backdropFilter:“blur(44px) saturate(2.6)”,WebkitBackdropFilter:“blur(44px) saturate(2.6)”,
boxShadow:h?th.csh:th.cs,transition:“box-shadow .3s,border-color .25s,transform .3s cubic-bezier(.34,1.4,.64,1)”,
transform:h?“translateY(-4px) scale(1.01)”:“translateY(0)”,padding:“18px 20px”}}>

<div style={{position:"absolute",top:0,left:"6%",right:"6%",height:"1px",background:`linear-gradient(90deg,transparent,${th.hl}88,${th.hl},${th.hl}88,transparent)`,pointerEvents:"none"}}/>
<div style={{position:"absolute",top:0,left:h?"115%":"-65%",width:"40%",height:"100%",background:`linear-gradient(90deg,transparent,${th.sh},transparent)`,transform:"skewX(-16deg)",transition:"left .65s",pointerEvents:"none"}}/>
<div style={{display:"flex",alignItems:"flex-start",gap:14}}>
<div style={{width:44,height:44,borderRadius:13,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,background:th.ibg,border:`1px solid ${th.ib}`,boxShadow:th.is}}>{st.e}</div>
<div style={{flex:1,minWidth:0}}>
<div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,color:th.txt,marginBottom:4}}>{st.t}</div>
<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:300,color:th.sub,marginBottom:12}}>{st.s}</div>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:10.5,color:th.sub}}>⏰ {st.r} read</span>
<div style={{padding:"6px 16px",borderRadius:20,background:th.bbg,border:`1px solid ${th.bbd}`,fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:500,color:th.txt,cursor:"pointer"}}>Read Now</div>
</div>
</div>
</div>
</div>;
}

function CCard({th,color,glow,border,icon,title,sub,badge,bColor,bText}){
const[h,sh]=useState(false);
return <div onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}
style={{position:“relative”,borderRadius:22,overflow:“hidden”,cursor:“pointer”,background:th.cbg,
border:`1px solid ${h?border:th.cb}`,backdropFilter:“blur(44px) saturate(2.6)”,WebkitBackdropFilter:“blur(44px) saturate(2.6)”,
boxShadow:h?`${th.csh},0 0 30px ${glow}`:th.cs,
transition:“box-shadow .3s,border-color .25s,transform .3s cubic-bezier(.34,1.4,.64,1)”,
transform:h?“scale(1.018) translateY(-3px)”:“scale(1)”,padding:“22px 20px”}}>

<div style={{position:"absolute",top:0,left:"5%",right:"5%",height:"1.5px",background:`linear-gradient(90deg,transparent,${th.hl}cc,transparent)`,pointerEvents:"none"}}/>
<div style={{position:"absolute",top:0,left:h?"115%":"-65%",width:"40%",height:"100%",background:`linear-gradient(90deg,transparent,${th.sh},transparent)`,transform:"skewX(-16deg)",transition:"left .65s",pointerEvents:"none"}}/>
<div style={{position:"absolute",bottom:0,left:0,right:0,height:3,background:`linear-gradient(90deg,transparent,${color},transparent)`,opacity:h?.8:.3,transition:"opacity .3s",pointerEvents:"none"}}/>
<div style={{display:"flex",alignItems:"center",gap:16}}>
<div style={{width:58,height:58,borderRadius:17,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",background:h?glow:th.ibg,border:`1px solid ${h?border:th.ib}`,color:h?color:th.ic,transition:"all .3s cubic-bezier(.34,1.4,.64,1)",transform:h?"scale(1.08)":"scale(1)"}}>{icon}</div>
<div style={{flex:1,minWidth:0}}>
<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5,flexWrap:"wrap"}}>
<div style={{fontFamily:"'DM Serif Display',serif",fontSize:16,color:th.txt}}>{title}</div>
<div style={{padding:"2px 9px",borderRadius:20,background:bColor,fontSize:9.5,fontWeight:600,color:bText,letterSpacing:".04em",fontFamily:"'DM Sans',sans-serif"}}>{badge}</div>
</div>
<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:300,color:h?color:th.sub,transition:"color .25s"}}>{sub}</div>
</div>
<div style={{color:h?color:th.sub,opacity:h?1:.45,transition:"all .25s",transform:h?"translateX(2px)":"none",flexShrink:0}}>
<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
</div>
</div>
</div>;
}

function ProfileForm({th,onSave,onGuest}){
const[f,sf]=useState({n:””,p:””,gm:””});
const[savedUser,setSavedUser]=useState(null);

const handleSave=()=>{
if(!f.n||!f.p)return;
const mid=“TF-”+String(Math.floor(Math.random()*10000)).padStart(4,“0”);
const userData={…f,mid};
setSavedUser(userData);
onSave(userData);
};

const sendToGmail=(userData)=>{
const subject=encodeURIComponent(`TurnFun New Member: ${userData.mid}`);
const body=encodeURIComponent(
`New Member Registration!\n\n`+
`Member ID : ${userData.mid}\n`+
`Name      : ${userData.n}\n`+
`Phone     : ${userData.p}\n`+
`Gmail     : ${userData.gm||"Not provided"}\n\n`+
`Joined via TurnFun App`
);
window.open(`mailto:rahmanraaakib@gmail.com?subject=${subject}&body=${body}`,”_blank”);
};

if(savedUser) return (

<div style={{display:"flex",flexDirection:"column",gap:14}}>
<div style={{borderRadius:20,border:`1px solid ${th.pb}`,background:th.pbg,backdropFilter:"blur(36px)",padding:"20px 18px",position:"relative",overflow:"hidden"}}>
<div style={{position:"absolute",top:0,left:"8%",right:"8%",height:"1px",background:`linear-gradient(90deg,transparent,${th.hl}80,transparent)`}}/>
<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9.5,color:th.sub,letterSpacing:".1em",fontWeight:600,textTransform:"uppercase",marginBottom:14}}>Your Member Info</div>
{[["🪪","Member ID",savedUser.mid],["👤","Name",savedUser.n],["📱","Phone",savedUser.p],["✉️","Gmail",savedUser.gm||"—"]].map(([e,l,v],i,a)=>(
<div key={i}>
<div style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0"}}>
<span style={{fontSize:15,width:22,textAlign:"center"}}>{e}</span>
<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:300,color:th.sub,flex:1}}>{l}</span>
<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:500,color:l==="Member ID"?"rgba(130,232,192,.9)":th.txt}}>{v}</span>
</div>
{i<a.length-1&&<div style={{height:"1px",background:th.div}}/>}
</div>
))}
</div>
<div onClick={()=>sendToGmail(savedUser)} style={{width:"100%",background:"linear-gradient(135deg,rgba(37,211,102,.15),rgba(37,211,102,.08))",border:"1px solid rgba(37,211,102,.3)",borderRadius:16,padding:"15px",color:"rgba(37,211,102,.9)",fontFamily:"'DM Sans',sans-serif",fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:9,boxShadow:"0 0 20px rgba(37,211,102,.1)"}}>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
Send Info to TurnFun
</div>
</div>
);

return <>

<div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>
{[["Name *","n","Your name","text"],["Phone *","p","+880 XXXX XXXXXX","tel"],["Gmail","gm","example@gmail.com","email"]].map(([l,k,ph,tp])=>(
<div key={k} style={{borderRadius:16,border:`1px solid ${th.pb}`,background:th.pbg,backdropFilter:"blur(36px)",padding:"13px 16px"}}>
<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9.5,color:th.sub,letterSpacing:".1em",fontWeight:600,textTransform:"uppercase",marginBottom:8}}>{l}</div>
<input style={{background:"transparent",border:"none",borderBottom:`1px solid ${th.div}`,outline:"none",color:th.inp,fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:300,width:"100%",padding:"8px 0"}} placeholder={ph} type={tp} value={f[k]} onChange={e=>sf(p=>({...p,[k]:e.target.value}))}/>
</div>
))}
</div>
<button style={{width:"100%",background:th.bbg,border:`1px solid ${th.bbd}`,borderRadius:16,padding:15,color:th.inp,fontFamily:"'DM Sans',sans-serif",fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:9,marginBottom:12}} onClick={handleSave}>
✅ Create Account
</button>
<div onClick={onGuest} style={{textAlign:"center",padding:"14px 20px",borderRadius:16,cursor:"pointer",border:`1px dashed ${th.div}`,fontFamily:"'DM Sans',sans-serif",fontSize:13.5,color:th.mid}}>
👤 Continue as Guest
</div>
</>;
}

function PH({th}){return <div style={{position:“absolute”,top:0,left:“8%”,right:“8%”,height:“1px”,background:`linear-gradient(90deg,transparent,${th.hl}80,transparent)`,pointerEvents:“none”}}/>;}
function Hdr({title,back,th}){
return <div style={{display:“flex”,alignItems:“center”,gap:14,marginBottom:6}}>

<div onClick={back} style={{width:38,height:38,borderRadius:12,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",background:th.pbg,border:`1px solid ${th.cb}`,backdropFilter:"blur(28px)",boxShadow:th.ps,color:th.mid}}>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m19 12-14 0M5 12l7-7M5 12l7 7"/></svg>
</div>
<h2 style={{fontFamily:"'DM Serif Display',serif",fontWeight:400,fontSize:22,color:th.txt,lineHeight:1.25,margin:0}}>{title}</h2>
</div>;
}
function Crumbs({items,th}){
return <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:16,flexWrap:"wrap"}}>
{items.map((c,i)=><span key={i} style={{display:"flex",alignItems:"center",gap:5}}>
<span onClick={c.go} style={{fontFamily:"'DM Sans',sans-serif",fontSize:10.5,fontWeight:i===items.length-1?500:400,color:i===items.length-1?th.mid:th.sub,cursor:c.go?"pointer":"default"}}>{c.l}</span>
{i<items.length-1&&<span style={{fontSize:9,color:th.sub,opacity:.5}}>›</span>}
</span>)}
</div>;
}

export default function TurnFun(){
const[splash,setSplash]=useState(true);
const[view,sv]=useState(“home”);
const[yr,syr]=useState(null);
const[bd,sbd]=useState(null);
const[gr,sgr]=useState(null);
const[sbj,ssbj]=useState(null);
const[q,sq]=useState(””);
const[snap,ssnap]=useState(null);
const[ripples,srip]=useState([]);
const[nread,snread]=useState([]);
const[snd,ssnd]=useState(“water”);
const[tid,stid]=useState(“dark”);
const[sugg,ssugg]=useState(false);
const[sugT,ssugT]=useState(180);
const[user,suser]=useState(null);
const rc=useRef(0);const ac=useRef(null);const sw=useRef(null);
const th=T[tid];
const go=useCallback(v=>sv(v),[]);

const homeV=useList(view===“home”?homeCards.length:0,view);
const hscV=useList(view===“hsc”?years.length:0,view);
const sscV=useList(view===“ssc”?years.length:0,view);
const bdV=useList(view===“boards”?boards.length:0,view+yr);
const grV=useList(view===“groups”?groups.length:0,view+yr+(bd?.id||””));
const sbV=useList(view===“subs”?((subs[gr?.n]?.m||[]).length+(subs[gr?.n]?.o||[]).length):0,view+(gr?.id||””));
const exV=useList(view===“exams”?exams.length:0,view+(sbj?.id||””));
const sscBV=useList(view===“sscB”?boards.length:0,view+yr);
const sscGV=useList(view===“sscG”?groups.length:0,view+yr+(bd?.id||””));
const stV=useList(view===“stories”?stories.length:0,view);

const getAC=useCallback(()=>{if(!ac.current)ac.current=new(window.AudioContext||window.webkitAudioContext)();if(ac.current.state===“suspended”)ac.current.resume();return ac.current;},[]);
const playS=useCallback(()=>{
if(snd===“off”)return;
try{
const c=getAC();const o=c.createOscillator(),g=c.createGain();
if(snd===“water”){o.connect(g);g.connect(c.destination);o.type=“sine”;o.frequency.setValueAtTime(900,c.currentTime);o.frequency.exponentialRampToValueAtTime(200,c.currentTime+.2);g.gain.setValueAtTime(.0001,c.currentTime);g.gain.exponentialRampToValueAtTime(.28,c.currentTime+.008);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+.25);o.start(c.currentTime);o.stop(c.currentTime+.25);}
else if(snd===“rain”){o.connect(g);g.connect(c.destination);o.type=“sine”;o.frequency.setValueAtTime(1400,c.currentTime);o.frequency.exponentialRampToValueAtTime(380,c.currentTime+.12);g.gain.setValueAtTime(.0001,c.currentTime);g.gain.exponentialRampToValueAtTime(.2,c.currentTime+.005);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+.15);o.start(c.currentTime);o.stop(c.currentTime+.15);}
else{const f2=c.createBiquadFilter();o.connect(f2);f2.connect(g);g.connect(c.destination);f2.type=“lowpass”;f2.frequency.value=400;o.type=“sine”;o.frequency.setValueAtTime(220,c.currentTime);o.frequency.exponentialRampToValueAtTime(55,c.currentTime+.35);g.gain.setValueAtTime(.0001,c.currentTime);g.gain.exponentialRampToValueAtTime(.42,c.currentTime+.012);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+.4);o.start(c.currentTime);o.stop(c.currentTime+.4);}
}catch(e){}
},[snd,getAC]);

const idx=useMemo(()=>{
const r=[];
homeCards.forEach(c=>{if(c.v)r.push({l:c.l,s:c.s,e:c.e,kw:[c.l.toLowerCase()],nav:{t:“v”,v:c.v}});});
years.forEach(y=>r.push({l:`HSC ${y}`,s:“HSC Year”,e:“📅”,kw:[`${y}`,`hsc${y}`],nav:{t:“y”,y,ex:“hsc”}}));
boards.forEach(b=>r.push({l:b.n,s:“Education Board”,e:b.e,kw:[b.n.toLowerCase()],nav:{t:“b”,b}}));
groups.forEach(g=>r.push({l:g.n,s:g.s,e:g.e,kw:[g.n.toLowerCase()],nav:{t:“g”,g}}));
return r;
},[]);
const suggs=useMemo(()=>{if(!q.trim())return[];const ql=q.toLowerCase();return idx.filter(it=>it.kw.some(k=>k.includes(ql))).slice(0,7);},[q,idx]);
const execN=useCallback(nav=>{
if(nav.t===“v”)go(nav.v);
else if(nav.t===“y”){syr(nav.y);go(nav.ex===“ssc”?“sscB”:“boards”);}
else if(nav.t===“b”){sbd(nav.b);go(“groups”);}
else if(nav.t===“g”){sgr(nav.g);go(“subs”);}
},[go]);

const onClick=useCallback(e=>{playS();const id=++rc.current;srip(p=>[…p,{id,x:e.clientX,y:e.clientY}]);},[playS]);
const rmRip=useCallback(id=>srip(p=>p.filter(r=>r.id!==id)),[]);
useEffect(()=>{window.addEventListener(“click”,onClick);return()=>window.removeEventListener(“click”,onClick);},[onClick]);
useEffect(()=>{const h=e=>{if(sw.current&&!sw.current.contains(e.target))ssugg(false);};document.addEventListener(“mousedown”,h);return()=>document.removeEventListener(“mousedown”,h);},[]);

const unread=notifs.filter(n=>n.u&&!nread.includes(n.id)).length;
const pS={borderRadius:20,overflow:“hidden”,border:`1px solid ${th.pb}`,background:th.pbg,backdropFilter:“blur(36px) saturate(2)”,WebkitBackdropFilter:“blur(36px) saturate(2)”,position:“relative”,boxShadow:th.ps};

const css=`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Serif+Display:ital@0;1&family=Syne:wght@700;800&display=swap'); *{box-sizing:border-box;margin:0;padding:0;} @keyframes rDot{0%{transform:translate(-50%,-50%) scale(1);opacity:1}100%{transform:translate(-50%,-50%) scale(8);opacity:0}} @keyframes rR1{0%{width:0;height:0;opacity:1}100%{width:88px;height:88px;opacity:0}} @keyframes rR2{0%{width:0;height:0;opacity:.8}100%{width:120px;height:120px;opacity:0}} @keyframes rR3{0%{width:0;height:0;opacity:.5}100%{width:160px;height:160px;opacity:0}} @keyframes fUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}} @keyframes fIn{from{opacity:0}to{opacity:1}} @keyframes b1{0%,100%{transform:translate(0,0) scale(1)}30%{transform:translate(55px,-38px) scale(1.07)}65%{transform:translate(-32px,48px) scale(.94)}} @keyframes b2{0%,100%{transform:translate(0,0) scale(1)}35%{transform:translate(-56px,32px) scale(1.06)}70%{transform:translate(40px,-50px) scale(.92)}} @keyframes b3{0%,100%{transform:translate(0,0) scale(1)}42%{transform:translate(34px,56px) scale(1.08)}76%{transform:translate(-42px,-22px) scale(.95)}} @keyframes sD{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}} @keyframes logoShine{0%,100%{background-position:200% center}50%{background-position:-200% center}} @keyframes waveFloat1{0%,100%{transform:translateY(0) scaleX(1)}33%{transform:translateY(-1.5px) scaleX(1.03)}66%{transform:translateY(1px) scaleX(.97)}} @keyframes waveFloat2{0%,100%{transform:translateY(0) scaleX(1)}33%{transform:translateY(1.5px) scaleX(.97)}66%{transform:translateY(-1px) scaleX(1.03)}} .pg{animation:fIn .24s cubic-bezier(.22,1,.36,1) forwards} .ibtn{width:40px;height:40px;border-radius:13px;background:${th.pbg};border:1px solid ${th.cb};display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(28px);transition:transform .15s;position:relative;flex-shrink:0;box-shadow:${th.ps};color:${th.mid};} .ibtn:active{transform:scale(.88);} .nb{position:absolute;top:-4px;right:-4px;width:17px;height:17px;border-radius:50%;background:${th.nbg};color:${th.nc};font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;border:1.5px solid ${th.bg};font-family:'DM Sans',sans-serif;} .mr{display:flex;align-items:center;gap:14px;padding:13px 16px;cursor:pointer;transition:background .15s;color:${th.mid};font-family:'DM Sans',sans-serif;font-size:13.5px;font-weight:300;border-radius:12px;margin:2px 5px;} .mr:hover{background:${th.div};color:${th.txt};} .si{background:${th.sbg};border:1px solid ${th.sbd};border-radius:18px;backdrop-filter:blur(36px) saturate(2.4);transition:border-color .25s;} .si:focus-within{border-color:${th.sub};} .sinp{background:transparent;border:none;outline:none;color:${th.txt};font-family:'DM Sans',sans-serif;font-size:13.5px;font-weight:300;flex:1;} .sinp::placeholder{color:${th.sub};}`;

if(splash) return <SplashScreen onDone={()=>setSplash(false)}/>;
return <div style={{minHeight:“100vh”,background:th.bg,fontFamily:”‘DM Sans’,sans-serif”,color:th.txt,overflowX:“hidden”,transition:“background .45s,color .45s”}}>

<style>{css}</style>

{ripples.map(r=><Ripple key={r.id} x={r.x} y={r.y} id={r.id} onDone={rmRip} th={th}/>)}

<div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}>
<div style={{position:"absolute",inset:0,background:th.bg,transition:"background .5s"}}/>
<div style={{position:"absolute",inset:0,background:th.grad}}/>
{tid==="dark"?
[{w:700,h:550,top:"-160px",left:"-200px",a:"b1",d:"28s",bg:th.b1},{w:600,h:680,top:"22%",right:"-220px",a:"b2",d:"34s",bg:th.b2},{w:500,h:460,bottom:"-100px",left:"8%",a:"b3",d:"30s",bg:th.b3}].map((b,i)=>
<div key={i} style={{position:"absolute",borderRadius:"50%",filter:"blur(100px)",willChange:"transform",width:b.w,height:b.h,top:b.top,left:b.left,right:b.right,bottom:b.bottom,background:b.bg,animation:`${b.a} ${b.d} ease-in-out infinite`}}/>
)
:
<div style={{position:"absolute",inset:0,backgroundImage:`url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><defs><filter id="lq"><feTurbulence type="fractalNoise" baseFrequency="0.003" numOctaves="3" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="80" xChannelSelector="R" yChannelSelector="G"/></filter></defs><g filter="url(%23lq)" opacity="0.08"><path d="M0,200 Q300,150 600,200 T1200,200 L1200,0 L0,0 Z" fill="rgba(100,180,255,.3)"/><path d="M0,300 Q300,250 600,300 T1200,300 L1200,200 L0,200 Z" fill="rgba(80,160,255,.25)"/><path d="M0,400 Q300,350 600,400 T1200,400 L1200,300 L0,300 Z" fill="rgba(60,140,255,.2)"/></g></svg>')`,backgroundSize:"cover",backgroundPosition:"center",filter:"blur(40px)",opacity:.4}}/>
}
<div style={{position:"absolute",inset:0,background:th.vig}}/>
</div>
<Snow th={th}/>
<div style={{position:"relative",zIndex:1,maxWidth:440,margin:"0 auto",padding:"0 20px 100px"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"28px 0 22px"}}>
<div onClick={()=>go("home")} style={{cursor:"pointer",userSelect:"none",display:"flex",alignItems:"center",gap:10}}>
<div style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:0}}>
<svg width="52" height="14" viewBox="0 0 52 14" fill="none" style={{display:"block",filter:th.dm?"drop-shadow(0 0 6px rgba(180,160,255,.5)) drop-shadow(0 2px 8px rgba(120,100,220,.4))":"drop-shadow(0 0 4px rgba(100,80,200,.35)) drop-shadow(0 2px 6px rgba(80,60,180,.25))",animation:"waveFloat1 3.5s ease-in-out infinite",transformOrigin:"center"}}>
<path d="M2 10 C8 4, 16 2, 26 5 C36 8, 44 3, 50 6" stroke={th.dm?"url(#wg1d)":"url(#wg1l)"} strokeWidth="3.5" strokeLinecap="round" fill="none"/>
<defs>
<linearGradient id="wg1d" x1="0" y1="0" x2="52" y2="0" gradientUnits="userSpaceOnUse">
<stop offset="0%" stopColor="rgba(160,140,255,0.3)"/>
<stop offset="40%" stopColor="rgba(255,255,255,0.95)"/>
<stop offset="70%" stopColor="rgba(200,190,255,0.85)"/>
<stop offset="100%" stopColor="rgba(140,120,255,0.4)"/>
</linearGradient>
<linearGradient id="wg1l" x1="0" y1="0" x2="52" y2="0" gradientUnits="userSpaceOnUse">
<stop offset="0%" stopColor="rgba(80,60,180,0.25)"/>
<stop offset="40%" stopColor="rgba(60,40,160,0.9)"/>
<stop offset="70%" stopColor="rgba(100,80,200,0.8)"/>
<stop offset="100%" stopColor="rgba(60,40,160,0.3)"/>
</linearGradient>
</defs>
</svg>
<span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:19,letterSpacing:"-.02em",lineHeight:1,background:th.dm?"linear-gradient(135deg,rgba(220,210,255,.7) 0%,#fff 35%,rgba(200,190,255,.9) 65%,rgba(180,160,255,.6) 100%)":"linear-gradient(135deg,#120840 0%,#3a18a0 40%,#5a30d0 70%,#1a0a60 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>TURNFUN</span>
<svg width="52" height="12" viewBox="0 0 52 12" fill="none" style={{display:"block",filter:th.dm?"drop-shadow(0 0 5px rgba(180,160,255,.4)) drop-shadow(0 1px 6px rgba(120,100,220,.35))":"drop-shadow(0 0 4px rgba(100,80,200,.3)) drop-shadow(0 1px 5px rgba(80,60,180,.2))",animation:"waveFloat2 3.5s ease-in-out infinite",transformOrigin:"center"}}>
<path d="M2 4 C10 8, 18 10, 26 7 C34 4, 42 8, 50 5" stroke={th.dm?"url(#wg2d)":"url(#wg2l)"} strokeWidth="3" strokeLinecap="round" fill="none"/>
<defs>
<linearGradient id="wg2d" x1="0" y1="0" x2="52" y2="0" gradientUnits="userSpaceOnUse">
<stop offset="0%" stopColor="rgba(140,120,255,0.25)"/>
<stop offset="50%" stopColor="rgba(255,255,255,0.8)"/>
<stop offset="100%" stopColor="rgba(160,140,255,0.3)"/>
</linearGradient>
<linearGradient id="wg2l" x1="0" y1="0" x2="52" y2="0" gradientUnits="userSpaceOnUse">
<stop offset="0%" stopColor="rgba(60,40,160,0.2)"/>
<stop offset="50%" stopColor="rgba(80,60,180,0.75)"/>
<stop offset="100%" stopColor="rgba(60,40,160,0.25)"/>
</linearGradient>
</defs>
</svg>
</div>
</div>
<div style={{display:"flex",gap:9}}>
{user&&<div className="ibtn" onClick={()=>go("profile")}><span style={{fontSize:12,fontWeight:600,fontFamily:"'Syne',sans-serif"}}>{user.g?"G":user.n[0]?.toUpperCase()}</span></div>}
<div className="ibtn" onClick={()=>go("notifs")}>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
{unread>0&&<div className="nb">{unread}</div>}
</div>
<div className="ibtn" onClick={()=>go("settings")}>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
</div>
</div>
</div>

{view===“home”&&<div className="pg">

<div style={{marginBottom:28,opacity:0,animation:"fUp .65s cubic-bezier(.22,1,.36,1) .08s forwards"}}>
<div style={{fontFamily:"'DM Serif Display',serif",fontSize:46,letterSpacing:"-.03em",lineHeight:1.06,color:th.txt}}>Welcome<span style={{fontStyle:"italic"}}> back.</span></div>
</div>
<div style={{marginBottom:24,opacity:0,animation:"fUp .65s cubic-bezier(.22,1,.36,1) .16s forwards"}}>
<div className="si" ref={sw} style={{display:"flex",flexDirection:"column"}}>
<div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 16px 8px"}}>
<div style={{color:th.sub}}>
<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
</div>
<input className="sinp" value={q} onChange={e=>{sq(e.target.value);ssugg(true);if(sw.current){const r=sw.current.getBoundingClientRect();ssugT(r.bottom+8);}}} onFocus={()=>{if(q.trim())ssugg(true);}} placeholder="Search board, subject, year..." autoComplete="off"/>
{q&&<div onClick={()=>{sq("");ssugg(false);}} style={{cursor:"pointer",fontSize:12,color:th.sub,padding:"2px 4px"}}>✕</div>}
</div>
<div onClick={()=>snap&&(syr(snap.yr),sbd(snap.bd),sgr(snap.gr),ssbj(snap.sbj),go(snap.v))} style={{display:"flex",alignItems:"center",gap:7,padding:"0 16px 11px",cursor:snap?"pointer":"default"}}>
<div style={{width:4,height:4,borderRadius:"50%",flexShrink:0,background:snap?"rgba(130,232,192,.9)":th.sub,transition:"all .2s"}}/>
<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9.5,color:th.sub,letterSpacing:".1em",fontWeight:600,flexShrink:0}}>LAST VISITED</span>
{snap?<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:10.5,fontWeight:500,color:"rgba(130,232,192,.95)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{snap.l}</span>:<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:10.5,color:th.sub,fontWeight:300,fontStyle:"italic"}}>None yet</span>}
</div>
</div>
</div>
{sugg&&suggs.length>0&&<div style={{position:"fixed",top:sugT,left:20,right:20,zIndex:9000,background:th.dm?"rgba(10,9,16,.97)":"rgba(255,255,255,.97)",border:`1px solid ${th.cb}`,borderRadius:18,overflow:"hidden",backdropFilter:"blur(40px)",boxShadow:th.cs,animation:"sD .2s forwards",maxHeight:300,overflowY:"auto"}}>
{suggs.map((s,i)=><div key={i} onClick={()=>{execN(s.nav);sq("");ssugg(false);}} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 14px",borderBottom:i<suggs.length-1?`1px solid ${th.div}`:"none",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.background=th.div} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
<span style={{fontSize:16,width:24,textAlign:"center",flexShrink:0}}>{s.e}</span>
<div style={{flex:1,minWidth:0}}>
<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:500,color:th.txt}}>{s.l}</div>
<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10.5,color:th.sub,fontWeight:300}}>{s.s}</div>
</div>
</div>)}
</div>}
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14,opacity:0,animation:"fUp .65s cubic-bezier(.22,1,.36,1) .25s forwards"}}>
<div style={{width:16,height:"1px",background:th.div}}/>
<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9.5,fontWeight:600,letterSpacing:".14em",color:th.sub,textTransform:"uppercase",flexShrink:0}}>Quick Access</span>
<div style={{flex:1,height:"1px",background:th.div}}/>
</div>
<div style={{display:"flex",flexDirection:"column",gap:12}}>
{homeCards.map((c,i)=><BigCard key={c.id} card={c} th={th} vis={homeV.includes(i)} idx={i} onClick={()=>{if(c.v)go(c.v);}}/>)}
</div>
</div>}

{view===“hsc”&&<div className="pg">
<Hdr title=“All Boards (HSC)” back={()=>go(“home”)} th={th}/>
<Crumbs items={[{l:“Home”,go:()=>go(“home”)},{l:“HSC”}]} th={th}/>

<div style={{display:"flex",flexDirection:"column",gap:10}}>
{years.map((y,i)=><Card key={y} label={`HSC ${y}`} sub={i===0?"Latest batch":`${i+1} year${i>0?"s":""} ago`} emoji="📅" idx={i} vis={hscV.includes(i)} th={th} onClick={()=>{syr(y);ssnap({v:"boards",yr:y,bd:null,gr:null,sbj:null,l:`HSC ${y}`});go("boards");}}/>)}
</div>
</div>}
{view==="boards"&&<div className="pg">
<Hdr title={`HSC ${yr}`} back={()=>go("hsc")} th={th}/>
<Crumbs items={[{l:"Home",go:()=>go("home")},{l:"HSC",go:()=>go("hsc")},{l:`${yr}`}]} th={th}/>
<div style={{display:"flex",flexDirection:"column",gap:10}}>
{boards.map((b,i)=><Card key={b.id} label={b.n} sub={`HSC ${yr} questions`} emoji={b.e} idx={i} vis={bdV.includes(i)} th={th} onClick={()=>{sbd(b);ssnap({v:"groups",yr,bd:b,gr:null,sbj:null,l:`HSC ${yr} / ${b.n}`});go("groups");}}/>)}
</div>
</div>}
{view==="groups"&&<div className="pg">
<Hdr title={bd?.n||"Groups"} back={()=>go("boards")} th={th}/>
<Crumbs items={[{l:"Home",go:()=>go("home")},{l:`HSC ${yr}`,go:()=>go("boards")},{l:bd?.n||"Board"}]} th={th}/>
<div style={{display:"flex",flexDirection:"column",gap:10}}>
{groups.map((g,i)=><Card key={g.id} label={g.n} sub={g.s} emoji={g.e} idx={i} vis={grV.includes(i)} th={th} onClick={()=>{sgr(g);ssnap({v:"subs",yr,bd,gr:g,sbj:null,l:`${g.n} / ${bd?.n}`});go("subs");}}/>)}
</div>
</div>}
{view==="subs"&&<div className="pg">
<Hdr title={`${gr?.n||""} Subjects`} back={()=>go("groups")} th={th}/>
<Crumbs items={[{l:"Home",go:()=>go("home")},{l:bd?.n||"Board",go:()=>go("groups")},{l:gr?.n||"Group"}]} th={th}/>
<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:11}}><div style={{width:3,height:12,borderRadius:2,background:th.mid,opacity:.6}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9.5,fontWeight:600,letterSpacing:".12em",color:th.sub,textTransform:"uppercase"}}>Mandatory</span></div>
<div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
{(subs[gr?.n]?.m||[]).map((s,i)=><Card key={s.id} label={s.n} sub={gr?.n||""} emoji={s.e} idx={i} vis={sbV.includes(i)} th={th} onClick={()=>{ssbj(s);ssnap({v:"exams",yr,bd,gr,sbj:s,l:`${s.n}`});go("exams");}}/>)}
</div>
<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:11}}><div style={{width:3,height:12,borderRadius:2,background:"rgba(245,208,128,.7)"}}/><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:9.5,fontWeight:600,letterSpacing:".12em",color:"rgba(200,160,60,.8)",textTransform:"uppercase"}}>Optional</span><div style={{flex:1,height:"1px",background:th.div}}/></div>
<div style={{display:"flex",flexDirection:"column",gap:10}}>
{(subs[gr?.n]?.o||[]).map((s,i)=>{const off=(subs[gr?.n]?.m||[]).length;return <Card key={s.id} label={s.n} sub="Optional" emoji={s.e} idx={off+i} vis={sbV.includes(off+i)} th={th} onClick={()=>{ssbj(s);go("exams");}}/>;})}</div>
</div>}
{view==="exams"&&<div className="pg">
<Hdr title={sbj?.n||"Exam Type"} back={()=>go("subs")} th={th}/>
<div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:18}}>
{exams.map((e,i)=><Card key={e.id} label={e.n} sub={e.s} emoji={e.e} idx={i} vis={exV.includes(i)} th={th} onClick={()=>{}}/>)}
</div>
<div style={{...pS,padding:"16px 18px"}}><PH th={th}/>
<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9.5,color:th.sub,letterSpacing:".1em",fontWeight:600,textTransform:"uppercase",marginBottom:11}}>Currently Viewing</div>
{[["Year",`HSC ${yr}`],["Board",bd?.n||"-"],["Group",gr?.n||"-"],["Subject",sbj?.n||"-"]].map(([l,v],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",gap:8,marginBottom:i<3?7:0}}><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:300,color:th.sub}}>{l}</span><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12.5,fontWeight:500,color:th.txt}}>{v}</span></div>)}
</div>
</div>}

{view===“ssc”&&<div className="pg"><Hdr title=“All Boards (SSC)” back={()=>go(“home”)} th={th}/><div style={{display:“flex”,flexDirection:“column”,gap:10}}>{years.map((y,i)=><Card key={y} label={`SSC ${y}`} sub={i===0?“Latest batch”:`${i+1} years ago`} emoji=“📅” idx={i} vis={sscV.includes(i)} th={th} onClick={()=>{syr(y);go(“sscB”);}}/>)}</div></div>}
{view===“sscB”&&<div className="pg"><Hdr title={`SSC ${yr}`} back={()=>go(“ssc”)} th={th}/><div style={{display:“flex”,flexDirection:“column”,gap:10}}>{boards.map((b,i)=><Card key={b.id} label={b.n} sub={`SSC ${yr}`} emoji={b.e} idx={i} vis={sscBV.includes(i)} th={th} onClick={()=>{sbd(b);go(“sscG”);}}/>)}</div></div>}
{view===“sscG”&&<div className="pg"><Hdr title={bd?.n||“Group”} back={()=>go(“sscB”)} th={th}/><div style={{display:“flex”,flexDirection:“column”,gap:10}}>{groups.map((g,i)=><Card key={g.id} label={g.n} sub={g.s} emoji={g.e} idx={i} vis={sscGV.includes(i)} th={th} onClick={()=>{}}/>)}</div><div style={{…pS,padding:“20px 22px”,marginTop:20,textAlign:“center”}}><PH th={th}/><div style={{fontSize:26,marginBottom:10}}>🚧</div><div style={{fontFamily:”‘DM Serif Display’,serif”,fontSize:16,color:th.txt}}>SSC subjects coming soon!</div></div></div>}

{view===“gaming”&&<div className="pg"><Hdr title=“Gaming File” back={()=>go(“home”)} th={th}/><div style={{display:“flex”,flexDirection:“column”,gap:10}}>{[{id:1,n:“Roms File”,s:“Game ROM collection”,e:“🎮”},{id:2,n:“Emulator”,s:“Play ROMs easily”,e:“📱”}].map((c,i)=><Card key={c.id} label={c.n} sub={c.s} emoji={c.e} idx={i} vis={true} th={th} onClick={()=>{}}/>)}</div></div>}
{view===“movie”&&<div className="pg"><Hdr title=“Movie / Series” back={()=>go(“home”)} th={th}/><div style={{display:“flex”,flexDirection:“column”,gap:10}}>{[{id:1,n:“Movies”,s:“Full collection”,e:“🎬”},{id:2,n:“Series”,s:“TV & web series”,e:“📺”}].map((c,i)=><Card key={c.id} label={c.n} sub={c.s} emoji={c.e} idx={i} vis={true} th={th} onClick={()=>{}}/>)}</div></div>}
{view===“free”&&<div className="pg"><Hdr title=“Free Card” back={()=>go(“home”)} th={th}/><div style={{…pS,padding:“32px 26px”,textAlign:“center”}}><PH th={th}/><div style={{fontSize:38,marginBottom:16}}>⚡</div><div style={{fontFamily:”‘DM Serif Display’,serif”,fontSize:20,color:th.txt}}>Explore Freely</div></div></div>}

{view===“stories”&&<div className="pg">
<Hdr title=“Stories” back={()=>go(“home”)} th={th}/>
<Crumbs items={[{l:“Home”,go:()=>go(“home”)},{l:“Stories”}]} th={th}/>

<div style={{display:"flex",flexDirection:"column",gap:12}}>
{stories.map((st,i)=><div key={st.id} style={{opacity:stV.includes(i)?1:0,transform:stV.includes(i)?"translateY(0)":"translateY(20px)",transition:`opacity .46s cubic-bezier(.22,1,.36,1) ${i*.06}s,transform .46s cubic-bezier(.22,1,.36,1) ${i*.06}s`}}>
<StoryCard st={st} th={th}/>
</div>)}
</div>
</div>}

{view===“notifs”&&<div className="pg"><Hdr title=“Notifications” back={()=>go(“home”)} th={th}/>

<div style={{...pS,padding:"5px"}}><PH th={th}/>
{notifs.map(n=>{const rd=nread.includes(n.id);return <div key={n.id} onClick={()=>snread(p=>[...p,n.id])} style={{padding:"13px 16px",borderBottom:`1px solid ${th.div}`,cursor:"pointer",borderRadius:12}}>
<div style={{display:"flex",alignItems:"flex-start",gap:12}}><div style={{width:6,height:6,borderRadius:"50%",marginTop:6,flexShrink:0,background:(!rd&&n.u)?th.txt:th.sub}}/><div style={{flex:1}}><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:13.5,fontWeight:300,marginBottom:4,color:(!rd&&n.u)?th.txt:th.sub}}>{n.t}</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10.5,color:th.sub}}>{n.time}</div></div></div>
</div>;})}
</div>
</div>}

{view===“contact”&&<div className="pg">
<Hdr title=“Contact Us” back={()=>go(“settings”)} th={th}/>

<div style={{marginBottom:22}}><div style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:th.txt,marginBottom:6}}>Talk to us directly</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:300,color:th.sub,lineHeight:1.7}}>Choose how you want to reach us. We reply quickly.</div></div>
<div style={{display:"flex",flexDirection:"column",gap:14}}>
<a href="https://wa.me/8801577069297?text=Hello%20TurnFun!" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
<CCard th={th} color={th.dm?"rgba(37,211,102,.9)":"rgba(18,140,60,.9)"} glow="rgba(37,211,102,.18)" border={th.dm?"rgba(37,211,102,.25)":"rgba(18,140,60,.18)"}
icon={<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>}
title="WhatsApp" sub="+880 1577-069297" badge="Fastest reply" bColor="rgba(37,211,102,.15)" bText={th.dm?"rgba(37,211,102,.9)":"rgba(18,140,60,.9)"}/>
</a>
<a href="mailto:rahmanraaakib@gmail.com?subject=TurnFun%20Inquiry" style={{textDecoration:"none"}}>
<CCard th={th} color={th.dm?"rgba(234,67,53,.9)":"rgba(200,40,30,.9)"} glow="rgba(234,67,53,.15)" border={th.dm?"rgba(234,67,53,.22)":"rgba(200,40,30,.15)"}
icon={<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
title="Gmail" sub="rahmanraaakib@gmail.com" badge="Within 24hrs" bColor="rgba(234,67,53,.1)" bText={th.dm?"rgba(234,67,53,.85)":"rgba(200,40,30,.85)"}/>
</a>
<div style={{...pS,padding:"16px 18px"}}><PH th={th}/>
<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9.5,color:th.sub,letterSpacing:".1em",fontWeight:600,textTransform:"uppercase",marginBottom:12}}>Available Hours</div>
{[["🕐","Weekdays","9 AM - 10 PM"],["📅","Weekend","10 AM - 8 PM"],["⚡","WhatsApp","Quickest reply"]].map(([e,l,v],i,a)=>(
<div key={i}><div style={{display:"flex",alignItems:"center",gap:11,padding:"7px 0"}}><span style={{fontSize:14,width:20,textAlign:"center"}}>{e}</span><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:300,color:th.sub,flex:1}}>{l}</span><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:12.5,color:th.txt}}>{v}</span></div>{i<a.length-1&&<div style={{height:"1px",background:th.div}}/>}</div>
))}
</div>
</div>
</div>}

{view===“settings”&&<div className="pg">
<Hdr title=“Settings” back={()=>go(“home”)} th={th}/>

<div style={{...pS,padding:"5px",marginBottom:13}}><PH th={th}/>
{[{ico:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,l:"Home",a:()=>go("home")},
{ico:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,l:"Profile",a:()=>go("profile")},
{ico:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,l:"Notifications",a:()=>go("notifs")},
{ico:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,l:"Contact Us",a:()=>go("contact")}
].map((item,i,arr)=><div key={item.l}><div className="mr" onClick={item.a}><span style={{color:th.mid}}>{item.ico}</span><span style={{flex:1}}>{item.l}</span><span style={{color:th.sub,opacity:.4}}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg></span></div>{i<arr.length-1&&<div style={{height:"1px",background:th.div,margin:"0 13px"}}/>}</div>)}
</div>
<div style={{...pS,padding:"17px 18px",marginBottom:13}}><PH th={th}/>
<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9.5,color:th.sub,letterSpacing:".1em",fontWeight:600,textTransform:"uppercase",marginBottom:13}}>Theme</div>
<div style={{display:"flex",flexDirection:"column",gap:8}}>
{[{id:"dark",e:"🌑",l:"Dark",d:"Classic deep purple glow"},{id:"liquid",e:"🌊",l:"Liquid Water",d:"Pure black liquid waves"}].map(t=>(
<div key={t.id} onClick={()=>stid(t.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 13px",borderRadius:13,cursor:"pointer",background:tid===t.id?th.bbg:"transparent",border:`1px solid ${tid===t.id?th.bbd:th.div}`,transition:"all .2s"}}>
<span style={{fontSize:18,flexShrink:0}}>{t.e}</span>
<div style={{flex:1}}><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:tid===t.id?500:400,color:tid===t.id?th.txt:th.mid}}>{t.l}</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10.5,fontWeight:300,color:th.sub}}>{t.d}</div></div>
{tid===t.id&&<div style={{width:7,height:7,borderRadius:"50%",background:th.txt,flexShrink:0}}/>}
</div>
))}
</div>
</div>
<div style={{...pS,padding:"17px 18px"}}><PH th={th}/>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
<div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:13.5,fontWeight:500,color:th.txt,marginBottom:3}}>Click Sound</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:300,color:th.sub}}>Sound on every tap</div></div>
<div onClick={()=>ssnd(p=>p==="off"?"water":"off")} style={{width:46,height:26,borderRadius:50,cursor:"pointer",background:snd!=="off"?th.bbd:th.div,position:"relative",transition:"all .28s"}}>
<div style={{position:"absolute",top:4,left:snd!=="off"?"calc(100% - 21px)":4,width:16,height:16,borderRadius:"50%",background:snd!=="off"?th.txt:"rgba(128,128,128,.5)",transition:"left .28s cubic-bezier(.34,1.56,.64,1)"}}/>
</div>
</div>
{snd!=="off"&&<div style={{display:"flex",flexDirection:"column",gap:7}}>
{[{id:"water",e:"💧",l:"Water Drop",d:"Soft plop"},{id:"rain",e:"🌧️",l:"Raindrop",d:"Light & crisp"},{id:"pond",e:"🌊",l:"Pond Ripple",d:"Deep bass"}].map(s=>(
<div key={s.id} onClick={()=>ssnd(s.id)} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 13px",borderRadius:12,cursor:"pointer",background:snd===s.id?th.bbg:"transparent",border:`1px solid ${snd===s.id?th.bbd:th.div}`,transition:"all .2s"}}>
<span style={{fontSize:17}}>{s.e}</span>
<div style={{flex:1}}><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:snd===s.id?500:400,color:snd===s.id?th.txt:th.mid}}>{s.l}</div><div style={{fontFamily:"'DM Sans',sans-serif",fontSize:10.5,fontWeight:300,color:th.sub}}>{s.d}</div></div>
{snd===s.id&&<div style={{width:6,height:6,borderRadius:"50%",background:th.txt}}/>}
</div>
))}
</div>}
</div>
</div>}

{view===“profile”&&<div className="pg">
<Hdr title=“Profile” back={()=>go(“settings”)} th={th}/>
{user?<>

<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12,marginBottom:24,marginTop:10}}>
<div style={{width:80,height:80,borderRadius:"50%",background:th.ibg,border:`1.5px solid ${th.ib}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,boxShadow:th.is}}>{user.g?"👤":user.n[0]?.toUpperCase()}</div>
<div style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:th.txt}}>{user.n}</div>
</div>
<div style={{...pS,marginBottom:14}}>
{[["🪪","Member ID",user.mid||"-"],["📱","Phone",user.p||"-"],["✉️","Gmail",user.gm||"-"],["📅","Joined",user.j]].map(([e,l,v],i,a)=>(
<div key={i}><div style={{display:"flex",alignItems:"center",gap:12,padding:"13px 18px"}}><span style={{fontSize:15}}>{e}</span><span style={{flex:1,fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:300,color:th.sub}}>{l}</span><span style={{fontFamily:"'DM Sans',sans-serif",fontSize:13.5,color:th.txt}}>{v}</span></div>{i<a.length-1&&<div style={{height:"1px",background:th.div,margin:"0 14px"}}/>}</div>
))}
</div>
<div onClick={()=>suser(null)} style={{textAlign:"center",padding:"14px",fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"rgba(220,80,80,.7)",cursor:"pointer"}}>Log Out</div>
</>:<>
<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,marginBottom:26,textAlign:"center",marginTop:12}}>
<span style={{fontSize:44}}>👋</span>
<div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:th.txt,marginTop:8}}>Welcome!</div>
</div>
<ProfileForm th={th} onSave={f=>suser({n:f.n,p:f.p,gm:f.gm,mid:f.mid,g:false,j:new Date().toLocaleDateString()})} onGuest={()=>suser({n:"Guest",p:"",gm:"",mid:"Guest",g:true,j:new Date().toLocaleDateString()})}/>
</>}
</div>}

{(view===“home”||view===“settings”)&&<div style={{marginTop:view===“settings”?36:56,padding:“32px 0 24px”,display:“flex”,flexDirection:“column”,alignItems:“center”,position:“relative”}}>

<div style={{position:"absolute",top:0,left:"5%",right:"5%",height:"1px",background:`linear-gradient(90deg,transparent,${th.div},transparent)`}}/>
<div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22,color:th.txt,opacity:.35,marginBottom:10,letterSpacing:"-.04em"}}>TurnFun</div>
<div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,fontWeight:300,color:th.sub,letterSpacing:".2em",textTransform:"uppercase",marginBottom:14}}>Learn &middot; Explore &middot; Grow</div>
<span style={{fontFamily:"'DM Sans',sans-serif",fontSize:8.5,color:th.sub,opacity:.55}}>© 2026 TurnFun</span>
</div>}
</div>
</div>;
}
