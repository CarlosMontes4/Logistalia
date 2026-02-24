package com.logistalia.logis_y.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class EspacioDTO {
    private Long id;
    private int capacidad;
    private LocalDate fechaOcupacion;
    private LocalDate fechaDesocupacion;
    private boolean disponible;
    private Long almacenId;
    private Long solicitudId;
}
