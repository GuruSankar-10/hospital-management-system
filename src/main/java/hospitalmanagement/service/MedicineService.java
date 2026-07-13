package hospitalmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hospitalmanagement.entity.Medicine;
import hospitalmanagement.repository.MedicineRepository;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository repository;

    // =========================
    // Get All Medicines
    // =========================

    public List<Medicine> getAllMedicines() {

        return repository.findAll();

    }

    // =========================
    // Get Medicine By ID
    // =========================

    public Medicine getMedicine(Long id) {

        return repository.findById(id).orElse(null);

    }

    // =========================
    // Save Medicine
    // =========================

    public Medicine saveMedicine(Medicine medicine) {

        if (medicine.getMedicineCode() == null ||
            medicine.getMedicineCode().isBlank()) {

            long count = repository.count() + 1;

            medicine.setMedicineCode(
                    String.format("MED%04d", count));
        }

        return repository.save(medicine);

    }

    // =========================
    // Update Medicine
    // =========================

    public Medicine updateMedicine(Long id,
                                   Medicine medicine) {

        Medicine existing =
                repository.findById(id).orElse(null);

        if (existing == null) {

            return null;

        }

        existing.setMedicineName(medicine.getMedicineName());
        existing.setGenericName(medicine.getGenericName());
        existing.setStrength(medicine.getStrength());
        existing.setDosageForm(medicine.getDosageForm());
        existing.setCategory(medicine.getCategory());
        existing.setManufacturer(medicine.getManufacturer());
        existing.setPrice(medicine.getPrice());
        existing.setStock(medicine.getStock());
        existing.setReorderLevel(medicine.getReorderLevel());
        existing.setBatchNumber(medicine.getBatchNumber());
        existing.setExpiryDate(medicine.getExpiryDate());
        existing.setStatus(medicine.getStatus());
        existing.setDescription(medicine.getDescription());

        return repository.save(existing);

    }

    // =========================
    // Delete Medicine
    // =========================

    public void deleteMedicine(Long id) {

        repository.deleteById(id);

    }

    // =========================
    // Search Medicine
    // =========================

    public List<Medicine> searchMedicine(String keyword) {

        return repository
                .findByMedicineNameContainingIgnoreCase(keyword);

    }

}