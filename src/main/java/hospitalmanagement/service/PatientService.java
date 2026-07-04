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

    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public void deletePatient(Long id){
        patientRepository.deleteById(id);
    }

    public Patient updatePatient(Long id, Patient newPatient){
        Patient oldPatient = patientRepository.findById(id).orElseThrow();

        oldPatient.setName(newPatient.getName());
        oldPatient.setAge(newPatient.getAge());
        oldPatient.setDisease(newPatient.getDisease());
        oldPatient.setPhone(newPatient.getPhone());

        return patientRepository.save(oldPatient);
    }
}