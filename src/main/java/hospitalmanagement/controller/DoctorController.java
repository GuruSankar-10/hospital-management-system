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
    public ResponseEntity<?> getAllDoctors(){

        return ResponseEntity.ok(
                doctorService.getAllDoctors()
        );

    }







    // ======================================
    // Get Doctor Profile
    // ======================================

    @GetMapping("/profile/{id}")
    public ResponseEntity<Doctor> getProfile(
            @PathVariable Long id){


        return ResponseEntity.ok(
                doctorService.getDoctorById(id)
        );

    }








    // ======================================
    // Update Doctor Profile
    // ======================================

    @PutMapping("/profile/{id}")
    public ResponseEntity<Doctor> updateProfile(
            @PathVariable Long id,
            @RequestBody Doctor doctor){



        return ResponseEntity.ok(
                doctorService.updateDoctorProfile(
                        id,
                        doctor
                )
        );


    }









    // ======================================
    // Change Password
    // ======================================

    @PutMapping("/change-password/{id}")
    public ResponseEntity<?> changePassword(

            @PathVariable Long id,

            @RequestBody ChangePasswordRequest request

    ){



        doctorService.changePassword(
                id,
                request
        );



        return ResponseEntity.ok(
                "Password Updated Successfully"
        );


    }





}