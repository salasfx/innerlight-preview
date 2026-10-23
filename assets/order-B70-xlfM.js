import{M as Y,C as J,U as _,L as E,m as l,r as S,g,G as N,a as z,o as V,s as K}from"./common-CtLUKrXh.js";/* empty css              */const c=(t,e=document)=>e.querySelector(t),i=t=>String(t).replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]),x=[...z,{id:"cleanse",name:"Juice Cleanses",blurb:"Pick up fresh each day. Book at least 24 hours ahead."}],O=[...Y,...J.map(t=>({...t,cat:"cleanse"}))],X=_.flatMap(t=>t.items.map(e=>({name:e,price:t.price}))),Q={smoothies:[{name:"espresso shot",price:3.5},{name:"glass jar",price:1}]},P=["store","menu","pickup","pay"],j="ilj-order-v1",Z=()=>{try{return JSON.parse(localStorage.getItem(j))||{}}catch{return{}}},tt=Z(),a={step:"store",store:null,cart:[],cat:"juice",pickup:{mode:"asap",slot:null},contact:{name:"",phone:"",email:""},tip:.15,...tt},k=()=>{try{localStorage.setItem(j,JSON.stringify({...a,step:a.step==="done"?"store":a.step}))}catch{}},T=new URLSearchParams(location.search);E.some(t=>t.id===T.get("location"))&&(a.store=T.get("location"),a.step="menu");T.has("cleanse")&&(a.cat="cleanse",a.store&&(a.step="menu"));a.store||(a.step="store");const $=()=>E.find(t=>t.id===a.store),B=t=>(t.price??0)*t.qty,w=()=>{const t=a.cart.reduce((n,o)=>n+B(o),0),e=a.cart.reduce((n,o)=>n+(o.glass?N*o.qty:0),0),s=Math.round(t*a.tip*100)/100;return{subtotal:t,deposit:e,tip:s,total:t+e+s,count:a.cart.reduce((n,o)=>n+o.qty,0),unpriced:a.cart.some(n=>n.price==null)}},et=t=>`/innerlight-preview/img/menu/${t}`;function R(t,e=!1){return t.photo?`<div class="visual photo${t.cat==="juice"||t.cat==="milks"?" bottle":""}"><img src="${et(t.photo)}" alt="${i(t.name)}" ${e?"":'loading="lazy"'} /></div>`:`<div class="visual swatch" style="--c:${t.color}" aria-hidden="true"><span>${i(t.name)}</span></div>`}const C=c("#order-main"),y=c("#cart"),f=c("#cart-bar");function h(){document.querySelectorAll(".stepper li").forEach(t=>{const e=P.indexOf(t.dataset.step),s=P.indexOf(a.step);t.classList.toggle("done",a.step==="done"||e<s),t.classList.toggle("on",e===s)}),C.innerHTML={store:at,menu:st,pickup:nt,pay:ot,done:it}[a.step](),M(),k(),S||g.from(C.children,{y:24,opacity:0,duration:.6,ease:"power3.out",stagger:.05})}function at(){return`
    <div class="panel">
      <h2>Choose your pickup store</h2>
      <p class="muted">Orders are prepared at the store you choose and can’t be moved to the other store once placed.</p>
      <div class="store-grid">${E.map(e=>{const s=V(e);return`
      <button class="store-card ${a.store===e.id?"sel":""}" data-store="${e.id}" aria-pressed="${a.store===e.id}">
        <span class="open-badge ${s.open?"is-open":""}">${s.text}</span>
        <h3>${e.name}</h3>
        <p>${i(e.street)}<br>${e.city}, ${e.region} ${e.zip}</p>
        <p class="muted">${e.hoursText.join(" · ")}</p>
        <span class="radio" aria-hidden="true"></span>
      </button>`}).join("")}</div>
      <div class="panel-foot"><button class="btn btn-solid btn-lg" data-go="menu" ${a.store?"":"disabled"}>Start your order →</button></div>
    </div>`}function st(){const t=x.map(n=>`<button class="chip-btn ${a.cat===n.id?"on":""}" data-cat="${n.id}">${n.name}</button>`).join(""),e=x.find(n=>n.id===a.cat),s=O.filter(n=>n.cat===a.cat).map(n=>`
      <button class="product" data-item="${n.id}">
        ${R(n)}
        <span class="product-info"><h3>${i(n.name)}</h3><p>${i(n.ing)}</p></span>
        <span class="product-price">${n.price==null?"From the store":l(n.price)}</span>
        <span class="product-add" aria-hidden="true">+</span>
      </button>`).join("");return`
    <div class="menu-head">
      <div><p class="eyebrow">Ordering from ${$().name}</p><h2>${e.name}</h2><p class="muted">${e.blurb}</p></div>
      <button class="link-btn" data-go="store">Change store</button>
    </div>
    <div class="chips" role="tablist" aria-label="Menu categories">${t}</div>
    <div class="product-grid">${s}</div>`}function H(t){const{day:e,hour:s}=K(),[n,o]=t.hours[e],d=Math.max(n,Math.ceil((s+.25)*4)/4),p=[];for(let b=d;b<=o-.25;b+=.25)p.push(b);if(p.length)return{day:"Today",slots:p,asap:s>=n&&s<o-.25};const[U,W]=t.hours[(e+1)%7];for(let b=U;b<=W-.25;b+=.25)p.push(b);return{day:"Tomorrow",slots:p,asap:!1}}const D=t=>{const e=Math.floor(t),s=Math.round((t-e)*60);return`${(e+11)%12+1}:${String(s).padStart(2,"0")} ${e<12?"am":"pm"}`};function F(){const t=$(),e=H(t);if(a.pickup.mode==="asap"&&e.asap)return"ASAP · about 15 min";const s=a.pickup.slot??e.slots[0];return`${e.day} at ${D(s)}`}function nt(){const t=$(),e=H(t);!e.asap&&a.pickup.mode==="asap"&&(a.pickup.mode="later"),(a.pickup.slot==null||!e.slots.includes(a.pickup.slot))&&(a.pickup.slot=e.slots[0]);const s=e.slots.map(o=>`<option value="${o}" ${o===a.pickup.slot?"selected":""}>${e.day} · ${D(o)}</option>`).join(""),n=a.contact;return`
    <div class="panel">
      <h2>When should we have it ready?</h2>
      <p class="muted">Pickup at ${t.name} · ${i(t.street)}</p>
      <div class="time-grid">
        <label class="time-opt ${a.pickup.mode==="asap"?"sel":""} ${e.asap?"":"off"}">
          <input type="radio" name="when" value="asap" ${a.pickup.mode==="asap"?"checked":""} ${e.asap?"":"disabled"} />
          <b>ASAP</b><span>${e.asap?"Ready in about 15 minutes":"Store is closed right now"}</span>
        </label>
        <label class="time-opt ${a.pickup.mode==="later"?"sel":""}">
          <input type="radio" name="when" value="later" ${a.pickup.mode==="later"?"checked":""} />
          <b>Schedule</b><span>Pick a time ${e.day.toLowerCase()}</span>
          <select id="slot" aria-label="Pickup time" ${a.pickup.mode==="later"?"":"disabled"}>${s}</select>
        </label>
      </div>
      <h2 style="margin-top:40px">Your details</h2>
      <form id="contact" class="contact-fields" novalidate>
        <div class="field"><label for="o-name">Name for the order</label><input id="o-name" name="name" autocomplete="name" required value="${i(n.name)}" /></div>
        <div class="form-row">
          <div class="field"><label for="o-phone">Mobile number</label><input id="o-phone" name="phone" type="tel" autocomplete="tel" required value="${i(n.phone)}" placeholder="We’ll text when it’s ready" /></div>
          <div class="field"><label for="o-email">Email for receipt</label><input id="o-email" name="email" type="email" autocomplete="email" value="${i(n.email)}" /></div>
        </div>
      </form>
      <div class="panel-foot">
        <button class="link-btn" data-go="menu">← Back to menu</button>
        <button class="btn btn-solid btn-lg" data-go="pay">Review order →</button>
      </div>
    </div>`}function ot(){const t=w(),e=[0,.1,.15,.2].map(s=>`<button class="tip ${a.tip===s?"on":""}" data-tip="${s}">${s?`${s*100}%`:"No tip"}</button>`).join("");return`
    <div class="panel">
      <h2>Review &amp; pay</h2>
      <div class="review">
        <div><span class="muted">Pickup</span><b>${$().name} · ${F()}</b><button class="link-btn" data-go="pickup">Edit</button></div>
        <div><span class="muted">Name</span><b>${i(a.contact.name)}</b><span class="muted">${i(a.contact.phone)}</span></div>
      </div>
      <h3 class="sub">Add a tip for the team</h3>
      <div class="tips">${e}</div>
      <h3 class="sub">Payment</h3>
      <div class="pay-box">
        <div class="wallets"><button class="wallet apple" type="button" disabled>Apple Pay</button><button class="wallet gpay" type="button" disabled>Google Pay</button></div>
        <div class="card-slot">
          <span class="lock" aria-hidden="true">🔒</span>
          <div><b>Secure card payment by Square</b><p class="muted">The Square card form loads here once payments are connected.</p></div>
        </div>
      </div>
      ${t.unpriced?'<p class="note-inline">Cleanse pricing is confirmed by the store before your first pickup.</p>':""}
      <div class="panel-foot">
        <button class="link-btn" data-go="pickup">← Back</button>
        <button class="btn btn-solid btn-lg" id="place">Place order · ${l(t.total)}</button>
      </div>
      <p class="preview-note">Preview only — no payment is taken and the order isn’t sent to the store yet.</p>
    </div>`}function it(){const t=a.lastOrder;return`
    <div class="panel done">
      <div class="check" aria-hidden="true"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="M15 27l7 7 15-15"/></svg></div>
      <p class="eyebrow">Order #${t.number}</p>
      <h2>Thank you, ${i(t.name.split(" ")[0])}!</h2>
      <p class="lede">We’re pressing and blending your order now. We’ll text you when it’s ready.</p>
      <div class="review">
        <div><span class="muted">Pickup</span><b>${t.store} · ${t.when}</b></div>
        <div><span class="muted">Where</span><b>${i(t.address)}</b></div>
        <div><span class="muted">Total</span><b>${l(t.total)}</b></div>
      </div>
      <p class="muted">Bring back your rinsed glass next time for credit toward your order.</p>
      <div class="panel-foot" style="justify-content:center"><button class="btn btn-solid btn-lg" data-new>Start a new order</button></div>
    </div>`}function M(){const t=w(),e=a.cart.map((n,o)=>`
      <li class="line">
        <span class="line-dot" style="--c:${n.color}"></span>
        <div class="line-main">
          <b>${i(n.name)}</b>
          ${n.opts.length?`<span class="muted">${n.opts.map(i).join(", ")}</span>`:""}
          ${n.note?`<span class="muted">“${i(n.note)}”</span>`:""}
          <div class="qty">
            <button data-qty="${o}" data-d="-1" aria-label="Remove one ${i(n.name)}">−</button>
            <span>${n.qty}</span>
            <button data-qty="${o}" data-d="1" aria-label="Add one ${i(n.name)}">+</button>
          </div>
        </div>
        <span class="line-price">${n.price==null?"—":l(B(n))}</span>
      </li>`).join(""),s=a.step!=="done";y.innerHTML=`
    <div class="cart-inner">
      <div class="cart-head"><h2>Your order</h2>${a.store?`<span class="muted">${$().name} pickup</span>`:""}<button class="cart-close" aria-label="Close order">×</button></div>
      ${a.cart.length&&s?`<ul class="lines">${e}</ul>
        <dl class="sums">
          <div><dt>Subtotal</dt><dd>${l(t.subtotal)}</dd></div>
          ${t.deposit?`<div><dt>Glass deposit <small>(refundable)</small></dt><dd>${l(t.deposit)}</dd></div>`:""}
          ${a.step==="pay"?`<div><dt>Tip</dt><dd>${l(t.tip)}</dd></div>`:""}
          <div><dt>Tax</dt><dd class="muted">At payment</dd></div>
          <div class="grand"><dt>Total</dt><dd>${l(a.step==="pay"?t.total:t.subtotal+t.deposit)}</dd></div>
        </dl>
        ${a.step==="menu"?'<button class="btn btn-solid btn-lg cart-cta" data-go="pickup">Checkout →</button>':""}`:`<div class="cart-empty"><p>${a.step==="done"?"Order placed!":"Your order is empty."}</p>${a.step==="store"?'<p class="muted">Choose a store to start.</p>':a.step==="done"?"":'<p class="muted">Tap any item to add it.</p>'}</div>`}
    </div>`,f.hidden=!t.count||a.step==="done",f.innerHTML=`<span class="bar-count">${t.count}</span><span>View order</span><b>${l(a.step==="pay"?t.total:t.subtotal+t.deposit)}</b>`}const r=c("#sheet"),m=c("#sheet-backdrop");let u=null,v=null;function dt(t){const e=O.find(d=>d.id===t),s=e.upgrades?[...Q[e.cat]||[],...X]:[];u={item:e,qty:1,opts:new Set,days:3,note:""};const n=s.map(d=>`<label class="opt"><input type="checkbox" value="${i(d.name)}" data-price="${d.price}" /><span>${i(d.name)}</span><em>+${l(d.price)}</em></label>`).join(""),o=e.cat==="cleanse";if(r.innerHTML=`
    <button class="sheet-close" aria-label="Close">×</button>
    <div class="sheet-hero" style="--c:${e.color}">${R(e,!0)}</div>
    <div class="sheet-body">
      <h2 id="sheet-title">${i(e.name)}</h2>
      <p class="muted">${i(e.ing)}</p>
      ${e.glass?`<p class="note-inline">Served in returnable glass · +${l(N)} refundable deposit</p>`:""}
      ${o?`
        <h3 class="sub">How many days?</h3>
        <div class="tips" data-days>${[1,3,5].map(d=>`<button class="tip ${d===3?"on":""}" data-day="${d}">${d} day${d>1?"s":""}</button>`).join("")}</div>
        <div class="field" style="margin-top:16px"><label for="start">Start date</label><input id="start" type="date" /></div>
        <p class="note-inline">Book at least 24 hours ahead. You’ll pick up fresh each day.</p>`:""}
      ${n?`<h3 class="sub">Boost it <span class="muted">(optional)</span></h3><div class="opts">${n}</div>`:""}
      <div class="field" style="margin-top:20px"><label for="note">Special instructions</label><input id="note" placeholder="Allergies, less ice, extra toppings…" /></div>
    </div>
    <div class="sheet-foot">
      <div class="qty big"><button data-sq="-1" aria-label="Fewer">−</button><span id="sq">1</span><button data-sq="1" aria-label="More">+</button></div>
      <button class="btn btn-solid btn-lg" id="add">Add to order · <span id="sheet-price"></span></button>
    </div>`,o){const d=new Date(Date.now()+1296e5),p=c("#start",r);p.min=p.value=d.toISOString().slice(0,10)}A(),v=document.activeElement,r.hidden=m.hidden=!1,document.body.classList.add("sheet-open"),requestAnimationFrame(()=>{r.classList.add("open"),m.classList.add("open"),c(".sheet-close",r).focus()})}function I(){const{item:t}=u;if(t.price==null)return null;let e=t.price;return r.querySelectorAll(".opt input:checked").forEach(s=>e+=Number(s.dataset.price)),e}function A(){const t=I();c("#sheet-price",r).textContent=t==null?"priced by store":l(t*u.qty),c("#sq",r).textContent=u.qty}function q(){var t;r.classList.remove("open"),m.classList.remove("open"),document.body.classList.remove("sheet-open"),setTimeout(()=>{r.hidden=m.hidden=!0},350),(t=v==null?void 0:v.focus)==null||t.call(v)}function rt(){const{item:t,qty:e}=u,s=[...r.querySelectorAll(".opt input:checked")].map(p=>p.value);t.cat==="cleanse"&&s.unshift(`${u.days}-day`,`starts ${c("#start",r).value}`);const n=c("#note",r).value.trim(),o=`${t.id}|${s.join(",")}|${n}`,d=a.cart.find(p=>p.key===o);d?d.qty+=e:a.cart.push({key:o,id:t.id,name:t.name,price:I(),qty:e,opts:s,note:n,glass:!!t.glass,color:t.color}),ct(),q(),M(),k()}function ct(){var n;if(S)return;const t=(n=c(".sheet-hero .visual",r))==null?void 0:n.getBoundingClientRect(),e=(f.hidden?c(".cart-head",y):f).getBoundingClientRect();if(!t)return;const s=document.createElement("div");s.className="fly",s.style.background=u.item.color,s.style.left=`${t.left+t.width/2}px`,s.style.top=`${t.top+t.height/2}px`,document.body.appendChild(s),g.to(s,{left:e.left+e.width/2,top:e.top+e.height/2,scale:.4,duration:.7,ease:"power2.in",onComplete:()=>{s.remove(),g.fromTo(f.hidden?y:f,{scale:1.04},{scale:1,duration:.4,ease:"elastic.out(1,0.4)"})}})}async function lt(t){return await new Promise(e=>setTimeout(e,900)),{...t,number:String(Math.floor(1e3+Math.random()*9e3))}}async function pt(t){t.disabled=!0,t.innerHTML='<span class="spinner"></span> Placing order…';const e=w(),s=$(),n=await lt({name:a.contact.name,store:s.name,address:`${s.street}, ${s.city}`,when:F(),total:e.total,lines:a.cart});a.lastOrder=n,a.cart=[],G("done"),S||ut()}function ut(){const t=["#F1582A","#FFB547","#9DB83A","#2E8FD0","#8E1F3F"];for(let e=0;e<40;e++){const s=document.createElement("i");s.className="drop",s.style.background=t[e%t.length],s.style.left=`${50+(Math.random()-.5)*20}vw`,document.body.appendChild(s),g.fromTo(s,{top:"45vh",scale:Math.random()*.8+.4},{x:(Math.random()-.5)*innerWidth*.8,y:-Math.random()*innerHeight*.5-60,rotation:Math.random()*360,duration:.9+Math.random()*.6,ease:"power2.out",onComplete:()=>g.to(s,{y:"+="+innerHeight,opacity:0,duration:1.4,ease:"power1.in",onComplete:()=>s.remove()})})}}function G(t){if(t==="pay"&&a.step==="pickup"&&!c("#contact").reportValidity())return;(t==="pickup"||t==="pay")&&!a.cart.length&&(t="menu"),a.step=t,h(),L();const e=c(".stepper").getBoundingClientRect().top+scrollY-100;scrollY>e&&scrollTo({top:e,behavior:S?"auto":"smooth"})}const mt=()=>{y.classList.add("open"),m.hidden=!1,requestAnimationFrame(()=>m.classList.add("open")),document.body.classList.add("sheet-open")};function L(){y.classList.contains("open")&&(y.classList.remove("open"),r.hidden&&(m.classList.remove("open"),document.body.classList.remove("sheet-open"),setTimeout(()=>m.hidden=!0,350)))}document.addEventListener("click",t=>{const e=t.target.closest("button, [data-go]");if(e){if(e.dataset.store){a.store=e.dataset.store,h();return}if(e.dataset.go){G(e.dataset.go);return}if(e.dataset.cat){a.cat=e.dataset.cat,h();return}if(e.dataset.item){dt(e.dataset.item);return}if(e.dataset.qty){const s=a.cart[Number(e.dataset.qty)];s.qty+=Number(e.dataset.d),s.qty<=0&&a.cart.splice(Number(e.dataset.qty),1),!a.cart.length&&(a.step==="pickup"||a.step==="pay")?(a.step="menu",h()):(M(),a.step==="pay"&&(C.querySelector("#place").textContent=`Place order · ${l(w().total)}`)),k();return}if(e.dataset.tip){a.tip=Number(e.dataset.tip),h();return}if(e.dataset.day){u.days=Number(e.dataset.day),e.parentElement.querySelectorAll(".tip").forEach(s=>s.classList.toggle("on",s===e));return}if(e.dataset.sq){u.qty=Math.max(1,u.qty+Number(e.dataset.sq)),A();return}if(e.id==="add"){rt();return}if(e.id==="place"){pt(e);return}if(e.matches(".sheet-close")){q();return}if(e.matches(".cart-close")){L();return}if(e.id==="cart-bar"){mt();return}e.hasAttribute("data-new")&&(a.step="menu",h())}});m.addEventListener("click",()=>{r.hidden||q(),L()});addEventListener("keydown",t=>{t.key==="Escape"&&(r.hidden?L():q())});document.addEventListener("input",t=>{const e=t.target.form;(e==null?void 0:e.id)==="contact"&&(a.contact[t.target.name]=t.target.value.trim(),k())});document.addEventListener("change",t=>{t.target.name==="when"&&(a.pickup.mode=t.target.value,h()),t.target.id==="slot"&&(a.pickup.slot=Number(t.target.value),k()),t.target.closest(".opt")&&A()});h();
