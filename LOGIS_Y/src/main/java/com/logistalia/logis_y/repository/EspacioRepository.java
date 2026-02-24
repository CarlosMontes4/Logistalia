package com.logistalia.logis_y.repository;

import com.logistalia.logis_y.model.Espacio;
import com.logistalia.logis_y.model.Solicitud;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EspacioRepository extends JpaRepository<Espacio, Long> {
    List<Espacio> findByAlmacenId(Long almacenId);
    @Query("SELECT e FROM Espacio e WHERE e.almacen.id = :almacenId " +
            "AND e.fechaOcupacion <= :fechaDesocupacion " +
            "AND e.fechaDesocupacion >= :fechaOcupacion")
    List<Espacio> findByAlmacenIdAndFechasSuperpuestas(
            @Param("almacenId") Long almacenId,
            @Param("fechaOcupacion") LocalDate fechaOcupacion,
            @Param("fechaDesocupacion") LocalDate fechaDesocupacion
    );

    List<Espacio> findBySolicitud( Solicitud solicitud );

}
