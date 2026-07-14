package hospitalmanagement.service;

import hospitalmanagement.entity.Medicine;
import hospitalmanagement.repository.MedicineRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    // =====================================
    // Get All Medicines
    // =====================================

    public List<Medicine> getAllMedicines() {

        return medicineRepository.findAll();

    }

    // =====================================
    // Get Medicine By Id
    // =====================================

    public Medicine getMedicineById(Long id) {

        return medicineRepository.findById(id)

                .orElseThrow(() ->
                        new RuntimeException("Medicine Not Found"));

    }

    // =====================================
    // Add Medicine
    // =====================================

    public Medicine addMedicine(Medicine medicine) {

        validateMedicine(medicine);

        return medicineRepository.save(medicine);

    }

    // =====================================
    // Update Medicine
    // =====================================

    public Medicine updateMedicine(Long id,
                                   Medicine medicine) {

        Medicine oldMedicine =
                getMedicineById(id);

        oldMedicine.setName(
                medicine.getName());

        oldMedicine.setStrength(
                medicine.getStrength());

        oldMedicine.setCategory(
                medicine.getCategory());

        oldMedicine.setManufacturer(
                medicine.getManufacturer());

        oldMedicine.setPrice(
                medicine.getPrice());

        oldMedicine.setStock(
                medicine.getStock());

        oldMedicine.setExpiryDate(
                medicine.getExpiryDate());

        oldMedicine.setDescription(
                medicine.getDescription());

        return medicineRepository.save(
                oldMedicine);

    }

    // =====================================
    // Delete Medicine
    // =====================================

    public void deleteMedicine(Long id) {

        Medicine medicine =
                getMedicineById(id);

        medicineRepository.delete(medicine);

    }

    // =====================================
    // Search Medicine
    // =====================================

    public List<Medicine> searchMedicine(String keyword) {

        return medicineRepository
                .findByNameContainingIgnoreCase(keyword);

    }

    // =====================================
    // Validation
    // =====================================

    private void validateMedicine(Medicine medicine) {

        if (medicine.getName() == null ||
                medicine.getName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Medicine Name is required");

        }

        if (medicine.getStrength() == null ||
                medicine.getStrength().trim().isEmpty()) {

            throw new RuntimeException(
                    "Medicine Strength is required");

        }

        if (medicine.getPrice() == null ||
                medicine.getPrice() <= 0) {

            throw new RuntimeException(
                    "Invalid Price");

        }

        if (medicine.getStock() == null ||
                medicine.getStock() < 0) {

            throw new RuntimeException(
                    "Invalid Stock");

        }

    }

}