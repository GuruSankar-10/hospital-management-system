package hospitalmanagement.repository;

import hospitalmanagement.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicineRepository
        extends JpaRepository<Medicine, Long> {

    // Search Medicine
    List<Medicine> findByNameContainingIgnoreCase(String keyword);

    // Dashboard Low Stock
    long countByStockLessThanEqual(Integer stock);

}