package hospitalmanagement.controller;

import hospitalmanagement.dto.AdminDoctorRequest;
import hospitalmanagement.entity.Doctor;
import hospitalmanagement.service.AdminService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/doctor")
    public ResponseEntity<?> createDoctor(
            @RequestBody AdminDoctorRequest request) {

        try {

            Doctor doctor = adminService.createDoctor(request);

            return ResponseEntity.ok(doctor);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());

        }

    }

}