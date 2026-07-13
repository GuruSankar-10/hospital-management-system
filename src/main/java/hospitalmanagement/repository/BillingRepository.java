package hospitalmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import hospitalmanagement.entity.Billing;

public interface BillingRepository extends JpaRepository<Billing, Long> {

    long countByPaymentStatus(String paymentStatus);

    @Query("SELECT COALESCE(SUM(b.amount),0) FROM Billing b WHERE b.paymentStatus='PAID'")
    Double getTotalRevenue();

}