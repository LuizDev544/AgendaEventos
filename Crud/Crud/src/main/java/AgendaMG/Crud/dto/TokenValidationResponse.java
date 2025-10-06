package AgendaMG.Crud.dto;

public class TokenValidationResponse {
    private boolean valid;
    private String usuario;
    private String role;

    public TokenValidationResponse() {}

    public TokenValidationResponse(boolean valid, String usuario, String role) {
        this.valid = valid;
        this.usuario = usuario;
        this.role = role;
    }

    public static TokenValidationResponse valid(String usuario, String role) {
        return new TokenValidationResponse(true, usuario, role);
    }

    public static TokenValidationResponse invalid() {
        return new TokenValidationResponse(false, null, null);
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}