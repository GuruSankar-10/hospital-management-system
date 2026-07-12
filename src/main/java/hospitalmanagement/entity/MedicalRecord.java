package hospitalmanagement.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "medical_records")
public class MedicalRecord {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String diagnosis;


    @Column(length = 2000)
    private String doctorNotes;


    private String testResults;


    private String recordDate;



    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;



    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;



    public MedicalRecord() {
    }



    public MedicalRecord(Long id,
                         String diagnosis,
                         String doctorNotes,
                         String testResults,
                         String recordDate) {

        this.id = id;
        this.diagnosis = diagnosis;
        this.doctorNotes = doctorNotes;
        this.testResults = testResults;
        this.recordDate = recordDate;

    }



    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    public String getDiagnosis() {
        return diagnosis;
    }


    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }


    public String getDoctorNotes() {
        return doctorNotes;
    }


    public void setDoctorNotes(String doctorNotes) {
        this.doctorNotes = doctorNotes;
    }


    public String getTestResults() {
        return testResults;
    }


    public void setTestResults(String testResults) {
        this.testResults = testResults;
    }


    public String getRecordDate() {
        return recordDate;
    }


    public void setRecordDate(String recordDate) {
        this.recordDate = recordDate;
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

}