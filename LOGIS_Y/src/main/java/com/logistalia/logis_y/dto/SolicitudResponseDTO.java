package com.logistalia.logis_y.dto;

import com.logistalia.logis_y.model.Espacio;
import com.logistalia.logis_y.model.EstadoSolicitud;
import com.logistalia.logis_y.model.Usuario;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class SolicitudResponseDTO {
    private Long id;
    private String tipoMercancia;
    private Integer volumen;
    private LocalDate fechaIngreso;
    private LocalDate fechaRetiro;
    private EstadoSolicitud estado; // PENDIENTE, APROBADA, RECHAZADA
    private Long usuarioId;
    private List<ArticuloDTO> articulos;
    private AlmacenDTO almacen;
}
