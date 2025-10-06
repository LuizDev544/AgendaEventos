package AgendaMG.Crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import AgendaMG.Crud.entity.Evento;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Integer> {
}
