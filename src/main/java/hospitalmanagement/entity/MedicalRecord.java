package hospitalmanagement.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "medical_records")
public class MedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ================= Patient =================

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    // ================= Doctor =================

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    // ================= Medical Details =================

    @Column(length = 500)
    private String diagnosis;

    @Column(length = 500)
    private String symptoms;

    @Column(length = 1000)
    private String treatment;

    @Column(length = 1000)
    private String notes;

    private LocalDate visitDate;

    // ================= Constructors =================

    public MedicalRecord() {
    }

    public MedicalRecord(Long id,
                         Patient patient,
                         Doctor doctor,
                         String diagnosis,
                         String symptoms,
                         String treatment,
                         String notes,
                         LocalDate visitDate) {

        this.id = id;
        this.patient = patient;
        this.doctor = doctor;
        this.diagnosis = diagnosis;
        this.symptoms = symptoms;
        this.treatment = treatment;
        this.notes = notes;
        this.visitDate = visitDate;
    }

    // ================= Getters & Setters =================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getTreatment() {
        return treatment;
    }

    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDate getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(LocalDate visitDate) {
        this.visitDate = visitDate;
    }

    @Override
    public String toString() {
        return "MedicalRecord{" +
                "id=" + id +
                ", diagnosis='" + diagnosis + '\'' +
                ", symptoms='" + symptoms + '\'' +
                ", treatment='" + treatment + '\'' +
                ", visitDate=" + visitDate +
                '}';
    }
}