package com.logistalia.logis_y.service;

import com.logistalia.logis_y.dto.AlmacenDTO;
import com.logistalia.logis_y.dto.CrearAlmacenDTO;
import com.logistalia.logis_y.exception.AlmacenException;
import com.logistalia.logis_y.model.Almacen;
import com.logistalia.logis_y.repository.AlmacenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlmacenService {

    @Autowired
    private AlmacenRepository almacenRepository;

    public AlmacenDTO crear(CrearAlmacenDTO dto) {
        Almacen almacen = new Almacen();
        almacen.setNombre(dto.nombre);
        almacen.setUbicacion(dto.ubicacion);
        almacen.setCapacidadTotal(dto.capacidadTotal);
        almacen.setDescripcion(dto.descripcion);
        almacenRepository.save(almacen);
        return toDTO(almacen);
    }

    public AlmacenDTO actualizar(Long id, CrearAlmacenDTO dto) throws AlmacenException {
        Almacen almacen = almacenRepository.findById(id)
                .orElseThrow(() -> new AlmacenException("Almacén no encontrado"));
        almacen.setNombre(dto.nombre);
        almacen.setUbicacion(dto.ubicacion);
        almacen.setCapacidadTotal(dto.capacidadTotal);
        almacen.setDescripcion(dto.descripcion);
        almacenRepository.save(almacen);
        return toDTO(almacen);
    }

    public void eliminar(Long id) {
        almacenRepository.deleteById(id);
    }

    public List<AlmacenDTO> listar() {
        return almacenRepository.findAll().stream().map(this::toDTO).toList();
    }

    public AlmacenDTO obtenerPorId(Long id) throws AlmacenException {
        Almacen almacen = almacenRepository.findById(id).orElseThrow(
                ()-> new AlmacenException("Almacen no encontrado")
        );
        return toDTO(almacen);
    }

    private AlmacenDTO toDTO(Almacen a) {
        AlmacenDTO dto = new AlmacenDTO();
        dto.id = a.getId();
        dto.nombre = a.getNombre();
        dto.ubicacion = a.getUbicacion();
        dto.capacidadTotal = a.getCapacidadTotal();
        dto.descripcion = a.getDescripcion();
        return dto;
    }
}