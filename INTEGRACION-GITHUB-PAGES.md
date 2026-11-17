# Integración en GitHub Pages

1. Haz una copia/descarga del repositorio actual antes de tocarlo.
2. Descomprime este ZIP y sube las carpetas `data/`, `js/` y `docs/` a la raíz del repositorio.
3. No sustituyas tu `index.html` actual todavía. La web publicada muestra un catálogo de prueba y carrito local, pero el proceso de pago está desactivado.
4. En el HTML de la tienda, añade un contenedor donde deban aparecer los productos:

```html
<section id="babilu-products" aria-live="polite"></section>
```

5. En un módulo JavaScript, importa y ejecuta el renderizador:

```html
<script type="module">
  import { cargarCatalogoBabilu } from './js/babilu-catalogo.js';
  cargarCatalogoBabilu();
</script>
```

6. Mientras ningún producto tenga `status: "active"`, el catálogo mostrará el mensaje de próximos productos. Para activar una ficha hay que completar SKU, coste, precio, stock, envío, imagen autorizada y documentación; además el script exige precio, stock y SKU.
7. Prueba primero en una rama de GitHub y revisa la web en móvil y ordenador.

## Cobros y pedidos

GitHub Pages solo aloja archivos estáticos. No guardes claves secretas, claves privadas ni datos de tarjetas en JavaScript. Puedes valorar enlaces de pago alojados (por ejemplo, Stripe Payment Links o PayPal) cuando tengas la cuenta aprobada y hayas definido el flujo de pedidos; cada pago genera comisiones y tendrás que gestionar manualmente el pedido al proveedor si no existe integración/API. Para automatizar inventario, pedidos y webhooks necesitarás un backend o una plataforma ecommerce compatible.

No aceptes pagos hasta mostrar identidad del vendedor, contacto, precio total, impuestos, gastos y plazos de envío, política de devoluciones y garantía, privacidad y condiciones de compra.
