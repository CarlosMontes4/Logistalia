package com.logistalia.logis_y.dto;

import lombok.Data;

@Data
public class CrearAlmacenDTO {
    public String nombre;
    public String ubicacion;
    public Integer capacidadTotal;
    public String descripcion;
}
