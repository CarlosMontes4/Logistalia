package com.logistalia.logis_y.controller;

import com.logistalia.logis_y.dto.AlmacenDisponibleDTO;
import com.logistalia.logis_y.dto.CrearSolicitudDTO;
import com.logistalia.logis_y.dto.SolicitudResponseDTO;
import com.logistalia.logis_y.exception.AlmacenException;
import com.logistalia.logis_y.exception.EspacioException;
import com.logistalia.logis_y.exception.SolicitudException;
import com.logistalia.logis_y.model.EstadoSolicitud;
import com.logistalia.logis_y.model.Solicitud;
import com.logistalia.logis_y.service.SolicitudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/solicitudes")
public class SolicitudController {

    @Autowired
    private SolicitudService solicitudService;

    @PostMapping
    public ResponseEntity<SolicitudResponseDTO> crear(@RequestBody CrearSolicitudDTO dto) {
        return ResponseEntity.ok( solicitudService.crearSolicitud(dto));
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<AlmacenDisponibleDTO>> buscarDisponibles(@RequestParam int volumen) {
        return ResponseEntity.ok(solicitudService.buscarAlmacenesDisponibles(volumen));
    }

    @GetMapping("/cliente/{correo}")
    public ResponseEntity<List<SolicitudResponseDTO>> obtenerSolicitudesPorCorreo(@PathVariable String correo) {
        return ResponseEntity.ok(solicitudService.listarPorCorreoCliente(correo));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<SolicitudResponseDTO> obtenerSolicitudConAlmacenPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(solicitudService.obtenerSolicitudesConAlmacenPorId(id));
        } catch (EspacioException | SolicitudException | AlmacenException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<SolicitudResponseDTO>> obtenerSolicitudesPorEstado(@PathVariable String estado) {

        if(estado.equals("PENDIENTE")){
            return ResponseEntity.ok(solicitudService.listarSolicitudesPendientes());
        }else if (estado.equals("APROBADA")){
            return ResponseEntity.ok(solicitudService.listarSolicitudesAprobada());
        }else if(estado.equals("RECHAZADA")){
            return ResponseEntity.ok(solicitudService.listarSolicitudesRechazada());
        }else{
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/estado/{nuevoEstado}")
    public ResponseEntity<?> actualizarEstado(
            @PathVariable Long id,
            @PathVariable String nuevoEstado
    ) {
        try {
            EstadoSolicitud estado = EstadoSolicitud.valueOf(nuevoEstado.toUpperCase());
            boolean actualizado = solicitudService.actualizarEstado(id, estado);

            if (actualizado) {
                return ResponseEntity.ok("Estado actualizado correctamente.");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Estado inválido: " + nuevoEstado);
        }
    }


}