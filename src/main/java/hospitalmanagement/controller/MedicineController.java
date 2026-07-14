package hospitalmanagement.controller;

import hospitalmanagement.entity.Medicine;
import hospitalmanagement.service.MedicineService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicines")
@CrossOrigin(origins = "*")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    // =====================================
    // Get All Medicines
    // =====================================

    @GetMapping
    public ResponseEntity<List<Medicine>> getAllMedicines() {

        return ResponseEntity.ok(
                medicineService.getAllMedicines());

    }

    // =====================================
    // Get Medicine By Id
    // =====================================

    @GetMapping("/{id}")
    public ResponseEntity<Medicine> getMedicineById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                medicineService.getMedicineById(id));

    }

    // =====================================
    // Add Medicine
    // =====================================

    @PostMapping
    public ResponseEntity<Medicine> addMedicine(
            @RequestBody Medicine medicine) {

        Medicine savedMedicine =
                medicineService.addMedicine(medicine);

        return ResponseEntity.ok(savedMedicine);

    }

    // =====================================
    // Update Medicine
    // =====================================

    @PutMapping("/{id}")
    public ResponseEntity<Medicine> updateMedicine(
            @PathVariable Long id,
            @RequestBody Medicine medicine) {

        Medicine updatedMedicine =
                medicineService.updateMedicine(id, medicine);

        return ResponseEntity.ok(updatedMedicine);

    }

    // =====================================
    // Delete Medicine
    // =====================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMedicine(
            @PathVariable Long id) {

        medicineService.deleteMedicine(id);

        return ResponseEntity.ok(
                "Medicine Deleted Successfully");

    }

    // =====================================
    // Search Medicines
    // =====================================

    @GetMapping("/search")
    public ResponseEntity<List<Medicine>> searchMedicine(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                medicineService.searchMedicine(keyword));

    }

}