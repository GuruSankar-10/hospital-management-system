package hospitalmanagement.service;

import hospitalmanagement.entity.MedicalRecord;
import hospitalmanagement.repository.MedicalRecordRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalRecordService {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    // =============================
    // Save Medical Record
    // =============================

    public MedicalRecord saveMedicalRecord(MedicalRecord record) {

        return medicalRecordRepository.save(record);

    }

    // =============================
    // Get All Records
    // =============================

    public List<MedicalRecord> getAllMedicalRecords() {

        return medicalRecordRepository.findAll();

    }

    // =============================
    // Get Record By ID
    // =============================

    public MedicalRecord getMedicalRecordById(Long id) {

        return medicalRecordRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Medical Record Not Found"));

    }

    // =============================
    // Get Patient Records
    // =============================

    public List<MedicalRecord> getPatientRecords(Long patientId) {

        return medicalRecordRepository.findByPatientId(patientId);

    }

    // =============================
    // Get Doctor Records
    // =============================

    public List<MedicalRecord> getDoctorRecords(Long doctorId) {

        return medicalRecordRepository.findByDoctorId(doctorId);

    }

    // =============================
    // Update Record
    // =============================

    public MedicalRecord updateMedicalRecord(Long id,
                                             MedicalRecord newRecord) {

        MedicalRecord oldRecord = getMedicalRecordById(id);

        oldRecord.setDiagnosis(newRecord.getDiagnosis());
        oldRecord.setSymptoms(newRecord.getSymptoms());
        oldRecord.setTreatment(newRecord.getTreatment());
        oldRecord.setNotes(newRecord.getNotes());
        oldRecord.setVisitDate(newRecord.getVisitDate());

        oldRecord.setDoctor(newRecord.getDoctor());
        oldRecord.setPatient(newRecord.getPatient());

        return medicalRecordRepository.save(oldRecord);

    }

    // =============================
    // Delete Record
    // =============================

    public void deleteMedicalRecord(Long id) {

        medicalRecordRepository.deleteById(id);

    }

}