// Basic interactions: theme toggle, nav active link and downloads search
(function(){
  // Theme toggle
  const tbtn = document.querySelectorAll('.theme-toggle');
  tbtn.forEach(b=>{
    b.addEventListener('click', ()=>{
      document.documentElement.classList.toggle('light-theme');
    });
  });

  // Highlight nav link based on location
  const links = document.querySelectorAll('.nav-link');
  links.forEach(a => {
    if(location.pathname.endsWith(a.getAttribute('href'))) {
      links.forEach(x=>x.classList.remove('active'));
      a.classList.add('active');
    }
  });

  // Download search filter
  const search = document.getElementById('searchInput');
  if(search){
    const grid = document.getElementById('downloadGrid');
    search.addEventListener('input', ()=>{
      const q = search.value.toLowerCase();
      const cards = grid.querySelectorAll('.download-card');
      cards.forEach(card=>{
        const t = (card.textContent || '').toLowerCase();
        card.style.display = t.indexOf(q) >= 0 ? 'block' : 'none';
      });
    });
  }
})();
