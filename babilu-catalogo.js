/**
 * BABILU: renderizador opcional de catálogo.
 * Requiere un contenedor HTML con id="babilu-products" y servir data/catalogo-borrador.json.
 * Solo muestra artículos con status="active", precio numérico y stock numérico > 0.
 * No implementa carrito, pagos, inventario en tiempo real ni envío de pedidos.
 */
export async function cargarCatalogoBabilu({ url = "./data/catalogo-borrador.json", containerId = "babilu-products" } = {}) {
  const root = document.getElementById(containerId);
  if (!root) throw new Error(`No existe #${containerId}`);
  root.textContent = "Cargando catálogo…";
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`No se pudo cargar el catálogo (${response.status})`);
    const catalog = await response.json();
    const active = (catalog.products || []).filter(p =>
      p.status === "active" && Number.isFinite(p.retail_price) &&
      Number.isFinite(p.stock) && p.stock > 0 && p.supplier_sku
    );
    root.replaceChildren();
    if (!active.length) {
      const note = document.createElement("p");
      note.textContent = "Estamos preparando los primeros productos de BABILU. Próximamente.";
      root.append(note);
      return;
    }
    for (const product of active) {
      const card = document.createElement("article");
      card.className = "babilu-product";
      if (product.image_url && /^https:\/\//i.test(product.image_url)) {
        const img = document.createElement("img");
        img.src = product.image_url;
        img.alt = product.name || "Producto BABILU";
        img.loading = "lazy";
        card.append(img);
      }
      const title = document.createElement("h3");
      title.textContent = product.name;
      const description = document.createElement("p");
      description.textContent = product.description || "";
      const price = document.createElement("p");
      price.textContent = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(product.retail_price);
      card.append(title, description, price);
      root.append(card);
    }
  } catch (error) {
    root.textContent = "No se ha podido cargar el catálogo. Inténtalo más tarde.";
    console.error("BABILU catálogo:", error);
  }
}
