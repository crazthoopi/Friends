// Neon particle generator for the header
(function(){
  const container = document.querySelector('.neon-particles');
  if(!container) return;

  const colors = ['#7c5cff','#00d4ff','#ff5b8a','#7cefff'];

  function spawn(){
    const p = document.createElement('span');
    p.className = 'particle';
    const size = Math.random() * 10 + 6; // 6-16px
    p.style.width = p.style.height = size + 'px';
    p.style.left = (Math.random() * 100) + '%';
    p.style.top = (60 + Math.random() * 20) + '%'; // start near bottom of header
    p.style.background = colors[Math.floor(Math.random()*colors.length)];
    p.style.animation = `floatUp ${4 + Math.random()*3}s linear forwards`;
    p.style.opacity = Math.random() * 0.6 + 0.4;
    p.style.filter = `blur(${Math.random()*6 + 4}px)`;
    container.appendChild(p);

    p.addEventListener('animationend', ()=> container.removeChild(p));
  }

  // spawn bursts sometimes, and a gentle steady stream
  setInterval(()=> spawn(), 400);
  setInterval(()=>{
    for(let i=0;i<3;i++) setTimeout(spawn, i*120);
  }, 2800);
})();

// Share / copy link helpers
(function(){
  function copyText(text){
    if(navigator.clipboard && navigator.clipboard.writeText){
      return navigator.clipboard.writeText(text);
    }
    // fallback
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try{ document.execCommand('copy'); }catch(e){}
    ta.remove();
    return Promise.resolve();
  }

  function flash(button, msg='Copied'){
    const orig = button.textContent;
    button.textContent = msg;
    setTimeout(()=> button.textContent = orig, 1800);
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    const pageLinkInput = document.getElementById('pageLink');
    const copyBtn = document.getElementById('copyLinkBtn');
    const copyBtn2 = document.getElementById('copyLinkBtn2');
    const shareButtons = Array.from(document.querySelectorAll('.share-btn'));
    const currentUrl = window.location.href.split('#')[0];

    if(pageLinkInput) pageLinkInput.value = currentUrl;

    if(copyBtn){
      copyBtn.addEventListener('click', ()=>{
        copyText(currentUrl).then(()=> flash(copyBtn, 'Copied link'))
      })
    }
    if(copyBtn2){
      copyBtn2.addEventListener('click', ()=>{
        copyText(currentUrl).then(()=> flash(copyBtn2, 'Copied link'))
      })
    }

    shareButtons.forEach(btn => {
      btn.addEventListener('click', ()=>{
        const name = btn.dataset.name || 'a friend';
        const shareUrl = `${currentUrl}#${encodeURIComponent(name)}`;
        copyText(shareUrl).then(()=> flash(btn, 'Link copied'));
      })
    })

    // smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const href = a.getAttribute('href');
        if(href.length>1){
          e.preventDefault();
          const el = document.querySelector(href);
          if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
        }
      })
    })
  });
})();