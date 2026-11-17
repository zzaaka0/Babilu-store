# BABILU — nueva tienda visual (v3)

Esta versión sustituye el diseño de demostración por una portada responsive de estilo editorial/minimalista: fondo marfil, tipografía moderna, acento naranja, categorías, buscador y catálogo filtrable.

## Publicar en GitHub Pages

1. Descarga una copia de seguridad de tu repositorio actual.
2. Descomprime este ZIP.
3. Sube **el contenido de esta carpeta** a la raíz del repositorio `Babilu-store` (deben quedar `index.html`, `assets/` y `data/` directamente en la raíz; no dejes una carpeta `babilu_v3` dentro).
4. Sustituye el `index.html` anterior y añade/sustituye `assets/` y `data/`.
5. En GitHub pulsa **Commit changes**.
6. En Settings → Pages, confirma que publica desde la rama y carpeta correctas (normalmente `main` y `/ (root)`).
7. Espera a que termine el despliegue en Actions y abre la web en una ventana privada o fuerza recarga.

## Estado comercial: catálogo no vendible todavía

Las 20 fichas son propuestas, no productos comprables ni ofertas confirmadas. Se muestran como “Próximamente” y no hay precios ni botón de compra. Antes de activar ventas, completa proveedor aprobado, SKU, coste total, PVP, stock sincronizado, envío, imagen autorizada, garantía y documentación aplicable. Configura también pagos, impuestos, devoluciones, privacidad, condiciones de compra y un proceso seguro de pedidos.

GitHub Pages es alojamiento estático: no guarda pedidos ni secretos y no integra por sí solo el dropshipping o los pagos. No introduzcas claves privadas en el repositorio.

## Personalización

- Productos: `data/products.json`
- Estilos: `assets/styles.css`
- Renderizado del catálogo: `assets/catalog.js`
