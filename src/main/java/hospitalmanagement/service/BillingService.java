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

    public Billing saveBill(Billing billing) {
        return billingRepository.save(billing);
    }

    public List<Billing> getAllBills() {
        return billingRepository.findAll();
    }

    public void deleteBill(Long id){
        billingRepository.deleteById(id);
    }

    public Billing updateBill(Long id, Billing newBill){
        Billing old = billingRepository.findById(id).orElseThrow();

        old.setAmount(newBill.getAmount());
        old.setPaymentStatus(newBill.getPaymentStatus());
        old.setPaymentMethod(newBill.getPaymentMethod());
        old.setPatient(newBill.getPatient());
        old.setAppointment(newBill.getAppointment());

        return billingRepository.save(old);
    }
}