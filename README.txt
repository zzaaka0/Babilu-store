BABILU — INICIO DE SESIÓN Y CUENTAS DE CLIENTE
==============================================

IMPORTANTE
- GitHub Pages solo publica archivos estáticos. Para cuentas reales usamos Supabase.
- Esta carpeta añade registro, inicio de sesión, confirmación por correo, recuperación de contraseña, cierre de sesión y lectura del historial de pedidos.
- El historial queda vacío hasta que exista un sistema de pago/backend que registre pedidos verificados.
- No hay pagos reales en este paquete. No marques un pedido como pagado desde el navegador.

1) CREA EL PROYECTO SUPABASE
   https://supabase.com/dashboard
   Crea un proyecto y guarda la contraseña de la base de datos en un lugar seguro.

2) CONFIGURA LA BASE DE DATOS
   En Supabase abre SQL Editor > New query.
   Copia y ejecuta todo el contenido de supabase-schema.sql.

3) CONFIGURA EL ACCESO POR CORREO
   En Supabase > Authentication > URL Configuration:
   Site URL:
   https://zzaaka0.github.io/Babilu-store/
   Añade también esa misma URL a Redirect URLs.
   En Authentication > Providers, deja Email activado.

4) PEGA LOS DATOS PÚBLICOS
   En Supabase > Project Settings > API (o Connect), copia Project URL y la clave publishable/anon.
   Abre supabase-config.js y sustituye los dos textos PEGA_AQUI...
   SOLO usa la clave publishable/anon. NUNCA uses service_role ni una clave secreta en GitHub.

5) SUBE LOS ARCHIVOS A GITHUB
   En el repositorio zzaaka0/Babilu-store, sube a la raíz:
   - babilu-auth.js
   - babilu-auth.css
   - supabase-config.js

6) CONECTA EL SISTEMA A TU INDEX.HTML
   Dentro de <head>, antes de </head>, añade:
   <link rel="stylesheet" href="./babilu-auth.css">

   Justo antes de </body>, después de los scripts que ya tiene la tienda, añade:
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   <script src="./supabase-config.js"></script>
   <script src="./babilu-auth.js"></script>

   El botón “Mi cuenta” aparecerá automáticamente junto al carrito.

7) PRUEBA
   Abre https://zzaaka0.github.io/Babilu-store/
   Prueba crear una cuenta con un correo tuyo, confirma el email y vuelve a iniciar sesión.
   Comprueba también recuperación de contraseña.

SEGURIDAD Y LÍMITES
- Las contraseñas las gestiona Supabase Auth; BABILU no las almacena.
- Las políticas RLS impiden que un usuario consulte los pedidos de otro.
- No subas nunca claves secretas al repositorio.
- El paquete no crea pedidos ni procesa cobros. Para cobrar y registrar pedidos hace falta integrar Stripe (o proveedor equivalente) con un backend/función segura que confirme el pago.
