package com.logistalia.logis_y.repository;


import com.logistalia.logis_y.model.EstadoSolicitud;
import com.logistalia.logis_y.model.Solicitud;
import com.logistalia.logis_y.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud, Long> {

    @Query("SELECT s FROM Solicitud s WHERE s.usuario = :usuario")
    List<Solicitud> findByUsuario(Usuario usuario);

    List<Solicitud> findByEstado(EstadoSolicitud estado);

}
