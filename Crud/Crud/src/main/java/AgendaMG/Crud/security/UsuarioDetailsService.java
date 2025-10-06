package AgendaMG.Crud.security;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import AgendaMG.Crud.entity.Admin;
import AgendaMG.Crud.repository.AdminRepository;

@Service
public class UsuarioDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository; 

    public UsuarioDetailsService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByEmail(email); 
        
        if (admin == null) {
            throw new UsernameNotFoundException("Administrador não encontrado: " + email);
        }

        System.out.println("Admin encontrado: " + admin.getEmail());
        System.out.println("Senha no banco: " + admin.getSenha());

        return new User(
            admin.getEmail(),
            admin.getSenha(),
            Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN"))
        );
    }
}