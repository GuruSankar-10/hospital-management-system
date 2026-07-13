package hospitalmanagement.dto;

public class DashboardResponse {

    // Dashboard Counts
    private long doctors;
    private long staff;
    private long patients;
    private long appointments;

    // Billing
    private Double revenue;
    private long paidBills;
    private long unpaidBills;

    // Medicine
    private long medicines;
    private long lowStockMedicines;

    // ==========================
    // Constructors
    // ==========================

    public DashboardResponse() {
    }

    public DashboardResponse(
            long doctors,
            long staff,
            long patients,
            long appointments,
            Double revenue,
            long paidBills,
            long unpaidBills,
            long medicines,
            long lowStockMedicines) {

        this.doctors = doctors;
        this.staff = staff;
        this.patients = patients;
        this.appointments = appointments;
        this.revenue = revenue;
        this.paidBills = paidBills;
        this.unpaidBills = unpaidBills;
        this.medicines = medicines;
        this.lowStockMedicines = lowStockMedicines;
    }

    // ==========================
    // Getters and Setters
    // ==========================

    public long getDoctors() {
        return doctors;
    }

    public void setDoctors(long doctors) {
        this.doctors = doctors;
    }

    public long getStaff() {
        return staff;
    }

    public void setStaff(long staff) {
        this.staff = staff;
    }

    public long getPatients() {
        return patients;
    }

    public void setPatients(long patients) {
        this.patients = patients;
    }

    public long getAppointments() {
        return appointments;
    }

    public void setAppointments(long appointments) {
        this.appointments = appointments;
    }

    public Double getRevenue() {
        return revenue;
    }

    public void setRevenue(Double revenue) {
        this.revenue = revenue;
    }

    public long getPaidBills() {
        return paidBills;
    }

    public void setPaidBills(long paidBills) {
        this.paidBills = paidBills;
    }

    public long getUnpaidBills() {
        return unpaidBills;
    }

    public void setUnpaidBills(long unpaidBills) {
        this.unpaidBills = unpaidBills;
    }

    public long getMedicines() {
        return medicines;
    }

    public void setMedicines(long medicines) {
        this.medicines = medicines;
    }

    public long getLowStockMedicines() {
        return lowStockMedicines;
    }

    public void setLowStockMedicines(long lowStockMedicines) {
        this.lowStockMedicines = lowStockMedicines;
    }

}