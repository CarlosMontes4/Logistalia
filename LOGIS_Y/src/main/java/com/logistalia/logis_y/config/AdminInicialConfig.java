package com.logistalia.logis_y.config;

import com.logistalia.logis_y.model.Rol;
import com.logistalia.logis_y.model.Usuario;
import com.logistalia.logis_y.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@Configuration
public class AdminInicialConfig {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner crearAdminPorDefecto() {
        return args -> {

            // Verifica si ya existe un admin
            Optional<Usuario> usuario = usuarioRepository.findByCorreo("admin@gmail.com");

            if (usuario.isEmpty()) {
                Usuario admin = new Usuario();
                admin.setNombre("admin");
                admin.setCorreo("admin@gmail.com");
                // Contraseña encriptada
                admin.setContrasena(passwordEncoder.encode("admin")); // En entorno real sería mucho más robusta
                admin.setRol(Rol.ADMIN);
                usuarioRepository.save(admin);
                //Pasamos ahora a crear clientes ficticios
                insertClientes();
            }
            //Solo se crearía si no existe
        };
    }

    private void insertClientes() {
        List<Usuario> clientes = List.of(
                new Usuario("Laura Martínez", "laura.martinez@example.com", passwordEncoder.encode("clave1"), Rol.CLIENTE),
                new Usuario("Carlos Gómez", "carlos.gomez@example.com", passwordEncoder.encode("clave2"), Rol.CLIENTE),
                new Usuario("Ana Torres", "ana.torres@example.com", passwordEncoder.encode("clave3"), Rol.CLIENTE),
                new Usuario("David Ramírez", "david.ramirez@example.com", passwordEncoder.encode("clave4"), Rol.CLIENTE),
                new Usuario("María Fernández", "maria.fernandez@example.com", passwordEncoder.encode("clave5"), Rol.CLIENTE),
                new Usuario("Luis Ortega", "luis.ortega@example.com", passwordEncoder.encode("clave6"), Rol.CLIENTE),
                new Usuario("Carmen Pérez", "carmen.perez@example.com", passwordEncoder.encode("clave7"), Rol.CLIENTE),
                new Usuario("Sofía Morales", "sofia.morales@example.com", passwordEncoder.encode("clave8"), Rol.CLIENTE)
        );

        usuarioRepository.saveAll(clientes);
    }
}
