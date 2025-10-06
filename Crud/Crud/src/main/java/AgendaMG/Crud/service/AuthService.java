package AgendaMG.Crud.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import AgendaMG.Crud.entity.Admin;
import AgendaMG.Crud.repository.AdminRepository;

@Service
public class AuthService {

    private final AdminRepository adminRepository; 
    private final PasswordEncoder passwordEncoder;

    public AuthService(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean autenticar(String email, String senha) {
        Admin adminEncontrado = adminRepository.findByEmail(email);
        
        System.out.println("Buscando admin: " + email);
        System.out.println("Admin encontrado: " + (adminEncontrado != null));
        
        if (adminEncontrado != null) {
            boolean senhaCorreta = passwordEncoder.matches(senha, adminEncontrado.getSenha());
            System.out.println("Senha correta: " + senhaCorreta);
            System.out.println("Senha fornecida: " + senha);
            System.out.println("Senha no banco: " + adminEncontrado.getSenha());
            return senhaCorreta;
        }
        
        System.out.println("❌ Admin NÃO encontrado na tabela admin");
        return false;
    }

    public boolean isAdmin(String email) {
        return true; // Todos são admin
    }

    public String getRoleFromDatabase(String email) {
        return "ROLE_ADMIN";
    }
}