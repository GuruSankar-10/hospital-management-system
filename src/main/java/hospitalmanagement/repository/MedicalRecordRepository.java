package hospitalmanagement.repository;

import hospitalmanagement.entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {

    // Get all records of a patient
    List<MedicalRecord> findByPatientId(Long patientId);

    // Get all records created by a doctor
    List<MedicalRecord> findByDoctorId(Long doctorId);

}