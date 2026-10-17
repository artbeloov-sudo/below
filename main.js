/* BELOV landing. BELOV_BASE = корень, откуда лежит этот скрипт (нужен для спрайта лоадера) */
var BELOV_BASE=(document.currentScript&&document.currentScript.src||'').replace(/[^\/?#]*(\?.*)?$/,'');
(function(){
 var say=document.getElementById('say'),words=say.textContent.trim().split(/\s+/);
 say.innerHTML=words.map(function(w){return '<span class="w">'+w+'</span>'}).join(' ');
 var ws=say.querySelectorAll('.w'),pin=document.getElementById('process'),po=document.getElementById('po'),
  steps=document.querySelectorAll('#stp div'),idx=document.querySelectorAll('#idx span'),prog=document.getElementById('prog');
 function tick(){
  var vh=innerHeight,r=say.getBoundingClientRect(),p=Math.min(1,Math.max(0,(vh*.85-r.top)/(vh*.6+r.height*.5)));
  var n=Math.round(p*ws.length);for(var i=0;i<ws.length;i++)ws[i].classList.toggle('on',i<n);
  var b=pin.getBoundingClientRect(),q=Math.min(1,Math.max(0,-b.top/(b.height-vh))),skE=pin.firstElementChild,fxo=b.top<=0&&b.bottom>=vh;skE.classList.toggle('fx',fxo);skE.classList.toggle('bt',!fxo&&b.top<0);
  po.style.transform='translateX(-50%) translateY('+(q*-4)+'%) scale('+(1+q*.22)+')';
  prog.style.width=(q*100)+'%';Q=q;
  var s=Math.min(2,Math.floor(q*3));
  steps.forEach(function(e,j){e.classList.toggle('on',j===s)});idx.forEach(function(e,j){e.classList.toggle('on',j===s)});
 }
 addEventListener('scroll',tick,{passive:true});addEventListener('resize',tick);tick();
 var cv=document.getElementById('cv'),cx=cv.getContext('2d'),sk=cv.parentNode,N=innerWidth<700?900:2000,P=[],W,H,dpr=Math.min(2,devicePixelRatio||1),Q=0,T=0,still=matchMedia('(prefers-reduced-motion:reduce)').matches;
 function rs(){W=sk.clientWidth;H=sk.clientHeight;cv.width=W*dpr;cv.height=H*dpr;cx.setTransform(dpr,0,0,dpr,0,0)}
 rs();addEventListener('resize',rs);
 var cols=Math.ceil(Math.sqrt(N*.5)),rows=Math.ceil(N/cols);
 for(var i=0;i<N;i++)P.push({x:Math.random(),y:Math.random(),a:Math.random()*6.28,h:Math.random(),s:.4+Math.random()*1.2,f:Math.random()*6.28,gx:(i%cols)/(cols-1),gy:Math.floor(i/cols)/(rows-1),px:(Math.random()-.5),py:Math.random()});
 function frame(){
  var st=Math.min(2,Math.floor(Q*3)),sc=1+Q*.22,ph=H*sc,pw=H*735/1055*sc,k=still?1:.03;
  cx.clearRect(0,0,W,H);
  for(var i=0;i<N;i++){
   var p=P[i],u,v,al=.55,tint=false;
   if(st===0){u=(p.x-.5)*1.1+Math.sin(T*.3*p.s+p.f)*.05;v=p.y+Math.cos(T*.25*p.s+p.f)*.04;al=.3+.3*Math.sin(T*p.s+p.f)}
   else if(st===1){u=(p.gx-.5)*.5+Math.sin(T+p.gy*6)*.008;v=.05+p.gy*.87+Math.sin(T*1.2+p.gx*8)*.014;al=.75}
   else{var th=p.a+T*(.5+p.s*.5),t=p.h,r=.04+.23*Math.pow(1-Math.min(t,.7)/.7,2.2);
    if(t>.7){r=.04+(t-.7)*1.15*(.4+p.s*.5)}
    u=Math.cos(th)*r;v=.04+t*.8+Math.sin(th)*r*.1;al=.25+.5*(Math.sin(th)*.5+.5);tint=t>.78}
   p.px+=(u-p.px)*k;p.py+=(v-p.py)*k;
   cx.fillStyle=tint?'rgba(165,172,255,'+al+')':'rgba(255,255,255,'+al+')';
   var s=.7+p.s*.8;cx.fillRect(W/2+p.px*pw,H/2+(p.py-.5)*ph,s,s);
  }
 }
 function loop(t){T=t/1000;var b=pin.getBoundingClientRect();if(b.bottom>0&&b.top<innerHeight)frame();if(!still)requestAnimationFrame(loop)}
 requestAnimationFrame(loop);
 var rail=document.getElementById('rail');
 function mv(d){rail.scrollBy({left:d*(rail.querySelector('.card').offsetWidth+12),behavior:'smooth'})}
 document.getElementById('nx').onclick=function(){mv(1)};document.getElementById('pv').onclick=function(){mv(-1)};
})();

(function(){
 var d=document.documentElement,J=d.classList.contains('js'),BURST=0,LP=0;
 // scroll progress
 var sp=document.getElementById('sp');
 function spf(){var h=d.scrollHeight-innerHeight;sp.style.width=(h>0?scrollY/h*100:0)+'%'}
 addEventListener('scroll',spf,{passive:true});spf();
 // intro
 var ld=document.getElementById('ld');
 function go(){if(d.classList.contains('go'))return;if(ld){var lg=ld.querySelector('.lg'),ni=document.querySelector('.nav img');if(lg&&ni){var a=lg.getBoundingClientRect(),b=ni.getBoundingClientRect();lg.style.transformOrigin='0 0';lg.style.transition='transform 1.05s cubic-bezier(.77,0,.18,1) .1s';lg.style.transform='translate('+(b.left-a.left)+'px,'+(b.top-a.top)+'px) scale('+(b.height/a.height)+')'}}d.classList.add('go');BURST=performance.now();cu();setTimeout(function(){ld&&ld.remove()},2200)}
 function cu(){document.querySelectorAll('.bl b').forEach(function(el){var m=el.textContent.match(/^([\d\s]+)(.*)$/);if(!m)return;var to=parseInt(m[1].replace(/\s/g,''),10),suf=m[2],t0=performance.now()+1500;
  el.textContent='0'+suf;function f(t){var p=Math.min(1,Math.max(0,(t-t0)/1500)),e=1-Math.pow(1-p,3),v=Math.round(to*e);el.textContent=String(v).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+suf;if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)})}
 if(J&&ld){
  ld.querySelector('.tp img').src=document.querySelector('.nav img').src;
  var lcv=ld.querySelector('canvas'),lcx=lcv.getContext('2d'),lnum=ld.querySelector('.num b'),LW,LH,ldp=Math.min(2,devicePixelRatio||1),FRS=[],spr=new Image(),ppw,pph,rdy=0,T0=0,fin=0,DOT=null,lx0=0,ly0=0,lf0=0,NF=4,FW=425,FH=166;
  function build(){ppw=Math.min(LW*.62,680);pph=ppw*FH/FW;var g=Math.max(6,Math.round(ppw/78)),oc=document.createElement('canvas');oc.width=Math.ceil(ppw);oc.height=Math.ceil(pph);var ox=oc.getContext('2d',{willReadFrequently:true});FRS=[];
   for(var f=0;f<NF;f++){ox.clearRect(0,0,oc.width,oc.height);ox.drawImage(spr,f*FW,0,FW,FH,0,0,ppw,pph);var dd=ox.getImageData(0,0,oc.width,oc.height).data,a=[];
    for(var y=g/2;y<oc.height;y+=g)for(var x=g/2;x<oc.width;x+=g){var c=dd[((y|0)*oc.width+(x|0))*4+3]/255;if(c>.12)a.push(x,y,g*.46*Math.sqrt(c))}
    FRS.push(a)}}
  function lrs(){LW=innerWidth;LH=innerHeight;lcv.width=LW*ldp;lcv.height=LH*ldp;lcx.setTransform(ldp,0,0,ldp,0,0);if(rdy)build()}lrs();addEventListener('resize',lrs);
  spr.onload=function(){rdy=1;build()};spr.crossOrigin='anonymous';spr.src=BELOV_BASE+'loader-sprite.png';
  (function lp(t){if(!ld.isConnected)return;requestAnimationFrame(lp);if(!rdy)return;if(!T0)T0=t;
   lcx.globalCompositeOperation='destination-out';lcx.fillStyle='rgba(0,0,0,.16)';lcx.fillRect(0,0,LW,LH);lcx.globalCompositeOperation='source-over';
   lcx.fillStyle='#f2f2f0';lcx.beginPath();
   if(!BURST){var el=t-T0,p=Math.min(1,el/2400),e=1-Math.pow(1-p,2.2),f=Math.floor(el/105)%NF,a=FRS[f],ox=-ppw+e*(LW*.6+ppw*.5),oy=LH*.36-pph/2+Math.sin(el/90)*4;
    lx0=ox;ly0=oy;lf0=f;lnum.textContent=Math.round(e*100);
    for(var i=0;i<a.length;i+=3){lcx.moveTo(ox+a[i]+a[i+2],oy+a[i+1]);lcx.arc(ox+a[i],oy+a[i+1],a[i+2],0,6.2832)}
    lcx.fill();if(p>=1&&!fin){fin=1;setTimeout(go,150)}}
   else{if(!DOT){var b=FRS[lf0];DOT=[];for(var i=0;i<b.length;i+=3){var x=lx0+b[i],y=ly0+b[i+1],ang=Math.atan2(y-(ly0+pph/2),x-(lx0+ppw/2))+(Math.random()-.5)*1.2,v=40+Math.random()*210;DOT.push({x:x,y:y,r:b[i+2],vx:Math.cos(ang)*v,vy:Math.sin(ang)*v-60*Math.random()})}}
    var bt=(t-BURST)/1000,dt=.016,al=Math.max(0,1-bt*1.1);lcx.fillStyle='rgba(242,242,240,'+al+')';
    for(var i=0;i<DOT.length;i++){var q=DOT[i];q.x+=q.vx*dt;q.y+=q.vy*dt;lcx.moveTo(q.x+q.r,q.y);lcx.arc(q.x,q.y,q.r,0,6.2832)}lcx.fill()}
  })(performance.now());
  setTimeout(go,6000);
  // split headline
  var h1=document.querySelector('h1'),k=0;h1.setAttribute('aria-label','Сайты (’26) под ключ');
  (function sp2(nd){Array.prototype.slice.call(nd.childNodes).forEach(function(c){
   if(c.nodeType===3){var fr=document.createDocumentFragment();c.textContent.split('').forEach(function(ch){if(/\s/.test(ch)){fr.appendChild(document.createTextNode(ch));return}var w=document.createElement('span');w.className='ch-w';w.setAttribute('aria-hidden','true');var q=document.createElement('span');q.className='ch';q.style.setProperty('--i',k++);q.textContent=ch;w.appendChild(q);fr.appendChild(w)});c.parentNode.replaceChild(fr,c)}
   else if(c.tagName!=='EM')sp2(c)})})(h1);
  // mouse parallax on hero wave
  var wv=document.querySelector('.wv-h');
  if(matchMedia('(pointer:fine)').matches)addEventListener('mousemove',function(e){var x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;wv.style.translate=(x*-40)+'px '+(y*-28)+'px'});
 }
 // scroll reveal
 if(J&&'IntersectionObserver' in window){
  var els=document.querySelectorAll('.sv h2,.pr h2,.mp h2,.rw h2,.wk .wh>*,.ct h2,.lead,.srv,.sub,.t,.pc,.cs,.cta,.card,details,.mapc,.ctg a,.ab-grid>*,.rg>*,.rnote,.fm-wrap>*,.fqg .l');
  var io=new IntersectionObserver(function(en){en.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;el.classList.add('in');io.unobserve(el);
   setTimeout(function(){el.classList.remove('rv','in');el.style.removeProperty('--rd')},1800)})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  els.forEach(function(el){var sib=Array.prototype.indexOf.call(el.parentNode.children,el);el.classList.add('rv');el.style.setProperty('--rd',(sib%4*100)+'ms');io.observe(el)});
 }
 // video: play only when visible
 var cat=document.getElementById('cat');
 if(cat){var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(!rm&&'IntersectionObserver' in window){new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){var pr=cat.play();if(pr&&pr.catch)pr.catch(function(){})}else cat.pause()})},{threshold:.15}).observe(cat)}}
 // brief form
 var f=document.getElementById('bf');
 if(f){
  var S=f.querySelectorAll('.fs'),cur=0,bk=document.getElementById('bk'),nx=document.getElementById('nx2'),pg=document.getElementById('pg'),er=document.getElementById('er'),E=f.elements;
  function show(n){cur=n;S.forEach(function(s,i){s.classList.toggle('on',i===n)});pg.style.width=(n/(S.length-1)*100)+'%';bk.style.visibility=(n>0&&n<S.length-1)?'visible':'hidden';nx.firstChild.nodeValue=n===S.length-2?'Собрать бриф ':'Далее ';f.classList.toggle('done',n===S.length-1);er.textContent=''}
  function chk(n){if(n===0&&!E.kind.value)return'Выберите тип сайта';if(n===1&&!E.when.value)return'Выберите срок';if(n===3&&!E.contact.value.trim())return'Укажите, как с вами связаться';return''}
  nx.onclick=function(){var m=chk(cur);if(m){er.textContent=m;return}
   if(cur===S.length-2){var tx='Заявка на бесплатный видеоконцепт (сайт BELOV)\nТип сайта: '+E.kind.value+'\nСрок: '+E.when.value+'\nО задаче: '+(E.about.value.trim()||'—')+'\nИмя: '+(E.fname.value.trim()||'—')+'\nКонтакт: '+E.contact.value.trim();
    document.getElementById('pv2').textContent=tx;
    document.getElementById('wa').href='https://wa.me/79185191772?text='+encodeURIComponent(tx);
    document.getElementById('ml').href='mailto:artartbel@gmail.com?subject='+encodeURIComponent('Заявка на видеоконцепт')+'&body='+encodeURIComponent(tx)}
   show(cur+1)};
  bk.onclick=function(){show(cur-1)};
  f.addEventListener('submit',function(e){e.preventDefault();nx.click()});
  document.getElementById('cp').onclick=function(){var b=this,tx=document.getElementById('pv2').textContent;
   function ok(){b.textContent='Скопировано';setTimeout(function(){b.textContent='Скопировать бриф'},2000)}
   try{navigator.clipboard.writeText(tx).then(ok,function(){sel()})}catch(x){sel()}
   function sel(){var r=document.createRange();r.selectNodeContents(document.getElementById('pv2'));var s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='Выделено — нажмите копировать'}};
 }
})();
