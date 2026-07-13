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

    // =====================================
    // Save Bill
    // =====================================

    public Billing saveBill(Billing billing) {

        // Auto Calculate Grand Total

        double medicine =
                billing.getMedicineTotal() == null ? 0 : billing.getMedicineTotal();

        double doctor =
                billing.getDoctorFee() == null ? 0 : billing.getDoctorFee();

        double room =
                billing.getRoomCharge() == null ? 0 : billing.getRoomCharge();

        double lab =
                billing.getLabCharge() == null ? 0 : billing.getLabCharge();

        double total = medicine + doctor + room + lab;

        billing.setTotalAmount(total);

        // Keep old amount field for compatibility
        billing.setAmount(total);

        return billingRepository.save(billing);

    }

    // =====================================
    // Get All Bills
    // =====================================

    public List<Billing> getAllBills() {

        return billingRepository.findAll();

    }

    // =====================================
    // Get Bill By Id
    // =====================================

    public Billing getBillById(Long id) {

        return billingRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Bill Not Found"));

    }

    // =====================================
    // Update Bill
    // =====================================

    public Billing updateBill(Long id, Billing newBill) {

        Billing oldBill = getBillById(id);

        oldBill.setMedicineTotal(newBill.getMedicineTotal());
        oldBill.setDoctorFee(newBill.getDoctorFee());
        oldBill.setRoomCharge(newBill.getRoomCharge());
        oldBill.setLabCharge(newBill.getLabCharge());

        double medicine =
                newBill.getMedicineTotal() == null ? 0 : newBill.getMedicineTotal();

        double doctor =
                newBill.getDoctorFee() == null ? 0 : newBill.getDoctorFee();

        double room =
                newBill.getRoomCharge() == null ? 0 : newBill.getRoomCharge();

        double lab =
                newBill.getLabCharge() == null ? 0 : newBill.getLabCharge();

        double total = medicine + doctor + room + lab;

        oldBill.setTotalAmount(total);
        oldBill.setAmount(total);

        oldBill.setPaymentMethod(newBill.getPaymentMethod());
        oldBill.setPaymentStatus(newBill.getPaymentStatus());
        oldBill.setPatient(newBill.getPatient());
        oldBill.setAppointment(newBill.getAppointment());

        return billingRepository.save(oldBill);

    }

    // =====================================
    // Delete Bill
    // =====================================

    public void deleteBill(Long id) {

        Billing bill = getBillById(id);

        billingRepository.delete(bill);

    }

    // =====================================
    // Dashboard
    // =====================================

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