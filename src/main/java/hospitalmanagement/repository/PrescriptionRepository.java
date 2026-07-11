package hospitalmanagement.repository;

import hospitalmanagement.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {

    // Get prescriptions of a doctor
    List<Prescription> findByDoctorId(Long doctorId);

}