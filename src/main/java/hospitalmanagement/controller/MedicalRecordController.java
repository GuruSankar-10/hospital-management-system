package hospitalmanagement.controller;


import hospitalmanagement.entity.MedicalRecord;
import hospitalmanagement.service.MedicalRecordService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/records")
@CrossOrigin(origins = "*")
public class MedicalRecordController {


    @Autowired
    private MedicalRecordService medicalRecordService;



    // =====================================
    // CREATE MEDICAL RECORD
    // =====================================

    @PostMapping
    public ResponseEntity<?> addMedicalRecord(
            @RequestBody MedicalRecord medicalRecord) {

        try {

            return ResponseEntity.ok(
                    medicalRecordService.saveMedicalRecord(medicalRecord)
            );

        }

        catch(Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }



    // =====================================
    // GET ALL RECORDS
    // =====================================

    @GetMapping
    public ResponseEntity<List<MedicalRecord>> getAllMedicalRecords() {

        return ResponseEntity.ok(
                medicalRecordService.getAllMedicalRecords()
        );

    }



    // =====================================
    // GET RECORD BY ID
    // =====================================

    @GetMapping("/{id}")
    public ResponseEntity<MedicalRecord> getMedicalRecord(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                medicalRecordService.getMedicalRecordById(id)
        );

    }



    // =====================================
    // PATIENT HISTORY
    // =====================================

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<MedicalRecord>> getPatientRecords(
            @PathVariable Long patientId) {

        return ResponseEntity.ok(
                medicalRecordService.getPatientRecords(patientId)
        );

    }



    // =====================================
    // DOCTOR RECORDS
    // =====================================

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<MedicalRecord>> getDoctorRecords(
            @PathVariable Long doctorId) {

        return ResponseEntity.ok(
                medicalRecordService.getDoctorRecords(doctorId)
        );

    }



    // =====================================
    // UPDATE
    // =====================================

    @PutMapping("/{id}")
    public ResponseEntity<MedicalRecord> updateMedicalRecord(
            @PathVariable Long id,
            @RequestBody MedicalRecord medicalRecord) {


        return ResponseEntity.ok(
                medicalRecordService.updateMedicalRecord(
                        id,
                        medicalRecord
                )
        );

    }



    // =====================================
    // DELETE
    // =====================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMedicalRecord(
            @PathVariable Long id) {


        medicalRecordService.deleteMedicalRecord(id);


        return ResponseEntity.ok(
                "Medical Record Deleted Successfully"
        );

    }

}