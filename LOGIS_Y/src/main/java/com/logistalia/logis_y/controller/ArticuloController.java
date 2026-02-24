package com.logistalia.logis_y.controller;

import com.logistalia.logis_y.dto.ArticuloDTO;
import com.logistalia.logis_y.model.Articulo;
import com.logistalia.logis_y.service.ArticuloService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articulos")
public class ArticuloController {

    private final ArticuloService articuloService;

    public ArticuloController(ArticuloService articuloService) {
        this.articuloService = articuloService;
    }

    @PostMapping
    public ResponseEntity<Boolean> registrarArticulos(@RequestBody List<ArticuloDTO> dto) {
        return ResponseEntity.ok(articuloService.registrarArticulos(dto));
    }

    @GetMapping
    public ResponseEntity<List<ArticuloDTO>> listarTodos() {
        return ResponseEntity.ok(articuloService.listarTodos());
    }

    @GetMapping("/solicitud/{solicitudId}")
    public ResponseEntity<List<ArticuloDTO>> listarPorSolicitud(@PathVariable Long solicitudId) {
        return ResponseEntity.ok(articuloService.listarPorSolicitud(solicitudId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticuloDTO> obtenerPorId(@PathVariable Long id) {
        return articuloService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ArticuloDTO> actualizar(@PathVariable Long id, @RequestBody ArticuloDTO dto) {
        return ResponseEntity.ok(articuloService.actualizarArticulo(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        articuloService.eliminarArticulo(id);
        return ResponseEntity.noContent().build();
    }
}