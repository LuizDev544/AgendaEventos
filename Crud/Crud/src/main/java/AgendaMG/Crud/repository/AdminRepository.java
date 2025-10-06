package AgendaMG.Crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import AgendaMG.Crud.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Admin findByEmail(String email);
}