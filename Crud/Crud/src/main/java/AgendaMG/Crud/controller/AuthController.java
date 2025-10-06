package AgendaMG.Crud.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import AgendaMG.Crud.dto.LoginRequest;
import AgendaMG.Crud.dto.TokenValidationRequest;
import AgendaMG.Crud.dto.TokenValidationResponse;
import AgendaMG.Crud.security.JwtUtil;
import AgendaMG.Crud.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    logger.info("Tentativa de login JWT para: {}", loginRequest.getEmail());
    
    try {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getSenha())
        );
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);
        String role = authService.getRoleFromDatabase(loginRequest.getEmail());
        
        logger.info("LOGIN JWT SUCESSO - Usuário: {}, Role: {}", loginRequest.getEmail(), role);

        return ResponseEntity.ok(Map.of(
            "message", "Login realizado com sucesso",
            "token", token,
            "role", role,
            "usuario", loginRequest.getEmail(),
            "authenticated", true
        ));
        
    } catch (Exception e) {
        logger.warn("LOGIN JWT FALHOU para: {} - Erro: {}", loginRequest.getEmail(), e.getMessage());
        return ResponseEntity.status(401).body(Map.of(
            "message", "Credenciais inválidas!",
            "authenticated", false
        ));
    }
}

    @PostMapping("/validate")
    public ResponseEntity<TokenValidationResponse> validateToken(@RequestBody TokenValidationRequest request) {
        String token = request.getToken();
        if (jwtUtil.validateToken(token)) {
            String username = jwtUtil.extractUsername(token);
            String role = authService.getRoleFromDatabase(username);
            
            return ResponseEntity.ok(TokenValidationResponse.valid(username, role));
        }
        return ResponseEntity.ok(TokenValidationResponse.invalid());
    }
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            logger.info("Logout solicitado para token");
        }
        
        return ResponseEntity.ok(Map.of(
            "message", "Logout realizado com sucesso!",
            "success", true
        ));
    }
}