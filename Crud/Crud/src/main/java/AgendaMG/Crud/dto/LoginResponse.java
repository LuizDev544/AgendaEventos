package AgendaMG.Crud.dto;

import java.util.Map;

public class LoginResponse {
    private String message;
    private String token;
    private String role;
    private String usuario;
    private boolean authenticated;

    public LoginResponse() {}

    public LoginResponse(String message, String token, String role, String usuario, boolean authenticated) {
        this.message = message;
        this.token = token;
        this.role = role;
        this.usuario = usuario;
        this.authenticated = authenticated;
    }

    public static LoginResponse success(String token, String role, String usuario) {
        return new LoginResponse(
            "Login realizado com sucesso",
            token,
            role,
            usuario,
            true
        );
    }
    public static LoginResponse error(String message) {
        return new LoginResponse(
            message,
            null,
            null,
            null,
            false
        );
    }
    public Map<String, Object> toMap() {
        return Map.of(
            "message", message,
            "token", token,
            "role", role,
            "usuario", usuario,
            "authenticated", authenticated
        );
    }
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public boolean isAuthenticated() {
        return authenticated;
    }

    public void setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
    }
}