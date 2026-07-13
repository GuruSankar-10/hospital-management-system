package hospitalmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hospitalmanagement.entity.Medicine;
import hospitalmanagement.repository.MedicineRepository;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    // =============================
    // Get All Medicines
    // =============================

    public List<Medicine> getAllMedicines() {

        return medicineRepository.findAll();

    }

    // =============================
    // Get Medicine By Id
    // =============================

    public Medicine getMedicineById(Long id) {

        return medicineRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Medicine Not Found"));

    }

    // =============================
    // Add Medicine
    // =============================

    public Medicine addMedicine(Medicine medicine) {

        return medicineRepository.save(medicine);

    }

    // =============================
    // Update Medicine
    // =============================

    public Medicine updateMedicine(Long id, Medicine updatedMedicine) {

        Medicine medicine = getMedicineById(id);

        medicine.setName(updatedMedicine.getName());
        medicine.setCategory(updatedMedicine.getCategory());
        medicine.setManufacturer(updatedMedicine.getManufacturer());
        medicine.setPrice(updatedMedicine.getPrice());
        medicine.setStock(updatedMedicine.getStock());
        medicine.setExpiryDate(updatedMedicine.getExpiryDate());
        medicine.setDescription(updatedMedicine.getDescription());

        return medicineRepository.save(medicine);

    }

    // =============================
    // Delete Medicine
    // =============================

    public void deleteMedicine(Long id) {

        Medicine medicine = getMedicineById(id);

        medicineRepository.delete(medicine);

    }

    // =============================
    // Search Medicine
    // =============================

    public List<Medicine> searchMedicine(String keyword) {

        return medicineRepository.findByNameContainingIgnoreCase(keyword);

    }

}