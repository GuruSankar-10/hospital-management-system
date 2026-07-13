package hospitalmanagement.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "billing_medicine")
public class BillingMedicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================
    // Billing
    // ==========================

    @ManyToOne
    @JoinColumn(name = "billing_id")
    private Billing billing;

    // ==========================
    // Medicine
    // ==========================

    @ManyToOne
    @JoinColumn(name = "medicine_id")
    private Medicine medicine;

    // ==========================
    // Quantity
    // ==========================

    private Integer quantity;

    // ==========================
    // Medicine Price
    // ==========================

    private Double price;

    // ==========================
    // Total
    // ==========================

    private Double total;

    public BillingMedicine() {
    }

    // ==========================
    // Getters & Setters
    // ==========================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Billing getBilling() {
        return billing;
    }

    public void setBilling(Billing billing) {
        this.billing = billing;
    }

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }
}