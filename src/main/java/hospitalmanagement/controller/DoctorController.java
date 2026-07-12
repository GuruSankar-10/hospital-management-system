package hospitalmanagement.controller;

import hospitalmanagement.entity.Doctor;
import hospitalmanagement.service.DoctorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctors")
@CrossOrigin(origins = "*")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    // =====================================
    // Add Doctor
    // =====================================

    @PostMapping
    public ResponseEntity<Doctor> addDoctor(@RequestBody Doctor doctor) {

        return ResponseEntity.ok(
                doctorService.saveDoctor(doctor));

    }

    // =====================================
    // Get All Doctors
    // =====================================

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {

        return ResponseEntity.ok(
                doctorService.getAllDoctors());

    }

    // =====================================
    // Get Doctor By ID
    // =====================================

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctor(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                doctorService.getDoctorById(id));

    }

    // =====================================
    // Update Doctor
    // =====================================

    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(
            @PathVariable Long id,
            @RequestBody Doctor doctor) {

        return ResponseEntity.ok(
                doctorService.updateDoctor(id, doctor));

    }

    // =====================================
    // Delete Doctor
    // =====================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDoctor(
            @PathVariable Long id) {

        doctorService.deleteDoctor(id);

        return ResponseEntity.ok(
                "Doctor Deleted Successfully");

    }

    // =====================================
    // Get Doctor Profile
    // =====================================

    @GetMapping("/profile/{id}")
    public ResponseEntity<Doctor> getDoctorProfile(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                doctorService.getDoctorById(id));

    }

    // =====================================
    // Update Doctor Profile
    // =====================================

    @PutMapping("/profile/{id}")
    public ResponseEntity<Doctor> updateDoctorProfile(
            @PathVariable Long id,
            @RequestBody Doctor doctor) {

        return ResponseEntity.ok(
                doctorService.updateDoctorProfile(id, doctor));

    }

}