(function () {
  'use strict';

  const KEY = 'sv_gate_done';
  if (localStorage.getItem(KEY)) return;

  const css = `
#sv-gate{position:fixed;inset:0;z-index:8500;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(10,8,6,0.97);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);transition:opacity .55s ease,transform .55s ease}
#sv-gate.sv-gate-out{opacity:0;pointer-events:none}

#sv-gate-card{width:100%;max-width:460px;background:#0D0B09;border:1px solid rgba(196,150,90,0.22);border-radius:4px;padding:52px 48px 40px;position:relative;overflow:hidden;animation:gateIn .65s cubic-bezier(.22,1,.36,1) both}
@keyframes gateIn{from{opacity:0;transform:translateY(28px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}

#sv-gate-card::before{content:'';position:absolute;top:-120px;right:-80px;width:340px;height:340px;border-radius:50%;background:radial-gradient(circle,rgba(196,150,90,.07) 0%,transparent 70%);pointer-events:none}

.sg-logo{display:flex;align-items:center;gap:10px;margin-bottom:40px}
.sg-logo-mark{width:32px;height:32px;flex-shrink:0}
.sg-logo-name{font-family:'Cormorant Garamond',serif;font-weight:700;font-size:.85rem;letter-spacing:.28em;text-transform:uppercase;color:#F0EBE0}
.sg-logo-sub{font-family:'JetBrains Mono',monospace;font-size:.46rem;letter-spacing:.22em;color:#C4965A;opacity:.7;margin-top:2px}

.sg-eyebrow{display:flex;align-items:center;gap:10px;margin-bottom:16px}
.sg-eyebrow-line{width:28px;height:1px;background:#C4965A;flex-shrink:0}
.sg-eyebrow-txt{font-family:'JetBrains Mono',monospace;font-size:.52rem;letter-spacing:.22em;text-transform:uppercase;color:#C4965A}

.sg-h{font-family:'Cormorant Garamond',serif;font-size:2.15rem;line-height:1.08;letter-spacing:-.02em;margin-bottom:10px;background:linear-gradient(110deg,#c0c0c0 0%,#e8e8e8 22%,#fff 38%,#f4f4f4 48%,#e2e2e2 58%,#f9f9f9 72%,#fff 82%,#d8d8d8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.sg-h em{font-style:italic;background:none;-webkit-text-fill-color:#C4965A}

.sg-sub{font-family:'Cormorant Garamond',serif;font-size:.9rem;line-height:1.72;color:rgba(240,235,224,.52);margin-bottom:36px}

.sg-field{margin-bottom:22px}
.sg-label{display:block;font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:.18em;text-transform:uppercase;color:#5C5650;margin-bottom:9px}
.sg-input{width:100%;background:transparent;border:none;border-bottom:1px solid #1E1E1E;padding:9px 0;color:#F0EBE0;font-family:'Cormorant Garamond',serif;font-size:.95rem;outline:none;transition:border-color .25s;cursor:text}
.sg-input:focus{border-bottom-color:rgba(196,150,90,.5)}
.sg-input::placeholder{color:rgba(240,235,224,.18)}

.sg-btn{width:100%;margin-top:8px;font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:#0A0A0A;background:#C4965A;border:none;padding:16px 28px;border-radius:2px;display:flex;align-items:center;justify-content:center;gap:10px;transition:background .25s,transform .2s;cursor:none}
.sg-btn:hover{background:#D4B483;transform:translateY(-1px)}
.sg-btn:disabled{opacity:.6;transform:none}

.sg-divider{display:flex;align-items:center;gap:14px;margin:20px 0 16px}
.sg-divider-line{flex:1;height:1px;background:#1E1E1E}
.sg-divider-txt{font-family:'JetBrains Mono',monospace;font-size:.46rem;letter-spacing:.14em;text-transform:uppercase;color:#2E2E2E}

.sg-skip{display:block;text-align:center;font-family:'JetBrains Mono',monospace;font-size:.48rem;letter-spacing:.12em;text-transform:uppercase;color:#3A3530;cursor:none;transition:color .2s;text-decoration:none}
.sg-skip:hover{color:#5C5650}

.sg-err{font-family:'JetBrains Mono',monospace;font-size:.52rem;letter-spacing:.08em;color:#c46a5a;margin-top:10px;display:none}
.sg-ok{font-family:'JetBrains Mono',monospace;font-size:.52rem;letter-spacing:.08em;color:#C4965A;margin-top:10px;display:none}

@media(max-width:520px){#sv-gate-card{padding:36px 24px 28px}}
`;

  const html = `
<div id="sv-gate-card">
  <div class="sg-logo">
    <img src="logo-transparent.png" alt="SOLVRA" style="height:36px;display:block">
  </div>

  <div class="sg-eyebrow">
    <div class="sg-eyebrow-line"></div>
    <span class="sg-eyebrow-txt">Exclusive Access</span>
  </div>

  <h2 class="sg-h">Get <em>early access</em><br>to our studio.</h2>
  <p class="sg-sub">Drop your details and we'll keep you in the loop on new work, insights, and availability.</p>

  <form id="sv-gate-form" novalidate>
    <div class="sg-field">
      <label class="sg-label" for="sg-name">Full Name</label>
      <input class="sg-input" id="sg-name" name="name" type="text" placeholder="Your name" autocomplete="name" required />
    </div>
    <div class="sg-field">
      <label class="sg-label" for="sg-email">Email Address</label>
      <input class="sg-input" id="sg-email" name="email" type="email" placeholder="you@company.com" autocomplete="email" required />
    </div>
    <button class="sg-btn" id="sv-gate-submit" type="submit">
      Enter Studio
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </button>
    <div class="sg-err" id="sg-err">Something went wrong — please try again.</div>
    <div class="sg-ok" id="sg-ok">You're in. Welcome to Solvra.</div>
  </form>

  <div class="sg-divider">
    <div class="sg-divider-line"></div>
    <span class="sg-divider-txt">or</span>
    <div class="sg-divider-line"></div>
  </div>
  <a class="sg-skip" id="sv-gate-skip" href="#">Continue without signing up</a>
</div>
`;

  function dismiss() {
    const gate = document.getElementById('sv-gate');
    gate.classList.add('sv-gate-out');
    setTimeout(() => gate.remove(), 600);
  }

  function init() {
    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    const gate = document.createElement('div');
    gate.id = 'sv-gate';
    gate.innerHTML = html;
    document.body.appendChild(gate);

    // Prevent scroll while gate is open
    document.body.style.overflow = 'hidden';

    const form    = document.getElementById('sv-gate-form');
    const btn     = document.getElementById('sv-gate-submit');
    const errEl   = document.getElementById('sg-err');
    const okEl    = document.getElementById('sg-ok');
    const skipBtn = document.getElementById('sv-gate-skip');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      errEl.style.display = 'none';
      okEl.style.display  = 'none';

      const name  = document.getElementById('sg-name').value.trim();
      const email = document.getElementById('sg-email').value.trim();

      if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errEl.textContent = 'Please enter a valid name and email.';
        errEl.style.display = 'block';
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Submitting…';

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'solvra-leads',
          name: name,
          email: email
        }).toString()
      })
        .then(function (res) {
          if (res.ok) {
            localStorage.setItem(KEY, '1');
            document.body.style.overflow = '';
            okEl.style.display = 'block';
            setTimeout(dismiss, 1200);
          } else {
            throw new Error('bad response');
          }
        })
        .catch(function () {
          // Still let them in — don't block on network errors
          localStorage.setItem(KEY, '1');
          document.body.style.overflow = '';
          dismiss();
        });
    });

    skipBtn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.setItem(KEY, 'skip');
      document.body.style.overflow = '';
      dismiss();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
