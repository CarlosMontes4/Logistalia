export interface Espacio {
  id: number;
  capacidad: number;
  fechaOcupacion: Date;
  fechaDesocupacion: Date;
  disponible: boolean;
  almacenId: number;
  solicitudId: number;
}

export interface CrearEspacio {
  capacidad: number;
  fechaOcupacion?: Date;
  fechaDesocupacion?: Date;
  almacenId: number;
  solicitudId: number;
  disponible: boolean;
}
