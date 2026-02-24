package com.logistalia.logis_y.controller;

import com.logistalia.logis_y.dto.AlmacenDTO;
import com.logistalia.logis_y.dto.CrearAlmacenDTO;
import com.logistalia.logis_y.exception.AlmacenException;
import com.logistalia.logis_y.service.AlmacenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/almacenes")
public class AlmacenController {

    @Autowired
    private AlmacenService almacenService;

    @PostMapping
    public ResponseEntity<AlmacenDTO> crear(@RequestBody CrearAlmacenDTO dto) {
        return ResponseEntity.ok(almacenService.crear(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody CrearAlmacenDTO dto) {
        try {
            return ResponseEntity.ok(almacenService.actualizar(id, dto));
        } catch (AlmacenException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        almacenService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<AlmacenDTO>> listar() {
        return ResponseEntity.ok(almacenService.listar());
    }
}