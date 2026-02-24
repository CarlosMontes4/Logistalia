package com.logistalia.logis_y.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CrearEspacioDTO {
    private int capacidad;
    private LocalDate fechaOcupacion;
    private LocalDate fechaDesocupacion;
    private Long almacenId;
    private Long solicitudId;
    private Boolean disponible;
}
