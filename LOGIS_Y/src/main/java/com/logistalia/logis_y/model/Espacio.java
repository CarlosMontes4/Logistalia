package com.logistalia.logis_y.model;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class Espacio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer capacidad;
    private Boolean disponible;
    private LocalDate fechaOcupacion;
    private LocalDate fechaDesocupacion;

    @ManyToOne
    @JoinColumn(name = "almacen_id",nullable = false)
    private Almacen almacen;
    @ManyToOne
    @JoinColumn(name = "solicitud_id")
    private Solicitud solicitud;
}