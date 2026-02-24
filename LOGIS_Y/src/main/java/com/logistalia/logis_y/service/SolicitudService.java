package com.logistalia.logis_y.service;

import com.logistalia.logis_y.dto.*;
import com.logistalia.logis_y.exception.AlmacenException;
import com.logistalia.logis_y.exception.EspacioException;
import com.logistalia.logis_y.exception.SolicitudException;
import com.logistalia.logis_y.model.*;
import com.logistalia.logis_y.repository.AlmacenRepository;
import com.logistalia.logis_y.repository.SolicitudRepository;
import com.logistalia.logis_y.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SolicitudService {
    @Autowired
    private SolicitudRepository solicitudRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EspacioService espacioService;

    @Autowired
    private AlmacenService almacenService;

    @Autowired
    private AlmacenRepository almacenRepository;

    public SolicitudResponseDTO crearSolicitud(CrearSolicitudDTO dto) {
        Usuario cliente = usuarioRepository.findByCorreo(dto.getCorreoCliente())
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        Solicitud solicitud = new Solicitud();
        solicitud.setUsuario(cliente);
        solicitud.setTipoMercancia(dto.getTipoMercancia());
        solicitud.setVolumen(dto.getVolumen());
        solicitud.setFechaIngreso(dto.getFechaIngreso());
        solicitud.setFechaRetiro(dto.getFechaRetiro());
        solicitud.setEstado(EstadoSolicitud.PENDIENTE);
        return toDTO(solicitudRepository.save(solicitud));
    }

    @Transactional(readOnly = true)
    public List<SolicitudResponseDTO> listarPorCorreoCliente(String correo) {

        Usuario usuario = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        List<Solicitud> solicitudes = solicitudRepository.findByUsuario(usuario);
        List<SolicitudResponseDTO> solicitudResponseDTOS = new ArrayList<>();
        for(Solicitud solicitud: solicitudes){
            solicitudResponseDTOS.add(toDTO(solicitud));
        }
        return solicitudResponseDTOS;
    }

    @Transactional(readOnly = true)
    public SolicitudResponseDTO obtenerSolicitudesConAlmacenPorId(Long id) throws EspacioException, SolicitudException, AlmacenException {

        Solicitud solicitud = solicitudRepository.findById(id).orElseThrow(
                ()-> new SolicitudException("Solicitud no encontrada")
        );
        EspacioDTO espacio = espacioService.obtenerEspacioPorSolicitud(solicitud.getId());

        AlmacenDTO almacenDTO = almacenService.obtenerPorId(espacio.getAlmacenId());

        SolicitudResponseDTO solicitudResponseDTO = toDTO(solicitud);
        solicitudResponseDTO.setAlmacen(almacenDTO);
        return solicitudResponseDTO;
    }

    @Transactional(readOnly = true)
    public List<AlmacenDisponibleDTO> buscarAlmacenesDisponibles(int volumen) {
        List<Almacen> almacenes = almacenRepository.findAll();

        return almacenes.stream()
                .filter(a -> a.getEspacios().stream()
                        .anyMatch(e -> e.getDisponible() && e.getCapacidad() >= volumen))
                .map(a -> {
                    AlmacenDisponibleDTO dto = new AlmacenDisponibleDTO();
                    dto.setAlmacenId(a.getId());
                    dto.setNombre(a.getNombre());
                    dto.setUbicacion(a.getUbicacion());
                    dto.setDescripcion(a.getDescripcion());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<SolicitudResponseDTO> listarSolicitudesPendientes() {
        List<Solicitud> solicitudes = solicitudRepository.findByEstado(EstadoSolicitud.PENDIENTE);
        return solicitudes.stream().map(
                        SolicitudService::toDTO
        ).collect(Collectors.toList());
    }


    @Transactional(readOnly = true)
    public List<SolicitudResponseDTO> listarSolicitudesAprobada() {
        List<Solicitud> solicitudes = solicitudRepository.findByEstado(EstadoSolicitud.APROBADA);
        return solicitudes.stream().map(
                SolicitudService::toDTO
        ).collect(Collectors.toList());
    }
    public List<SolicitudResponseDTO> listarSolicitudesRechazada() {
        List<Solicitud> solicitudes = solicitudRepository.findByEstado(EstadoSolicitud.RECHAZADA);
        return solicitudes.stream().map(
                SolicitudService::toDTO
        ).collect(Collectors.toList());
    }

    public static SolicitudResponseDTO toDTO(Solicitud solicitud) {
        SolicitudResponseDTO dto = new SolicitudResponseDTO();
        dto.setId(solicitud.getId());
        dto.setTipoMercancia(solicitud.getTipoMercancia());
        dto.setVolumen(solicitud.getVolumen());
        dto.setFechaIngreso(solicitud.getFechaIngreso());
        dto.setFechaRetiro(solicitud.getFechaRetiro());
        dto.setEstado(solicitud.getEstado());
        List<ArticuloDTO> articuloDTOS = new ArrayList<>();
        for(Articulo articulo : solicitud.getArticulos()){
            articuloDTOS.add(articulosToDTO(articulo));
        }
        dto.setArticulos(articuloDTOS);
        if (solicitud.getUsuario() != null) {
            dto.setUsuarioId(solicitud.getUsuario().getId());
        }

        return dto;
    }

    public boolean actualizarEstado(Long id, EstadoSolicitud nuevoEstado) {
        Optional<Solicitud> solicitudOpt = solicitudRepository.findById(id);
        if (solicitudOpt.isPresent()) {
            Solicitud solicitud = solicitudOpt.get();
            solicitud.setEstado(nuevoEstado);
            solicitudRepository.save(solicitud);
            return true;
        }
        return false;
    }

    private static ArticuloDTO articulosToDTO(Articulo articulo) {
        ArticuloDTO dto = new ArticuloDTO();
        dto.setId(articulo.getId());
        dto.setNombreArticulo(articulo.getNombreArticulo());
        dto.setCantidad(articulo.getCantidad());
        dto.setDescripcion(articulo.getDescripcion());
        dto.setSolicitudId(articulo.getSolicitud().getId());
        return dto;
    }

}
