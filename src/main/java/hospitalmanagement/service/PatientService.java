package hospitalmanagement.service;

import hospitalmanagement.entity.Patient;
import hospitalmanagement.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    // Save Patient
    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    // Get All Patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    // Get Patient By ID
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient Not Found"));
    }

    // Update Patient
    public Patient updatePatient(Long id, Patient newPatient) {

        Patient oldPatient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient Not Found"));

        oldPatient.setName(newPatient.getName());
        oldPatient.setAge(newPatient.getAge());
        oldPatient.setDisease(newPatient.getDisease());
        oldPatient.setPhone(newPatient.getPhone());

        return patientRepository.save(oldPatient);
    }

    // Delete Patient
    public void deletePatient(Long id) {

        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient Not Found"));

        patientRepository.delete(patient);
    }
}