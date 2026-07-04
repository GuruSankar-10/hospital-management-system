package hospitalmanagement.controller;

import hospitalmanagement.entity.Prescription;
import hospitalmanagement.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/prescriptions")
@CrossOrigin(origins="*")
public class PrescriptionController {

    @Autowired
    private PrescriptionService service;

    @PostMapping
    public Prescription add(@RequestBody Prescription p){
        return service.savePrescription(p);
    }

    @GetMapping
    public List<Prescription> getAll(){
        return service.getAll();
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){
        service.delete(id);
        return "Deleted";
    }
}