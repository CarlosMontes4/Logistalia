package com.logistalia.logis_y.model;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Solicitud {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tipoMercancia;
    private Integer volumen;
    private LocalDate fechaIngreso;
    private LocalDate fechaRetiro;

    @Enumerated(EnumType.STRING)
    private EstadoSolicitud estado; // PENDIENTE, APROBADA, RECHAZADA

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @OneToMany(mappedBy = "solicitud", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Articulo> articulos = new ArrayList<>();
}
