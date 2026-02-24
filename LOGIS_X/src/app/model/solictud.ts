import { Almacen } from "./almacen";
import { Articulo } from "./articulo";

export interface CrearSolicitudDTO {
  correoCliente: string;
  tipoMercancia: string;
  volumen: number;
  fechaIngreso: Date;
  fechaRetiro: Date;
}

export interface SolicitudResponseDTO {
  id: number;
  tipoMercancia: string;
  volumen: number;
  fechaIngreso: Date;
  fechaRetiro: Date;
  estado: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';
  usuarioId: number;
  articulos: Articulo[];
  almacen: Almacen;
}
