package com.logistalia.logis_y.dto;

import lombok.Data;

@Data
public class ArticuloDTO {
    private Long id;
    private String nombreArticulo;
    private String descripcion;
    private Long cantidad;
    private Long solicitudId;
}
