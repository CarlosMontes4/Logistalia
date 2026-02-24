package com.logistalia.logis_y.service;

import com.logistalia.logis_y.dto.LoginDTO;
import com.logistalia.logis_y.dto.RegistroDTO;
import com.logistalia.logis_y.dto.UsuarioDTO;
import com.logistalia.logis_y.exception.UsuarioException;
import com.logistalia.logis_y.model.Rol;
import com.logistalia.logis_y.model.Usuario;
import com.logistalia.logis_y.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioDTO registrarCliente(RegistroDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNombre(dto.nombre);
        usuario.setCorreo(dto.correo);
        String hash = passwordEncoder.encode(dto.getContrasena());
        usuario.setContrasena(hash);
        usuario.setRol(Rol.CLIENTE);
        usuarioRepository.save(usuario);
        return toDTO(usuario);
    }

    public UsuarioDTO registrarAdmin(RegistroDTO dto) {
        Usuario usuario = new Usuario();
        usuario.setNombre(dto.nombre);
        usuario.setCorreo(dto.correo);
        String hash = passwordEncoder.encode(dto.getContrasena());
        usuario.setContrasena(hash);
        usuario.setRol(Rol.ADMIN);
        usuarioRepository.save(usuario);
        return toDTO(usuario);
    }

    public UsuarioDTO actualizarAdmin(Long id, RegistroDTO dto) throws UsuarioException {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioException("Usuario no encontrado"));

        usuario.setNombre(dto.getNombre());
        usuario.setCorreo(dto.getCorreo());
        String hash = passwordEncoder.encode(dto.getContrasena());
        usuario.setContrasena(hash);
        usuario.setRol(Rol.ADMIN);

        usuarioRepository.save(usuario);
        return new UsuarioDTO(usuario.getId(), usuario.getNombre(), usuario.getCorreo(), usuario.getRol().name());
    }


    public UsuarioDTO actualizarCliente(Long id, RegistroDTO dto) throws UsuarioException {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioException("Usuario no encontrado"));

        usuario.setNombre(dto.getNombre());
        usuario.setCorreo(dto.getCorreo());
        usuario.setContrasena(dto.getContrasena());
        usuario.setRol(Rol.CLIENTE);

        usuarioRepository.save(usuario);
        return new UsuarioDTO(usuario.getId(),usuario.getNombre(), usuario.getCorreo(), usuario.getRol().name());
    }

    public UsuarioDTO autenticar(LoginDTO dto) throws UsuarioException {
        Usuario usuario = usuarioRepository.findByCorreo(dto.correo)
                .orElseThrow(() -> new UsuarioException("Usuario no encontrado"));

        // Comparar la contraseña ingresada con el hash
        if (!passwordEncoder.matches(dto.getContrasena(), usuario.getContrasena())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return toDTO(usuario);
    }

    public List<UsuarioDTO> listar() {

        List<UsuarioDTO> usuarioDTOS = new ArrayList<>();
        usuarioRepository.findAll().forEach(
                it -> usuarioDTOS.add(toDTO(it))
        );
        return usuarioDTOS;
    }

    public boolean eliminar(Long id) {

        Usuario usuario = usuarioRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("Usuario no encontrado")
        );
        usuarioRepository.delete(usuario);
        return true;
    }

    private UsuarioDTO toDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setNombre(usuario.getNombre());
        dto.setCorreo(usuario.getCorreo());
        dto.setRol(usuario.getRol().name());
        return dto;
    }

}
