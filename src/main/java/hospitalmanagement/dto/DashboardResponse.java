package hospitalmanagement.dto;

public class DashboardResponse {

    private long totalDoctors;
    private long totalPatients;
    private long totalStaff;
    private long totalAppointments;
    private Double totalRevenue;
    private long paidBills;
    private long unpaidBills;

    public DashboardResponse() {
    }

    public DashboardResponse(long totalDoctors, long totalPatients,
                             long totalStaff, long totalAppointments,
                             Double totalRevenue, long paidBills,
                             long unpaidBills) {
        this.totalDoctors = totalDoctors;
        this.totalPatients = totalPatients;
        this.totalStaff = totalStaff;
        this.totalAppointments = totalAppointments;
        this.totalRevenue = totalRevenue;
        this.paidBills = paidBills;
        this.unpaidBills = unpaidBills;
    }

    public long getTotalDoctors() {
        return totalDoctors;
    }

    public void setTotalDoctors(long totalDoctors) {
        this.totalDoctors = totalDoctors;
    }

    public long getTotalPatients() {
        return totalPatients;
    }

    public void setTotalPatients(long totalPatients) {
        this.totalPatients = totalPatients;
    }

    public long getTotalStaff() {
        return totalStaff;
    }

    public void setTotalStaff(long totalStaff) {
        this.totalStaff = totalStaff;
    }

    public long getTotalAppointments() {
        return totalAppointments;
    }

    public void setTotalAppointments(long totalAppointments) {
        this.totalAppointments = totalAppointments;
    }

    public Double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Double totalRevenue) {
        this.totalRevenue = totalRevenue;
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
}