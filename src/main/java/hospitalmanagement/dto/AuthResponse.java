package hospitalmanagement.dto;

public class AuthResponse {

    private String token;
    private String role;
    private String fullName;
    private String email;

    // NEW
    private Long doctorId;

    public AuthResponse() {
    }

    public AuthResponse(String token,
                        String role,
                        String fullName,
                        String email,
                        Long doctorId) {

        this.token = token;
        this.role = role;
        this.fullName = fullName;
        this.email = email;
        this.doctorId = doctorId;
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

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }
}