package com.logistalia.logis_y.dto;

import lombok.Data;

@Data
public class AlmacenDTO {
    public Long id;
    public String nombre;
    public String ubicacion;
    public Integer capacidadTotal;
    public String descripcion;
}