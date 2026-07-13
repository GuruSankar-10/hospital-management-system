package hospitalmanagement.controller;

import hospitalmanagement.dto.ChangePasswordRequest;
import hospitalmanagement.entity.Doctor;
import hospitalmanagement.service.DoctorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/doctors")
@CrossOrigin(origins = "*")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    // ======================================
    // Get All Doctors
    // ======================================

    @GetMapping
    public ResponseEntity<?> getAllDoctors() {

        return ResponseEntity.ok(
                doctorService.getAllDoctors());

    }

    // ======================================
    // Get Doctor By ID
    // ======================================

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                doctorService.getDoctorById(id));

    }

    // ======================================
    // Update Doctor
    // ======================================

    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(
            @PathVariable Long id,
            @RequestBody Doctor doctor) {

        return ResponseEntity.ok(
                doctorService.updateDoctor(id, doctor));

    }

    // ======================================
    // Delete Doctor
    // ======================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDoctor(
            @PathVariable Long id) {

        doctorService.deleteDoctor(id);

        return ResponseEntity.ok("Doctor Deleted Successfully");

    }

    // ======================================
    // Doctor Profile
    // ======================================

    @GetMapping("/profile/{id}")
    public ResponseEntity<Doctor> getProfile(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                doctorService.getDoctorById(id));

    }

    // ======================================
    // Update Profile
    // ======================================

    @PutMapping("/profile/{id}")
    public ResponseEntity<Doctor> updateProfile(
            @PathVariable Long id,
            @RequestBody Doctor doctor) {

        return ResponseEntity.ok(
                doctorService.updateDoctorProfile(id, doctor));

    }

    // ======================================
    // Change Password
    // ======================================

    @PutMapping("/change-password/{id}")
    public ResponseEntity<String> changePassword(
            @PathVariable Long id,
            @RequestBody ChangePasswordRequest request) {

        doctorService.changePassword(id, request);

        return ResponseEntity.ok(
                "Password Updated Successfully");

    }

}