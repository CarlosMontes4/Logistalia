package com.logistalia.logis_y.controller;

import com.logistalia.logis_y.dto.LoginDTO;
import com.logistalia.logis_y.dto.RegistroDTO;
import com.logistalia.logis_y.dto.UsuarioDTO;
import com.logistalia.logis_y.exception.UsuarioException;
import com.logistalia.logis_y.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registro")
    public ResponseEntity<UsuarioDTO> registrar(@RequestBody RegistroDTO dto) {
        return ResponseEntity.ok(usuarioService.registrarCliente(dto));
    }

    @PostMapping("/registro/admin")
    public ResponseEntity<UsuarioDTO> registrarAdmin(@RequestBody RegistroDTO dto) {
        return ResponseEntity.ok(usuarioService.registrarAdmin(dto));
    }

    @PutMapping("/actualizar/admin/{id}")
    public ResponseEntity<UsuarioDTO> actualizarAdmin(@PathVariable Long id, @RequestBody RegistroDTO dto) throws UsuarioException {
        return ResponseEntity.ok(usuarioService.actualizarAdmin(id, dto));
    }

    @PutMapping("/actualizar/cliente/{id}")
    public ResponseEntity<?> actualizarCliente(@PathVariable Long id, @RequestBody RegistroDTO dto) {
        try {
            return ResponseEntity.ok(usuarioService.actualizarCliente(id, dto));
        } catch (UsuarioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dto) {
        try {
            return ResponseEntity.ok(usuarioService.autenticar(dto));
        } catch (UsuarioException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<UsuarioDTO>> listar() {
        return ResponseEntity.ok(usuarioService.listar());
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Boolean> eliminar(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.eliminar(id));
    }

}