# BABILU v2 — kit de lanzamiento dropshipping

Este paquete está preparado para integrarse en el repositorio GitHub Pages de BABILU, pero **no reemplaza automáticamente la web actual**: no se ha proporcionado el código fuente del repositorio y no sería seguro sobrescribir `index.html` a ciegas.

## Qué incluye

- `data/catalogo-borrador.json`: 20 ideas de productos en cuatro departamentos. Todas están en borrador y ocultas hasta confirmar proveedor, SKU, coste, PVP, stock, envío, imágenes autorizadas y documentación.
- `data/proveedores.csv`: proveedores potenciales y qué verificar con cada uno.
- `data/plantilla-feed-proveedor.csv`: estructura para importar el feed real del mayorista.
- `js/babilu-catalogo.js`: módulo pequeño que carga el JSON y muestra solo productos aprobados (`status: "active"`). No procesa pagos ni pedidos.
- `js/calcular-margen.js`: calculadora de margen estimado.
- `docs/INTEGRACION-GITHUB-PAGES.md`: instrucciones de integración.
- `docs/EMAIL-PROVEEDORES.md`: mensaje para solicitar alta y condiciones.
- `docs/ANTES-DE-ACEPTAR-PEDIDOS.md`: checklist comercial, legal y técnico.

## Importante sobre empezar con 0 €

No comprar stock por adelantado no significa que el negocio no necesite dinero. Cuando entre una venta, normalmente tendrás que pagar al proveedor y el envío antes de recibir la liquidación del procesador de pagos. También existen comisiones de pago, devoluciones, impuestos y posibles gastos de alta o actividad. Comprueba que puedes adelantar el coste de cada pedido antes de aceptar pagos.

## Estado actual

La web pública consultada aún muestra productos de demostración y avisa de que los pagos y pedidos reales no están conectados. No anuncies que ya se puede comprar hasta configurar pagos, entrega, devoluciones, contacto y obligaciones legales.
