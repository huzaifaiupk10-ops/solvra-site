(function(){
'use strict';

const css=`
/* ── Floating button ── */
#sv-btn{position:fixed;bottom:28px;right:28px;z-index:7000;width:52px;height:52px;border-radius:50%;background:#C4965A;border:none;cursor:none;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 22px rgba(196,150,90,0.45);transition:transform .2s ease,box-shadow .2s ease,background .25s;animation:sv-pulse 2.8s ease-in-out infinite;flex-shrink:0}
#sv-btn:hover{transform:scale(1.08);box-shadow:0 6px 30px rgba(196,150,90,0.6),0 0 0 8px rgba(196,150,90,0.1)}
#sv-btn.sv-open{animation:none;background:#161210;box-shadow:0 4px 20px rgba(0,0,0,0.5)}
@keyframes sv-pulse{0%,100%{box-shadow:0 4px 22px rgba(196,150,90,0.45),0 0 0 0 rgba(196,150,90,0.3)}60%{box-shadow:0 4px 22px rgba(196,150,90,0.45),0 0 0 12px rgba(196,150,90,0)}}

/* ── Panel (Notion frame) ── */
#sv-win{position:fixed;bottom:92px;right:28px;z-index:7000;width:390px;height:calc(100vh - 110px);max-height:580px;background:#0f0f0f;border:1px solid rgba(255,255,255,0.1);border-radius:12px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 32px 80px rgba(0,0,0,0.85),0 0 0 1px rgba(196,150,90,0.06),inset 0 1px 0 rgba(255,255,255,0.04);transform:translateY(20px) scale(0.96);opacity:0;pointer-events:none;transition:transform .35s cubic-bezier(.22,1,.36,1),opacity .28s ease}
#sv-win.sv-open{transform:translateY(0) scale(1);opacity:1;pointer-events:all}

/* ── Notion-style header ── */
#sv-hdr{padding:0;background:#111;border-bottom:1px solid rgba(255,255,255,0.07);flex-shrink:0}
.sv-hdr-top{display:flex;align-items:center;justify-content:space-between;padding:14px 18px 10px}
.sv-hdr-icon{width:38px;height:38px;background:rgba(196,150,90,0.08);border:1px solid rgba(196,150,90,0.22);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sv-hdr-text{flex:1;margin-left:12px}
.sv-hdr-title{font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-weight:600;color:#F0EBE0;letter-spacing:-.01em;line-height:1}
.sv-hdr-sub{font-family:'JetBrains Mono',monospace;font-size:.47rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(240,235,224,.3);margin-top:3px}
.sv-hdr-divider{height:1px;background:rgba(255,255,255,0.05);margin:0 18px}
.sv-hdr-props{display:flex;align-items:center;gap:16px;padding:8px 18px 12px}
.sv-hdr-prop{display:flex;align-items:center;gap:5px;font-family:'JetBrains Mono',monospace;font-size:.46rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(240,235,224,.25)}
.sv-hdr-prop-dot{width:6px;height:6px;border-radius:50%;background:#5aad6e;flex-shrink:0}
#sv-close{background:none;border:none;cursor:none;color:rgba(240,235,224,.25);padding:4px;transition:color .2s;display:flex;align-items:center;border-radius:4px}
#sv-close:hover{color:#F0EBE0;background:rgba(255,255,255,.06)}

/* ── Messages ── */
#sv-msgs{flex:1;overflow-y:auto;padding:20px 18px;display:flex;flex-direction:column;gap:12px;scrollbar-width:thin;scrollbar-color:rgba(196,150,90,.12) transparent}
#sv-msgs::-webkit-scrollbar{width:3px}
#sv-msgs::-webkit-scrollbar-thumb{background:rgba(196,150,90,.15);border-radius:2px}

.sv-msg{animation:sv-fi .24s ease}
@keyframes sv-fi{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

/* Bot — Notion callout block style */
.sv-bot{align-self:flex-start;max-width:88%;padding:12px 14px 12px 16px;border-left:2px solid rgba(196,150,90,0.45);background:rgba(255,255,255,0.025);border-radius:0 8px 8px 0;font-family:'Cormorant Garamond',serif;font-size:1rem;line-height:1.7;color:rgba(240,235,224,.88);letter-spacing:.01em}

/* User — right-aligned editorial */
.sv-user{align-self:flex-end;max-width:80%;padding:10px 14px;background:rgba(196,150,90,0.1);border:1px solid rgba(196,150,90,0.2);border-radius:8px 2px 8px 8px;font-family:'Cormorant Garamond',serif;font-size:1rem;line-height:1.6;color:#D4A96A;letter-spacing:.01em;text-align:right;font-style:italic}

/* Typing dots */
.sv-typing{align-self:flex-start;padding:14px 16px;border-left:2px solid rgba(196,150,90,0.3);background:rgba(255,255,255,0.02);border-radius:0 8px 8px 0;display:flex;align-items:center;gap:5px}
.sv-typing span{width:5px;height:5px;border-radius:50%;background:rgba(196,150,90,0.5);animation:sv-bounce 1.2s ease-in-out infinite}
.sv-typing span:nth-child(2){animation-delay:.2s}
.sv-typing span:nth-child(3){animation-delay:.4s}
@keyframes sv-bounce{0%,80%,100%{transform:translateY(0);opacity:.35}40%{transform:translateY(-5px);opacity:1}}

/* Quick-reply chips */
.sv-qrow{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.sv-q{font-family:'Cormorant Garamond',serif;font-size:.82rem;font-style:italic;padding:4px 12px;border:1px solid rgba(196,150,90,0.22);border-radius:20px;color:rgba(196,150,90,.75);background:transparent;cursor:none;transition:all .18s;letter-spacing:.01em}
.sv-q:hover{border-color:#C4965A;color:#C4965A;background:rgba(196,150,90,.07)}

/* ── Footer / input ── */
#sv-ftr{padding:12px 14px;border-top:1px solid rgba(255,255,255,0.07);background:#0C0C0C;display:flex;align-items:center;gap:8px;flex-shrink:0}
#sv-inp{flex:1;background:transparent;border:none;border-bottom:1px solid rgba(255,255,255,.1);border-radius:0;padding:8px 4px;font-family:'Cormorant Garamond',serif;font-size:1rem;letter-spacing:.01em;color:#F0EBE0;outline:none;transition:border-color .2s;cursor:text;font-style:italic}
#sv-inp::placeholder{color:rgba(240,235,224,.2);font-style:italic}
#sv-inp:focus{border-bottom-color:rgba(196,150,90,.5)}
#sv-snd{width:32px;height:32px;border-radius:6px;background:#C4965A;border:none;cursor:none;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:opacity .2s}
#sv-snd:hover{opacity:.85}

/* ── Booking card (Notion page block) ── */
.sv-bwrap{max-width:100%;width:100%;background:none;border:none;align-self:stretch;padding:0;animation:sv-fi .24s ease}
.sv-bcard{background:#111;border:1px solid rgba(255,255,255,0.1);border-radius:10px;overflow:hidden}
.sv-bc-hd{padding:18px 20px 14px;border-bottom:1px solid rgba(255,255,255,0.07)}
.sv-bcard-title{font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:600;color:#F0EBE0;letter-spacing:-.01em;line-height:1.1}
.sv-bcard-sub{font-family:'JetBrains Mono',monospace;font-size:.46rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(240,235,224,.28);margin-top:5px}
.sv-bc-body{padding:14px 20px 18px;display:flex;flex-direction:column;gap:0}
.sv-prop-row{display:flex;align-items:center;border-bottom:1px solid rgba(255,255,255,0.05);padding:2px 0}
.sv-prop-row:last-of-type{border-bottom:none}
.sv-prop-label{font-family:'JetBrains Mono',monospace;font-size:.45rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(240,235,224,.28);width:72px;flex-shrink:0}
.sv-binp{flex:1;background:transparent;border:none;padding:10px 8px;font-family:'Cormorant Garamond',serif;font-size:.95rem;letter-spacing:.01em;color:#F0EBE0;outline:none;cursor:text;width:100%;box-sizing:border-box;resize:none}
.sv-binp::placeholder{color:rgba(240,235,224,.22);font-style:italic}
.sv-binp option{background:#111;color:#F0EBE0}
.sv-binp:focus{color:#F0EBE0}
select.sv-binp{-webkit-appearance:none;appearance:none;cursor:none}
.sv-bc-ftr{padding:14px 20px;border-top:1px solid rgba(255,255,255,0.07);display:flex;flex-direction:column;gap:8px}
.sv-bbtn{background:#C4965A;color:#080808;border:none;border-radius:6px;padding:12px 18px;font-family:'Cormorant Garamond',serif;font-size:.95rem;letter-spacing:.04em;font-style:italic;cursor:none;transition:opacity .2s;width:100%}
.sv-bbtn:hover{opacity:.85}
.sv-berr{font-family:'JetBrains Mono',monospace;font-size:.46rem;letter-spacing:.08em;color:#e05a5a;display:none;text-transform:uppercase}
.sv-berr.sv-show{display:block}
.sv-bsuccess{border-color:rgba(90,173,110,0.25)!important;background:rgba(90,173,110,0.04)!important}

@media(max-width:480px){
  #sv-win{width:calc(100vw - 20px);right:10px;bottom:80px;height:calc(100vh - 100px);max-height:none}
  #sv-btn{right:14px;bottom:14px}
}
`;

const markup=`
<button id="sv-btn" aria-label="Chat with SOLVRA">
  <svg id="sv-ic-chat" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#080808" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  <svg id="sv-ic-x" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C4965A" stroke-width="2.5" stroke-linecap="round" style="display:none"><path d="M18 6L6 18M6 6l12 12"/></svg>
</button>
<div id="sv-win">
  <div id="sv-hdr">
    <div class="sv-hdr-top">
      <div class="sv-hdr-text">
        <img src="logo-transparent.png" alt="SOLVRA" style="height:36px;display:block;margin-bottom:3px">
        <div class="sv-hdr-sub">AI Studio Assistant</div>
      </div>
      <button id="sv-close" aria-label="Close">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="sv-hdr-divider"></div>
    <div class="sv-hdr-props">
      <div class="sv-hdr-prop"><div class="sv-hdr-prop-dot"></div>Online now</div>
      <div class="sv-hdr-prop">· Replies within 24h</div>
    </div>
  </div>
  <div id="sv-msgs"></div>
  <div id="sv-ftr">
    <input id="sv-inp" type="text" placeholder="Ask me anything…" autocomplete="off" maxlength="200"/>
    <button id="sv-snd" aria-label="Send">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#080808" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </button>
  </div>
</div>
`;

// ── Inject ────────────────────────────────────────────────────
const styleEl=document.createElement('style');
styleEl.textContent=css;
document.head.appendChild(styleEl);
const wrap=document.createElement('div');
wrap.innerHTML=markup;
document.body.appendChild(wrap);

// ── Refs ──────────────────────────────────────────────────────
const btn=document.getElementById('sv-btn');
const win=document.getElementById('sv-win');
const msgs=document.getElementById('sv-msgs');
const inp=document.getElementById('sv-inp');
const sndBtn=document.getElementById('sv-snd');
const closeBtn=document.getElementById('sv-close');
const icChat=document.getElementById('sv-ic-chat');
const icX=document.getElementById('sv-ic-x');
let isOpen=false;

// ── Cursor integration ────────────────────────────────────────
[btn,sndBtn,closeBtn].forEach(el=>{
  el.addEventListener('mouseenter',()=>{const c=document.getElementById('cur');if(c){c.style.width='14px';c.style.height='14px';}});
  el.addEventListener('mouseleave',()=>{const c=document.getElementById('cur');if(c){c.style.width='9px';c.style.height='9px';}});
});

// ── Toggle ────────────────────────────────────────────────────
btn.addEventListener('click',toggle);
closeBtn.addEventListener('click',toggle);

function toggle(){
  isOpen=!isOpen;
  win.classList.toggle('sv-open',isOpen);
  btn.classList.toggle('sv-open',isOpen);
  icChat.style.display=isOpen?'none':'block';
  icX.style.display=isOpen?'block':'none';
  if(isOpen&&msgs.children.length===0){
    setTimeout(()=>{
      addBot("Welcome to SOLVRA. I'm here to help with anything — services, pricing, process, or booking a call with Huzaifa directly.<div class='sv-qrow'><button class='sv-q' data-msg='What services do you offer?'>Services</button><button class='sv-q' data-msg='How much does it cost?'>Pricing</button><button class='sv-q' data-msg='Book a call'>Book a Call</button><button class='sv-q' data-msg='Who is behind SOLVRA?'>About</button></div>");
    },380);
  }
  if(isOpen)setTimeout(()=>inp.focus(),360);
}

// ── Messaging ─────────────────────────────────────────────────
sndBtn.addEventListener('click',send);
inp.addEventListener('keydown',e=>{if(e.key==='Enter')send();});

function send(){
  const text=inp.value.trim();
  if(!text)return;
  addUser(text);
  inp.value='';
  const reply=respond(text);
  if(reply===null)return;
  showTyping();
  setTimeout(()=>{removeTyping();addBot(reply);},700+Math.random()*600);
}

function addUser(text){
  const d=document.createElement('div');
  d.className='sv-msg sv-user';
  d.textContent=text;
  msgs.appendChild(d);scroll();
}
function addBot(html,wide){
  const d=document.createElement('div');
  d.className=wide?'sv-msg sv-bwrap':'sv-msg sv-bot';
  d.innerHTML=html;
  msgs.appendChild(d);scroll();
}

let typEl=null;
function showTyping(){
  typEl=document.createElement('div');
  typEl.className='sv-msg sv-typing';
  typEl.innerHTML='<span></span><span></span><span></span>';
  msgs.appendChild(typEl);scroll();
}
function removeTyping(){if(typEl){typEl.remove();typEl=null;}}
function scroll(){msgs.scrollTop=msgs.scrollHeight;}

// ── Event delegation ──────────────────────────────────────────
msgs.addEventListener('click',e=>{
  const q=e.target.closest('.sv-q');
  if(q&&q.dataset.msg){inp.value=q.dataset.msg;send();return;}
  const bb=e.target.closest('.sv-bbtn');
  if(bb)submitBooking(bb);
});

// ── Booking card (Notion page block) ─────────────────────────
function showBookingCard(){
  showTyping();
  setTimeout(()=>{
    removeTyping();
    addBot(`<div class="sv-bcard">
  <div class="sv-bc-hd">
    <div class="sv-bcard-title">Schedule a Call</div>
    <div class="sv-bcard-sub">Huzaifa will confirm within 24 hours</div>
  </div>
  <div class="sv-bc-body">
    <div class="sv-prop-row">
      <span class="sv-prop-label">Name</span>
      <input class="sv-binp" data-f="name" type="text" placeholder="Your full name" autocomplete="name"/>
    </div>
    <div class="sv-prop-row">
      <span class="sv-prop-label">Email</span>
      <input class="sv-binp" data-f="email" type="email" placeholder="your@email.com" autocomplete="email"/>
    </div>
    <div class="sv-prop-row">
      <span class="sv-prop-label">Time</span>
      <select class="sv-binp" data-f="time">
        <option value="">Preferred slot…</option>
        <option>Morning (9am – 12pm)</option>
        <option>Afternoon (12pm – 5pm)</option>
        <option>Evening (5pm – 8pm)</option>
        <option>Flexible / Any time</option>
      </select>
    </div>
    <div class="sv-prop-row" style="border-bottom:none">
      <span class="sv-prop-label">Service</span>
      <select class="sv-binp" data-f="topic">
        <option value="">Select a service…</option>
        <option>Web Development</option>
        <option>AI Agents &amp; Automation</option>
        <option>Branding &amp; Identity</option>
        <option>Multiple Services</option>
        <option>Not sure yet</option>
      </select>
    </div>
  </div>
  <div class="sv-bc-ftr">
    <div class="sv-berr">Please enter your name and email.</div>
    <button class="sv-bbtn">Confirm Booking</button>
  </div>
</div>`,true);
  },750);
}

function submitBooking(bbtn){
  const card=bbtn.closest('.sv-bcard');
  const name=card.querySelector('[data-f="name"]').value.trim();
  const email=card.querySelector('[data-f="email"]').value.trim();
  const time=card.querySelector('[data-f="time"]').value||'Flexible';
  const topic=card.querySelector('[data-f="topic"]').value||'Not specified';
  const errEl=card.querySelector('.sv-berr');

  if(!name||!email){errEl.classList.add('sv-show');return;}
  errEl.classList.remove('sv-show');

  const subject=encodeURIComponent('Call Booking — '+name);
  const body=encodeURIComponent('New call booking from the SOLVRA website.\n\nName: '+name+'\nEmail: '+email+'\nPreferred time: '+time+'\nService: '+topic);
  window.open('https://mail.google.com/mail/?view=cm&to=huzaifaiupk10@gmail.com&su='+subject+'&body='+body,'_blank');

  card.classList.add('sv-bsuccess');
  card.innerHTML=`<div class="sv-bc-hd" style="border-bottom:none">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5aad6e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
      <span style="font-family:'JetBrains Mono',monospace;font-size:.46rem;letter-spacing:.14em;text-transform:uppercase;color:#5aad6e">Booking Sent</span>
    </div>
    <div class="sv-bcard-title" style="font-size:1.05rem">See you on the call, ${name}.</div>
    <div class="sv-bcard-sub" style="margin-top:6px;color:rgba(240,235,224,.4)">Confirmation headed to <strong style="color:rgba(240,235,224,.6)">${email}</strong></div>
  </div>`;
  scroll();
  setTimeout(()=>addBot("All set. Is there anything else I can help with?"),900);
}

// ── Response engine ───────────────────────────────────────────
function has(str,keys){return keys.some(k=>str.includes(k));}
function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}
function lnk(href,label){return '<a href="'+href+'" style="color:#C4965A;text-decoration:underline">'+label+'</a>';}

function respond(raw){
  const m=raw.toLowerCase();

  if(has(m,['book','schedule','call','meeting','appointment','speak with','talk to','hop on','zoom','video call','phone call'])){
    showBookingCard();
    return null;
  }

  if(has(m,['hello','hi','hey','howdy','good morning','good afternoon','good evening','sup','yo'])){
    return pick([
      "Hello — great to have you here. Ask me anything about SOLVRA's services, pricing, or book a call with Huzaifa.",
      "Hey! What would you like to know about SOLVRA?",
      "Hi. Ask about web development, AI agents, branding — or book a call to speak directly."
    ]);
  }

  if(has(m,['service','what do you','what can you','what you offer','capabilities','what does solvra'])){
    return 'SOLVRA offers three core services:<br/><br/><strong>01 — Web Development</strong><br/>React, HTML/CSS, responsive & performance sites<br/><br/><strong>02 — AI Agents & Automation</strong><br/>Chatbots, workflow automation, agentic AI pipelines<br/><br/><strong>03 — Branding & Identity</strong><br/>Logos, typography, colour palettes<br/><br/>Which interests you?';
  }

  if(has(m,['web','website','landing','react','html','css','responsive','performance','frontend'])){
    return 'Web Development at SOLVRA — clean, fast, professional websites built with React or HTML/CSS. Fully responsive and optimised to convert visitors into clients.<br/><br/>'+lnk('service-1.html','View service details →');
  }

  if(has(m,['ai agent','automat','chatbot','workflow','agentic','virtual assistant','prompt','lead gen','bot'])){
    return 'The AI & Automation service builds intelligent systems that work around the clock — chatbots, lead agents, workflow automation, and agentic pipelines.<br/><br/>'+lnk('service-2.html','View service details →');
  }

  if(has(m,['brand','logo','identity','colour','color','typography','visual','design system'])){
    return 'Branding & Identity — a complete visual system including logo, type hierarchy, and colour palette built to look premium everywhere.<br/><br/>'+lnk('service-3.html','View service details →');
  }

  if(has(m,['price','pricing','cost','how much','rate','fee','budget','quote','package'])){
    return 'Every project is custom-scoped based on complexity and deliverables.<br/><br/>Best way to get a quote: '+lnk('index.html#contact','share your details')+' or <button class="sv-q" data-msg="Book a call" style="display:inline-flex;margin:0 2px">book a call</button> and we\'ll scope it together.';
  }

  if(has(m,['process','how do you work','steps','how long','timeline','approach'])){
    return '<strong>01 Discovery</strong> — goals & requirements<br/><strong>02 Strategy</strong> — solution planning<br/><strong>03 Design</strong> — visual direction<br/><strong>04 Build</strong> — development<br/><strong>05 Refine</strong> — revisions<br/><strong>06 Launch</strong> — delivery & handoff<br/><br/>'+lnk('process.html','Full process →');
  }

  if(has(m,['who are you','about','founder','huzaifa','team','behind solvra','who runs'])){
    return 'SOLVRA is run by <strong>Huzaifa Imran</strong> — web developer, AI agent developer, and UX/UI designer. Technical depth meets design craft.<br/><br/>'+lnk('about.html','Full story →');
  }

  if(has(m,['contact','reach out','get in touch','start a project','hire','work together','email'])){
    return 'Use the '+lnk('index.html#contact','contact form')+' or <button class="sv-q" data-msg="Book a call" style="display:inline-flex;margin:0 2px">book a call</button> — Huzaifa responds within 24 hours.';
  }

  if(has(m,['portfolio','work','case stud','previous','past work','example','projects'])){
    return 'Browse previous work in the '+lnk('work.html','Work section')+' — web, AI, and branding across multiple industries.';
  }

  if(has(m,['insight','blog','article','read','post'])){
    return 'The '+lnk('insights.html','Insights section')+' has articles on AI, web development, and building premium digital products.';
  }

  if(has(m,['thank','thanks','great','awesome','perfect','helpful','appreciate'])){
    return pick(["Happy to help. Anything else?","Glad I could assist — feel free to ask anything else.","Anytime. Is there anything else I can help with?"]);
  }

  if(has(m,['bye','goodbye','see you','later','take care'])){
    return "Take care — looking forward to working with you.";
  }

  return pick([
    'Good question — '+lnk('index.html#contact','reach out directly')+' or book a call and Huzaifa will answer properly.',
    "Try asking about services, pricing, or the process — or just book a call to speak directly.",
    'Not sure on that one — '+lnk('index.html#contact','drop a message')+' and you\'ll hear back within 24 hours.'
  ]);
}

})();
