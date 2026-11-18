(function(){
  const url=window.BABILU_SUPABASE_URL;
  const key=window.BABILU_SUPABASE_ANON_KEY;
  const clientLib=window.supabase;
  const nav=document.querySelector('.navright')||document.querySelector('header .nav');
  if(!nav){console.warn('BABILU Auth: no se encontró la navegación.');return;}
  const accountBtn=document.createElement('button');
  accountBtn.className='pill';accountBtn.id='babiluAccountBtn';accountBtn.type='button';accountBtn.textContent='👤 Mi cuenta';
  nav.appendChild(accountBtn);
  const overlay=document.createElement('div');overlay.id='babiluAuthOverlay';
  overlay.innerHTML=`<section id="babiluAuthPanel" role="dialog" aria-modal="true" aria-labelledby="baTitle"><div class="ba-head"><h2 id="baTitle">Tu cuenta BABILU</h2><button class="ba-close" type="button" id="baClose">Cerrar ✕</button></div><div id="baContent"><p class="ba-muted">Cargando cuenta…</p></div><div id="baMessage" class="ba-message" role="status"></div></section>`;
  document.body.appendChild(overlay);
  const content=overlay.querySelector('#baContent'),message=overlay.querySelector('#baMessage');
  let authClient=null,mode='login';
  function say(text){message.textContent=text;message.classList.add('show');}
  function clearMessage(){message.textContent='';message.classList.remove('show');}
  function open(){overlay.classList.add('open');clearMessage();}
  function close(){overlay.classList.remove('open');}
  overlay.querySelector('#baClose').addEventListener('click',close);
  overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
  accountBtn.addEventListener('click',()=>{open();render();});
  function unavailable(){content.innerHTML='<p class="ba-muted">El acceso de clientes todavía no está configurado. Añade la URL y la clave pública de Supabase en <b>supabase-config.js</b>.</p>';}
  function loginView(){
    content.innerHTML=`<div class="ba-tabs"><button class="ba-tab ${mode==='login'?'active':''}" data-mode="login">Iniciar sesión</button><button class="ba-tab ${mode==='signup'?'active':''}" data-mode="signup">Crear cuenta</button></div>
    <form id="baForm"><label class="ba-field">Correo electrónico<input name="email" type="email" autocomplete="email" required maxlength="254" placeholder="tu@email.com"></label>
    <label class="ba-field">Contraseña<input name="password" type="password" autocomplete="${mode==='login'?'current-password':'new-password'}" required minlength="8" placeholder="Mínimo 8 caracteres"></label>
    ${mode==='signup'?'<label class="ba-field">Nombre<input name="name" type="text" autocomplete="name" maxlength="80" placeholder="Tu nombre"></label>':''}
    <button class="ba-primary" type="submit">${mode==='login'?'Entrar en mi cuenta':'Crear mi cuenta'}</button></form>
    ${mode==='login'?'<button class="ba-link" id="baForgot" type="button">¿Has olvidado tu contraseña?</button>':''}
    <p class="ba-muted">Tus credenciales se gestionan de forma segura mediante Supabase. No compartas tu contraseña.</p>`;
    content.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.mode;clearMessage();loginView();}));
    content.querySelector('#baForm').addEventListener('submit',submitAuth);
    const forgot=content.querySelector('#baForgot');if(forgot)forgot.addEventListener('click',resetPassword);
  }
  async function submitAuth(e){
    e.preventDefault();clearMessage();const form=new FormData(e.currentTarget);const email=String(form.get('email')||'').trim();const password=String(form.get('password')||'');const submit=e.currentTarget.querySelector('button[type=submit]');submit.disabled=true;
    try{
      if(mode==='signup'){
        const {data,error}=await authClient.auth.signUp({email,password,options:{data:{full_name:String(form.get('name')||'').trim()},emailRedirectTo:location.origin+location.pathname}});if(error)throw error;
        if(data.session){say('Cuenta creada correctamente.');render();}else say('Te hemos enviado un correo para confirmar tu cuenta. Revisa también spam.');
      }else{const {error}=await authClient.auth.signInWithPassword({email,password});if(error)throw error;say('¡Has iniciado sesión!');render();}
    }catch(err){say(err.message||'No se pudo completar el acceso.');}finally{submit.disabled=false;}
  }
  async function resetPassword(){
    const email=content.querySelector('input[name=email]')?.value.trim();if(!email){say('Escribe primero tu correo electrónico.');return;}
    try{const {error}=await authClient.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname});if(error)throw error;say('Si el correo está registrado, recibirás un enlace para cambiar la contraseña.');}catch(err){say(err.message||'No se pudo enviar el correo.');}
  }
  async function profileView(user){
    const name=user.user_metadata?.full_name||'Cliente BABILU';
    content.innerHTML=`<div class="ba-profile"><p class="ba-muted">SESIÓN INICIADA</p><strong>${escapeHtml(name)}</strong><span class="ba-muted">${escapeHtml(user.email||'')}</span></div><h3 style="margin:20px 0 8px">Mis pedidos</h3><div id="baOrders"><p class="ba-muted">Cargando historial…</p></div><button class="ba-danger" id="baLogout" type="button">Cerrar sesión</button>`;
    content.querySelector('#baLogout').addEventListener('click',async()=>{const {error}=await authClient.auth.signOut();if(error)say(error.message);else{mode='login';render();accountBtn.textContent='👤 Mi cuenta';say('Has cerrado sesión.');}});
    const orders=content.querySelector('#baOrders');
    try{
      const {data,error}=await authClient.from('orders').select('id,status,total,currency,created_at').order('created_at',{ascending:false}).limit(20);
      if(error)throw error;
      orders.innerHTML=data?.length?data.map(o=>`<div class="ba-order"><span>Pedido #${escapeHtml(String(o.id).slice(0,8))}<br><span class="ba-muted">${new Date(o.created_at).toLocaleDateString('es-ES')} · ${escapeHtml(o.status)}</span></span><b>${Number(o.total).toLocaleString('es-ES',{style:'currency',currency:o.currency||'EUR'})}</b></div>`).join(''):'<p class="ba-muted">Todavía no tienes pedidos. Cuando completes una compra, aparecerá aquí.</p>';
    }catch(err){orders.innerHTML='<p class="ba-muted">El historial estará disponible cuando se configure la tabla de pedidos en Supabase.</p>';console.warn('BABILU orders:',err.message);}
  }
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  async function render(){
    if(!authClient){unavailable();return;}
    const {data:{session}}=await authClient.auth.getSession();
    if(session?.user){accountBtn.textContent='👤 Mi cuenta';await profileView(session.user);}else{accountBtn.textContent='👤 Iniciar sesión';loginView();}
  }
  if(!url||!key||url.includes('PEGA_AQUI')||key.includes('PEGA_AQUI')||!clientLib?.createClient){unavailable();return;}
  authClient=clientLib.createClient(url,key);
  authClient.auth.onAuthStateChange((_event,session)=>{accountBtn.textContent=session?.user?'👤 Mi cuenta':'👤 Iniciar sesión';if(overlay.classList.contains('open'))setTimeout(render,0);});
  render();
})();
