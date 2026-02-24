package com.logistalia.logis_y.repository;

import com.logistalia.logis_y.model.Articulo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ArticuloRepository extends JpaRepository<Articulo, Long> {
    List<Articulo> findBySolicitudId(Long solicitudId);
}
