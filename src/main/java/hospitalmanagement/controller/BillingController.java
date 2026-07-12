package hospitalmanagement.controller;

import hospitalmanagement.entity.Billing;
import hospitalmanagement.service.BillingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/billing")
@CrossOrigin(origins = "*")
public class BillingController {

    @Autowired
    private BillingService billingService;

    // ==========================
    // Create Bill
    // ==========================

    @PostMapping
    public Billing createBill(@RequestBody Billing billing) {

        return billingService.saveBill(billing);

    }

    // ==========================
    // Get All Bills
    // ==========================

    @GetMapping
    public List<Billing> getAllBills() {

        return billingService.getAllBills();

    }

    // ==========================
    // Get Bill By Id
    // ==========================

    @GetMapping("/{id}")
    public Billing getBill(@PathVariable Long id) {

        return billingService.getBillById(id);

    }

    // ==========================
    // Update Bill
    // ==========================

    @PutMapping("/{id}")
    public Billing updateBill(@PathVariable Long id,
                              @RequestBody Billing billing) {

        return billingService.updateBill(id, billing);

    }

    // ==========================
    // Delete Bill
    // ==========================

    @DeleteMapping("/{id}")
    public String deleteBill(@PathVariable Long id) {

        billingService.deleteBill(id);

        return "Bill Deleted Successfully";

    }

    // ==========================
    // Billing Summary
    // ==========================

    @GetMapping("/summary")
    public Map<String, Object> getSummary() {

        Map<String, Object> summary = new HashMap<>();

        summary.put("totalRevenue",
                billingService.getTotalRevenue());

        summary.put("paidBills",
                billingService.getPaidBills());

        summary.put("unpaidBills",
                billingService.getUnpaidBills());

        summary.put("totalBills",
                billingService.getAllBills().size());

        return summary;

    }

}