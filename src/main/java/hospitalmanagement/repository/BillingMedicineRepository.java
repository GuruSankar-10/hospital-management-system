package hospitalmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hospitalmanagement.entity.Billing;
import hospitalmanagement.entity.BillingMedicine;

public interface BillingMedicineRepository
        extends JpaRepository<BillingMedicine, Long> {

    List<BillingMedicine> findByBilling(Billing billing);

}