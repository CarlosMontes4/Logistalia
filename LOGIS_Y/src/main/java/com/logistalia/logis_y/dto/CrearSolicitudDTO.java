package com.logistalia.logis_y.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CrearSolicitudDTO {
    private String correoCliente;
    private String tipoMercancia;
    private int volumen;
    private LocalDate fechaIngreso;
    private LocalDate fechaRetiro;
}
