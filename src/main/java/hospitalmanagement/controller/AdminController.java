package hospitalmanagement.controller;

import hospitalmanagement.dto.AdminDoctorRequest;
import hospitalmanagement.entity.Doctor;
import hospitalmanagement.service.AdminService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/doctor")
    public Doctor createDoctor(@RequestBody AdminDoctorRequest request) {

        return adminService.createDoctor(request);

    }

}