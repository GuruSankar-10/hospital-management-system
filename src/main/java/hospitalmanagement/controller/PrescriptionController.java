package hospitalmanagement.controller;


import hospitalmanagement.entity.Prescription;
import hospitalmanagement.service.PrescriptionService;

import org.springframework.beans.factory.annotation.Autowired;
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
    public Prescription savePrescription(
            @RequestBody Prescription prescription) {


        return prescriptionService.save(prescription);

    }






    // =====================================
    // Get All Prescriptions
    // =====================================

    @GetMapping
    public List<Prescription> getAllPrescriptions() {


        return prescriptionService.getAll();

    }






    // =====================================
    // Get Prescription By ID
    // =====================================

    @GetMapping("/{id}")
    public Prescription getPrescriptionById(
            @PathVariable Long id) {


        return prescriptionService.getById(id);

    }







    // =====================================
    // Update Prescription
    // =====================================

    @PutMapping("/{id}")
    public Prescription updatePrescription(
            @PathVariable Long id,
            @RequestBody Prescription prescription) {



        return prescriptionService.update(
                id,
                prescription
        );


    }








    // =====================================
    // Delete Prescription
    // =====================================

    @DeleteMapping("/{id}")
    public String deletePrescription(
            @PathVariable Long id) {



        prescriptionService.delete(id);


        return "Prescription Deleted Successfully";


    }








    // =====================================
    // Doctor Wise Prescriptions
    // =====================================

    @GetMapping("/doctor/{doctorId}")
    public List<Prescription> getDoctorPrescriptions(
            @PathVariable Long doctorId) {



        return prescriptionService
                .getPrescriptionsByDoctor(doctorId);



    }








    // =====================================
    // Patient Wise Prescription History
    // =====================================

    @GetMapping("/patient/{patientId}")
    public List<Prescription> getPatientPrescriptions(
            @PathVariable Long patientId) {



        return prescriptionService
                .getPrescriptionsByPatient(patientId);



    }



}