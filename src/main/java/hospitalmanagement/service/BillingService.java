package hospitalmanagement.service;

import hospitalmanagement.entity.Billing;
import hospitalmanagement.repository.BillingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillingService {

    @Autowired
    private BillingRepository billingRepository;

    // ==========================
    // Save Bill
    // ==========================

    public Billing saveBill(Billing billing) {

        return billingRepository.save(billing);

    }

    // ==========================
    // Get All Bills
    // ==========================

    public List<Billing> getAllBills() {

        return billingRepository.findAll();

    }

    // ==========================
    // Get Bill By Id
    // ==========================

    public Billing getBillById(Long id) {

        return billingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Bill Not Found"));

    }

    // ==========================
    // Update Bill
    // ==========================

    public Billing updateBill(Long id, Billing newBill) {

        Billing oldBill = billingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Bill Not Found"));

        oldBill.setAmount(newBill.getAmount());
        oldBill.setPaymentMethod(newBill.getPaymentMethod());
        oldBill.setPaymentStatus(newBill.getPaymentStatus());
        oldBill.setPatient(newBill.getPatient());
        oldBill.setAppointment(newBill.getAppointment());

        return billingRepository.save(oldBill);

    }

    // ==========================
    // Delete Bill
    // ==========================

    public void deleteBill(Long id) {

        Billing bill = billingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Bill Not Found"));

        billingRepository.delete(bill);

    }

    // ==========================
    // Dashboard Methods
    // ==========================

    public long getPaidBills() {

        return billingRepository.countByPaymentStatus("PAID");

    }

    public long getUnpaidBills() {

        return billingRepository.countByPaymentStatus("UNPAID");

    }

    public Double getTotalRevenue() {

        return billingRepository.getTotalRevenue();

    }

}