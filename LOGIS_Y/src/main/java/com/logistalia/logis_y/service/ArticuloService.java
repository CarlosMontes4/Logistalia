package com.logistalia.logis_y.service;

import com.logistalia.logis_y.dto.ArticuloDTO;
import com.logistalia.logis_y.exception.ArticuloException;
import com.logistalia.logis_y.model.Articulo;
import com.logistalia.logis_y.model.Solicitud;
import com.logistalia.logis_y.repository.ArticuloRepository;
import com.logistalia.logis_y.repository.SolicitudRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ArticuloService {

    private final ArticuloRepository articuloRepository;
    private final SolicitudRepository solicitudRepository;

    public ArticuloService(ArticuloRepository articuloRepository, SolicitudRepository solicitudRepository) {
        this.articuloRepository = articuloRepository;
        this.solicitudRepository = solicitudRepository;
    }

    public ArticuloDTO crearArticulo(ArticuloDTO dto) throws ArticuloException {
        Solicitud solicitud = solicitudRepository.findById(dto.getSolicitudId())
                .orElseThrow(() -> new ArticuloException("Solicitud no encontrada"));

        Articulo articulo = new Articulo();
        articulo.setNombreArticulo(dto.getNombreArticulo());
        articulo.setCantidad(dto.getCantidad());
        articulo.setDescripcion(dto.getDescripcion());
        articulo.setSolicitud(solicitud);

        return toDTO(articuloRepository.save(articulo));
    }

    //La lista de artículos pertenecerá una misma solicitud
    public boolean registrarArticulos(List<ArticuloDTO> dto) {

        if(dto.isEmpty()){
            return false;
        }

        Solicitud solicitud = solicitudRepository.findById(dto.get(0).getSolicitudId())
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));

        for(ArticuloDTO a : dto){
            Articulo articulo = new Articulo();
            articulo.setNombreArticulo(a.getNombreArticulo());
            articulo.setCantidad(a.getCantidad());
            articulo.setDescripcion(a.getDescripcion());
            articulo.setSolicitud(solicitud);
            articuloRepository.save(articulo);
        }
        return true;
    }

    public List<ArticuloDTO> listarTodos() {
        return articuloRepository.findAll()
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<ArticuloDTO> listarPorSolicitud(Long solicitudId) {
        return articuloRepository.findBySolicitudId(solicitudId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<ArticuloDTO> obtenerPorId(Long id) {
        return articuloRepository.findById(id).map(this::toDTO);
    }

    public ArticuloDTO actualizarArticulo(Long id, ArticuloDTO dto) {
        Articulo articulo = articuloRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artículo no encontrado"));

        articulo.setNombreArticulo(dto.getNombreArticulo());
        articulo.setCantidad(dto.getCantidad());
        articulo.setDescripcion(dto.getDescripcion());

        return toDTO(articuloRepository.save(articulo));
    }

    public void eliminarArticulo(Long id) {
        articuloRepository.deleteById(id);
    }

    private ArticuloDTO toDTO(Articulo articulo) {
        ArticuloDTO dto = new ArticuloDTO();
        dto.setId(articulo.getId());
        dto.setNombreArticulo(articulo.getNombreArticulo());
        dto.setCantidad(articulo.getCantidad());
        dto.setDescripcion(articulo.getDescripcion());
        dto.setSolicitudId(articulo.getSolicitud().getId());
        return dto;
    }

}