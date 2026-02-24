package com.logistalia.logis_y.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Articulo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_articulo", nullable = false)
    private String nombreArticulo;

    @Column(nullable = false)
    private Long cantidad;

    @Column(nullable = false)
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "solicitud_id")
    private Solicitud solicitud;
}