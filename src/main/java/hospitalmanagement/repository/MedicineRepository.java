package hospitalmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hospitalmanagement.entity.Medicine;

public interface MedicineRepository extends JpaRepository<Medicine, Long>{

    List<Medicine> findByNameContainingIgnoreCase(String keyword);

    long countByStockLessThanEqual(Integer stock);

}