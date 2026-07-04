package hospitalmanagement.controller;

import hospitalmanagement.entity.Billing;
import hospitalmanagement.service.BillingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/billing")
@CrossOrigin(origins="*")
public class BillingController {

    @Autowired
    private BillingService billingService;

    @PostMapping
    public Billing createBill(@RequestBody Billing billing) {
        return billingService.saveBill(billing);
    }

    @GetMapping
    public List<Billing> getAllBills() {
        return billingService.getAllBills();
    }

    @DeleteMapping("/{id}")
    public String deleteBill(@PathVariable Long id){
        billingService.deleteBill(id);
        return "Bill Deleted Successfully";
    }

    @PutMapping("/{id}")
    public Billing updateBill(@PathVariable Long id,@RequestBody Billing billing){
        return billingService.updateBill(id, billing);
    }
}