package hospitalmanagement.dto;

public class AdminDoctorRequest {

    private String name;
    private String email;
    private String password;
    private String specialization;
    private String phone;

    public AdminDoctorRequest() {
    }

    public AdminDoctorRequest(String name, String email, String password,
                              String specialization, String phone) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.specialization = specialization;
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}