package hospitalmanagement.repository;

import hospitalmanagement.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    // Get all patients assigned to a doctor
    List<Patient> findByDoctorId(Long doctorId);

}