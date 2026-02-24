package com.logistalia.logis_y.model;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Almacen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String ubicacion;
    private Integer capacidadTotal;
    private String descripcion;

    @OneToMany(mappedBy = "almacen", cascade = CascadeType.ALL)
    private List<Espacio> espacios;
}
