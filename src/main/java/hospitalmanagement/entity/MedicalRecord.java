package hospitalmanagement.entity;

import jakarta.persistence.*;

@Entity
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bloodGroup;
    private Double height;
    private Double weight;
    private String allergies;
    private String diagnosis;
    private String treatment;
    private String doctorNotes;

    @ManyToOne
    @JoinColumn(name="patient_id")
    private Patient patient;

    public MedicalRecord() {
    }

    public MedicalRecord(Long id, String bloodGroup, Double height,
                         Double weight, String allergies,
                         String diagnosis, String treatment,
                         String doctorNotes) {
        this.id = id;
        this.bloodGroup = bloodGroup;
        this.height = height;
        this.weight = weight;
        this.allergies = allergies;
        this.diagnosis = diagnosis;
        this.treatment = treatment;
        this.doctorNotes = doctorNotes;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public Double getHeight() { return height; }
    public void setHeight(Double height) { this.height = height; }

    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }

    public String getAllergies() { return allergies; }
    public void setAllergies(String allergies) { this.allergies = allergies; }

    public String getDiagnosis() { return diagnosis; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }

    public String getTreatment() { return treatment; }
    public void setTreatment(String treatment) { this.treatment = treatment; }

    public String getDoctorNotes() { return doctorNotes; }
    public void setDoctorNotes(String doctorNotes) { this.doctorNotes = doctorNotes; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }
}