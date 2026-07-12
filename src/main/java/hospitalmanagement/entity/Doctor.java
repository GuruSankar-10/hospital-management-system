package hospitalmanagement.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "doctor")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String specialization;

    private String phone;

    // ===== New Profile Fields =====

    private String department;

    private String qualification;

    private Integer experience;

    @Column(length = 1000)
    private String about;

    private String profileImage;

    // ================= Relationships =================

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Patient> patients;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Appointment> appointments;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Prescription> prescriptions;

    // ================= Constructors =================

    public Doctor() {
    }

    public Doctor(Long id,
                  String name,
                  String email,
                  String specialization,
                  String phone,
                  String department,
                  String qualification,
                  Integer experience,
                  String about,
                  String profileImage) {

        this.id = id;
        this.name = name;
        this.email = email;
        this.specialization = specialization;
        this.phone = phone;
        this.department = department;
        this.qualification = qualification;
        this.experience = experience;
        this.about = about;
        this.profileImage = profileImage;
    }

    // ================= Getters & Setters =================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public Integer getExperience() {
        return experience;
    }

    public void setExperience(Integer experience) {
        this.experience = experience;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public List<Patient> getPatients() {
        return patients;
    }

    public void setPatients(List<Patient> patients) {
        this.patients = patients;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    public List<Prescription> getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(List<Prescription> prescriptions) {
        this.prescriptions = prescriptions;
    }

    @Override
    public String toString() {
        return "Doctor{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", specialization='" + specialization + '\'' +
                ", phone='" + phone + '\'' +
                ", department='" + department + '\'' +
                ", qualification='" + qualification + '\'' +
                ", experience=" + experience +
                ", about='" + about + '\'' +
                ", profileImage='" + profileImage + '\'' +
                '}';
    }
}