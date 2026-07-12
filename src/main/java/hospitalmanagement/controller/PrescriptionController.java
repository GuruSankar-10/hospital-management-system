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
    private PrescriptionService service;

    @PostMapping
    public Prescription save(@RequestBody Prescription prescription) {
        return service.save(prescription);
    }

    @GetMapping
    public List<Prescription> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Prescription getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Prescription update(@PathVariable Long id,
                               @RequestBody Prescription prescription) {
        return service.update(id, prescription);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Prescription Deleted Successfully";
    }
    @GetMapping("/doctor/{doctorId}")
    public List<Prescription> getPrescriptionsByDoctor(
            @PathVariable Long doctorId) {

        return service.getPrescriptionsByDoctor(doctorId);
    }
}