package hospitalmanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import hospitalmanagement.entity.Medicine;
import hospitalmanagement.service.MedicineService;

@RestController
@RequestMapping("/medicines")
@CrossOrigin(origins = "*")
public class MedicineController {

    @Autowired
    private MedicineService service;

    // =========================
    // Get All Medicines
    // =========================

    @GetMapping
    public List<Medicine> getAllMedicines() {

        return service.getAllMedicines();

    }

    // =========================
    // Get One Medicine
    // =========================

    @GetMapping("/{id}")
    public Medicine getMedicine(@PathVariable Long id) {

        return service.getMedicine(id);

    }

    // =========================
    // Add Medicine
    // =========================

    @PostMapping
    public Medicine addMedicine(
            @RequestBody Medicine medicine) {

        return service.saveMedicine(medicine);

    }

    // =========================
    // Update Medicine
    // =========================

    @PutMapping("/{id}")
    public Medicine updateMedicine(
            @PathVariable Long id,
            @RequestBody Medicine medicine) {

        return service.updateMedicine(id, medicine);

    }

    // =========================
    // Delete Medicine
    // =========================

    @DeleteMapping("/{id}")
    public String deleteMedicine(
            @PathVariable Long id) {

        service.deleteMedicine(id);

        return "Medicine Deleted Successfully";

    }

    // =========================
    // Search Medicine
    // =========================

    @GetMapping("/search/{keyword}")
    public List<Medicine> searchMedicine(
            @PathVariable String keyword) {

        return service.searchMedicine(keyword);

    }

}