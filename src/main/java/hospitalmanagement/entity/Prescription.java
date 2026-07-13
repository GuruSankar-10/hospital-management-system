package hospitalmanagement.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;


@Entity
@Table(name="prescriptions")
public class Prescription {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;


@Column(length = 1000)
private String medicine;


@Column(length = 1000)
private String notes;



@ManyToOne
@JoinColumn(name="doctor_id")
@JsonIgnoreProperties({"prescriptions"})
private Doctor doctor;



@ManyToOne
@JoinColumn(name="patient_id")
@JsonIgnoreProperties({"prescriptions"})
private Patient patient;



public Prescription(){}



public Long getId(){
return id;
}


public void setId(Long id){
this.id=id;
}


public String getMedicine(){
return medicine;
}


public void setMedicine(String medicine){
this.medicine=medicine;
}


public String getNotes(){
return notes;
}


public void setNotes(String notes){
this.notes=notes;
}


public Doctor getDoctor(){
return doctor;
}


public void setDoctor(Doctor doctor){
this.doctor=doctor;
}


public Patient getPatient(){
return patient;
}


public void setPatient(Patient patient){
this.patient=patient;
}


}