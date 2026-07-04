package hospitalmanagement.repository;

import hospitalmanagement.entity.Billing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BillingRepository extends JpaRepository<Billing, Long> {

    long countByPaymentStatus(String paymentStatus);

    @Query("SELECT SUM(b.amount) FROM Billing b")
    Double getTotalRevenue();
}