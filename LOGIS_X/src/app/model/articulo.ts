export interface Articulo {
  nombreArticulo: string;
  descripcion: string;
  cantidad: number;
  solicitudId?: number; // Relación opcional con la solicitud
}
