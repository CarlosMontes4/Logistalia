package com.logistalia.logis_y.service;
import com.logistalia.logis_y.dto.CrearEspacioDTO;
import com.logistalia.logis_y.dto.EspacioDTO;
import com.logistalia.logis_y.exception.EspacioException;
import com.logistalia.logis_y.model.Almacen;
import com.logistalia.logis_y.model.Espacio;
import com.logistalia.logis_y.model.Solicitud;
import com.logistalia.logis_y.model.Usuario;
import com.logistalia.logis_y.repository.AlmacenRepository;
import com.logistalia.logis_y.repository.EspacioRepository;
import com.logistalia.logis_y.repository.SolicitudRepository;
import com.logistalia.logis_y.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EspacioService {

    @Autowired
    private EspacioRepository espacioRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AlmacenRepository almacenRepository;

    @Autowired
    private SolicitudRepository solicitudRepository;

    public EspacioDTO crear(CrearEspacioDTO dto) throws EspacioException {

        Almacen almacen = almacenRepository.findById(dto.getAlmacenId())
                .orElseThrow(() -> new EspacioException("Almacén no encontrado"));

        Solicitud solicitud = solicitudRepository.findById(dto.getSolicitudId())
                .orElseThrow(() -> new EspacioException("Solucitud no encontrado"));

        //1ra comprobación
        //Que la solicitud del espacio no exceda la capacidad total del alamcen
        if(dto.getCapacidad()>almacen.getCapacidadTotal()){
            throw new EspacioException("La solicitud de espacio es mayor que la del almacen");
        }

        //Vamos a recuperar todos los espacios creados del almacén
        // 1. Buscar reservas activas que se crucen en fechas
        List<Espacio> espaciosSuperpuestos = espacioRepository
                .findByAlmacenIdAndFechasSuperpuestas(
                        dto.getAlmacenId(),
                        dto.getFechaOcupacion(),
                        dto.getFechaDesocupacion()
                );

        //Obtenemos la capacidad ocupada relativa durante esas fechas
        int capacidadOcupada = espaciosSuperpuestos.stream()
                .mapToInt(Espacio::getCapacidad)
                .sum();

        //Verificar si hay suficiente capacidad
        if (capacidadOcupada + dto.getCapacidad() > almacen.getCapacidadTotal()) {
            throw new EspacioException("Capacidad insuficiente en el almacén para ese período.");
        }

        // 3. Crear espacio
        Espacio espacio = new Espacio();
        espacio.setCapacidad(dto.getCapacidad());
        espacio.setDisponible(dto.getDisponible()); // se crea disponible y luego no disponible cuando se asigna a una solicitud
        espacio.setFechaOcupacion(dto.getFechaOcupacion());
        espacio.setFechaDesocupacion(dto.getFechaDesocupacion());
        espacio.setAlmacen(almacen);
        espacio.setSolicitud(solicitud);

        Espacio guardado = espacioRepository.save(espacio);

        return toDTO(guardado);
    }

    public List<EspacioDTO> listarPorAlmacen(Long almacenId) {
        return espacioRepository.findByAlmacenId(almacenId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public EspacioDTO actualizar(Long id, CrearEspacioDTO dto) throws EspacioException {

        Espacio espacio = espacioRepository.findById(id)
                .orElseThrow(() -> new EspacioException("Espacio no encontrado"));

        Almacen almacen = almacenRepository.findById(dto.getAlmacenId())
                .orElseThrow(() -> new EspacioException("Almacén no encontrado"));


        //1ra comprobación
        //Que la solicitud del espacio no exceda la capacidad total del alamcen
        if(dto.getCapacidad()>almacen.getCapacidadTotal()){
            throw new EspacioException("La solicitud de espacio es mayor que la del almacen");
        }

        //Vamos a recuperar todos los espacios creados del almacén
        // 1. Buscar reservas activas que se crucen en fechas
        List<Espacio> espaciosSuperpuestos = espacioRepository
                .findByAlmacenIdAndFechasSuperpuestas(
                        dto.getAlmacenId(),
                        dto.getFechaOcupacion(),
                        dto.getFechaDesocupacion()
                );

        //Obtenemos la capacidad ocupada relativa durante esas fechas
        int capacidadOcupada = espaciosSuperpuestos.stream()
                .mapToInt(Espacio::getCapacidad)
                .sum();

        //Restamos a la capacidad ocupada, la ya ocupada por el espacio a modificar
        capacidadOcupada -= dto.getCapacidad();

        //Verificar si hay suficiente capacidad
        if (capacidadOcupada + dto.getCapacidad() > almacen.getCapacidadTotal()) {
            throw new EspacioException("Capacidad insuficiente en el almacén para ese período.");
        }

        espacio.setCapacidad(dto.getCapacidad());
        espacio.setAlmacen(almacen);
        espacio.setFechaOcupacion(dto.getFechaOcupacion());
        espacio.setFechaDesocupacion(dto.getFechaDesocupacion());
        if (dto.getDisponible() != null) {
            espacio.setDisponible(dto.getDisponible());
        }
        return toDTO(espacioRepository.save(espacio));
    }

    public void eliminar(Long id) throws EspacioException {
        if (!espacioRepository.existsById(id)) {
            throw new EspacioException("Espacio no encontrado");
        }
        espacioRepository.deleteById(id);
    }

    public EspacioDTO obtenerEspacioPorSolicitud(Long solicitudId) throws EspacioException {

        Solicitud solicitud = solicitudRepository.findById(solicitudId)
                .orElseThrow(() -> new EspacioException("Solucitud no encontrado"));

        List<Espacio> espacio = espacioRepository.findBySolicitud(solicitud);

        List<EspacioDTO> espacioDTOS = new ArrayList<>();
        espacioDTOS = espacio.stream().map(
                this::toDTO
        ).toList();

        if(espacioDTOS.isEmpty()){
            return new EspacioDTO();
        }else{
            return espacioDTOS.get(0);
        }
    }

    private EspacioDTO toDTO(Espacio e) {
        EspacioDTO dto = new EspacioDTO();
        dto.setId(e.getId());
        dto.setFechaOcupacion(e.getFechaOcupacion());
        dto.setFechaDesocupacion(e.getFechaDesocupacion());
        dto.setCapacidad(e.getCapacidad());
        dto.setDisponible(e.getDisponible());
        dto.setAlmacenId(e.getAlmacen().getId());
        dto.setSolicitudId(e.getSolicitud().getId());
        return dto;
    }
}
