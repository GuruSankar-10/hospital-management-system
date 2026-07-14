package hospitalmanagement.controller;

import hospitalmanagement.entity.Prescription;
import hospitalmanagement.service.PrescriptionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prescriptions")
@CrossOrigin(origins = "*")
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;

    // =====================================
    // Save Prescription
    // =====================================

    @PostMapping
    public ResponseEntity<Prescription> savePrescription(
            @RequestBody Prescription prescription) {

        Prescription savedPrescription =
                prescriptionService.save(prescription);

        return ResponseEntity.ok(savedPrescription);

    }

    // =====================================
    // Get All Prescriptions
    // =====================================

    @GetMapping
    public ResponseEntity<List<Prescription>> getAllPrescriptions() {

        return ResponseEntity.ok(
                prescriptionService.getAll());

    }

    // =====================================
    // Get Prescription By Id
    // =====================================

    @GetMapping("/{id}")
    public ResponseEntity<Prescription> getPrescriptionById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                prescriptionService.getById(id));

    }

    // =====================================
    // Update Prescription
    // =====================================

    @PutMapping("/{id}")
    public ResponseEntity<Prescription> updatePrescription(
            @PathVariable Long id,
            @RequestBody Prescription prescription) {

        Prescription updatedPrescription =
                prescriptionService.update(id, prescription);

        return ResponseEntity.ok(updatedPrescription);

    }

    // =====================================
    // Delete Prescription
    // =====================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePrescription(
            @PathVariable Long id) {

        prescriptionService.delete(id);

        return ResponseEntity.ok(
                "Prescription Deleted Successfully");

    }

    // =====================================
    // Doctor Wise Prescriptions
    // =====================================

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Prescription>> getDoctorPrescriptions(
            @PathVariable Long doctorId) {

        return ResponseEntity.ok(
                prescriptionService.getPrescriptionsByDoctor(doctorId));

    }

    // =====================================
    // Patient Wise Prescriptions
    // =====================================

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<Prescription>> getPatientPrescriptions(
            @PathVariable Long patientId) {

        return ResponseEntity.ok(
                prescriptionService.getPrescriptionsByPatient(patientId));

    }

}