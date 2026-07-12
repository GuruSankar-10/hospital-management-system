package hospitalmanagement.dto;

public class StaffDTO {

    private String fullName;
    private String email;
    private String password;
    private String phone;
    private String department;

    public StaffDTO() {
    }

    public StaffDTO(String fullName, String email, String password,
                    String phone, String department) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.department = department;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}