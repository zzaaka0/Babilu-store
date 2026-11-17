(async function(){
  const grid=document.getElementById('productGrid');
  const search=document.getElementById('productSearch');
  const filters=[...document.querySelectorAll('.filter')];
  let products=[];let active='Todos';
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function render(){
    const q=search.value.trim().toLocaleLowerCase('es');
    const list=products.filter(p=>(active==='Todos'||p.category===active)&&(!q||(p.name+' '+p.category+' '+p.description).toLocaleLowerCase('es').includes(q)));
    grid.innerHTML=list.length?list.map((p,i)=>`<article class="product-card"><div class="product-visual" style="--tone:${esc(p.tone)}"><span class="product-index">B / ${String(i+1).padStart(2,'0')}</span><span class="product-status">PRÓXIMAMENTE</span><span class="product-symbol" aria-hidden="true">${esc(p.symbol)}</span></div><div class="product-info"><p class="product-category">${esc(p.category)}</p><h3>${esc(p.name)}</h3><p class="product-description">${esc(p.description)}</p><div class="product-bottom"><span>En preparación</span><b>—</b></div></div></article>`).join(''):'<p class="empty-state">No encontramos productos con esa búsqueda.</p>';
  }
  try{const r=await fetch('./data/products.json');if(!r.ok)throw new Error('catalog');const data=await r.json();products=data.products||[];render();}catch(e){grid.innerHTML='<p class="empty-state">Estamos preparando el catálogo. Vuelve pronto.</p>';}
  filters.forEach(btn=>btn.addEventListener('click',()=>{active=btn.dataset.filter;filters.forEach(b=>b.classList.toggle('active',b===btn));render();}));
  search.addEventListener('input',render);
  window.babiluFilter=category=>{active=category;filters.forEach(b=>b.classList.toggle('active',b.dataset.filter===category));render();};
})();
