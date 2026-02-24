package com.logistalia.logis_y.controller;

import com.logistalia.logis_y.dto.CrearEspacioDTO;
import com.logistalia.logis_y.dto.EspacioDTO;
import com.logistalia.logis_y.exception.EspacioException;
import com.logistalia.logis_y.service.EspacioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/espacios")
public class EspacioController {

    @Autowired
    private EspacioService espacioService;

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody CrearEspacioDTO dto) {
        try {
            return ResponseEntity.ok(espacioService.crear(dto));
        } catch (EspacioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/almacen/{almacenId}")
    public ResponseEntity<List<EspacioDTO>> listarPorAlmacen(@PathVariable Long almacenId) {
        return ResponseEntity.ok(espacioService.listarPorAlmacen(almacenId));
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody CrearEspacioDTO dto) {
        try {
            return ResponseEntity.ok(espacioService.actualizar(id, dto));
        } catch (EspacioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        try {
            espacioService.eliminar(id);
        } catch (EspacioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/solicitud/{solicitudId}")
    public ResponseEntity<?> obtenerEspacioPorSolicitud(@PathVariable Long solicitudId){
        try {
            return ResponseEntity.ok(espacioService.obtenerEspacioPorSolicitud(solicitudId));
        } catch (EspacioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
