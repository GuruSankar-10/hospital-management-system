package hospitalmanagement.controller;

import hospitalmanagement.entity.MedicalRecord;
import hospitalmanagement.service.MedicalRecordService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medical-records")
@CrossOrigin(origins = "*")
public class MedicalRecordController {

    @Autowired
    private MedicalRecordService medicalRecordService;

    // =====================================
    // Add Medical Record
    // =====================================

    @PostMapping
    public ResponseEntity<MedicalRecord> addMedicalRecord(
            @RequestBody MedicalRecord medicalRecord) {

        return ResponseEntity.ok(
                medicalRecordService.saveMedicalRecord(medicalRecord));

    }

    // =====================================
    // Get All Medical Records
    // =====================================

    @GetMapping
    public ResponseEntity<List<MedicalRecord>> getAllMedicalRecords() {

        return ResponseEntity.ok(
                medicalRecordService.getAllMedicalRecords());

    }

    // =====================================
    // Get Medical Record By ID
    // =====================================

    @GetMapping("/{id}")
    public ResponseEntity<MedicalRecord> getMedicalRecord(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                medicalRecordService.getMedicalRecordById(id));

    }

    // =====================================
    // Get Records By Patient
    // =====================================

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<MedicalRecord>> getPatientRecords(
            @PathVariable Long patientId) {

        return ResponseEntity.ok(
                medicalRecordService.getPatientRecords(patientId));

    }

    // =====================================
    // Get Records By Doctor
    // =====================================

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<MedicalRecord>> getDoctorRecords(
            @PathVariable Long doctorId) {

        return ResponseEntity.ok(
                medicalRecordService.getDoctorRecords(doctorId));

    }

    // =====================================
    // Update Medical Record
    // =====================================

    @PutMapping("/{id}")
    public ResponseEntity<MedicalRecord> updateMedicalRecord(
            @PathVariable Long id,
            @RequestBody MedicalRecord medicalRecord) {

        return ResponseEntity.ok(
                medicalRecordService.updateMedicalRecord(id, medicalRecord));

    }

    // =====================================
    // Delete Medical Record
    // =====================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMedicalRecord(
            @PathVariable Long id) {

        medicalRecordService.deleteMedicalRecord(id);

        return ResponseEntity.ok("Medical Record Deleted Successfully");

    }

}