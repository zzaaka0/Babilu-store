/**
 * Estimación sencilla. Introduce importes en euros.
 * No sustituye el cálculo fiscal/contable: confirma IVA, régimen y comisiones reales.
 */
export function calcularMargen({ pvpConIva, costeProveedor, envioProveedor, comisionPago = 0, otrosCostes = 0, ivaVenta = 0.21 }) {
  const baseVenta = pvpConIva / (1 + ivaVenta);
  const costeTotal = costeProveedor + envioProveedor + comisionPago + otrosCostes;
  const beneficioEstimado = baseVenta - costeTotal;
  return {
    baseVenta: Number(baseVenta.toFixed(2)),
    costeTotal: Number(costeTotal.toFixed(2)),
    beneficioEstimado: Number(beneficioEstimado.toFixed(2)),
    margenSobreBase: baseVenta > 0 ? Number((beneficioEstimado / baseVenta * 100).toFixed(1)) : 0
  };
}
