package AgendaMG.Crud.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import AgendaMG.Crud.entity.Evento;
import AgendaMG.Crud.service.EventoService;

@RestController
@RequestMapping("/api")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    // ENDPOINTS PÚBLICOS (sem autenticação)
    // ENDPOINTS PÚBLICOS Lista todos os eventos (sem autenticação)
    @GetMapping("/public/eventos")
    public List<Evento> listarEventosPublicos() {
        return eventoService.listarEventos();
    }

    // ENDPOINTS PÚBLICOS Lista todos os eventos com filtro por id (sem autenticação)
    @GetMapping("/public/eventos/{id}")
    public ResponseEntity<Evento> buscarEventoPorId(@PathVariable int id) {
        Optional<Evento> evento = eventoService.buscarPorId(id);
        return evento.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // ENDPOINTS ADMIN (precisam de autenticação)
    // ENDPOINTS ADMIN lista de todos os eventos, para o admin (precisam de autenticação)
    @GetMapping("/admin/eventos")
    public List<Evento> listarEventosAdmin() {
        return eventoService.listarEventos();
    }

    // ENDPOINTS ADMIN Lista todos os eventos com filtro por id para o admin(precisam de autenticação)
    @GetMapping("/admin/eventos/{id}")
    public ResponseEntity<Evento> buscarEventoPorIdAdmin(@PathVariable int id) {
        Optional<Evento> evento = eventoService.buscarPorId(id);
        return evento.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    // ENDPOINTS ADMIN Criar eventos para o admin(precisam de autenticação)
    @PostMapping("/admin/eventos") 
    public ResponseEntity<Evento> salvarEvento(@RequestBody Evento evento) {
        Evento novoEvento = eventoService.salvarEvento(evento);
        return ResponseEntity.ok(novoEvento); 
    }

    // ENDPOINTS ADMIN Atuzaliza os eventos para o admin(precisam de autenticação)
    @PutMapping("/admin/eventos/{id}")
    public Evento atualizarEvento(@PathVariable int id, @RequestBody Evento eventoAtualizado) {
        return eventoService.atualizarEvento(id, eventoAtualizado);
    }

    // ENDPOINTS ADMIN Deleta os eventos para o usuario(precisam de autenticação)
    @DeleteMapping("/admin/eventos/{id}")
    public ResponseEntity<Void> deletarEvento(@PathVariable int id) {
        if (!eventoService.getEventoService(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        eventoService.deletarEvento(id);
        return ResponseEntity.noContent().build();
    }
}