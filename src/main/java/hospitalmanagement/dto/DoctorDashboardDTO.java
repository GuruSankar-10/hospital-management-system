package hospitalmanagement.dto;

public class DoctorDashboardDTO {

    private String doctorName;
    private long totalPatients;
    private long totalAppointments;
    private long todayAppointments;
    private long totalPrescriptions;

    public DoctorDashboardDTO() {
    }

    public DoctorDashboardDTO(String doctorName,
                              long totalPatients,
                              long totalAppointments,
                              long todayAppointments,
                              long totalPrescriptions) {

        this.doctorName = doctorName;
        this.totalPatients = totalPatients;
        this.totalAppointments = totalAppointments;
        this.todayAppointments = todayAppointments;
        this.totalPrescriptions = totalPrescriptions;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public long getTotalPatients() {
        return totalPatients;
    }

    public void setTotalPatients(long totalPatients) {
        this.totalPatients = totalPatients;
    }

    public long getTotalAppointments() {
        return totalAppointments;
    }

    public void setTotalAppointments(long totalAppointments) {
        this.totalAppointments = totalAppointments;
    }

    public long getTodayAppointments() {
        return todayAppointments;
    }

    public void setTodayAppointments(long todayAppointments) {
        this.todayAppointments = todayAppointments;
    }

    public long getTotalPrescriptions() {
        return totalPrescriptions;
    }

    public void setTotalPrescriptions(long totalPrescriptions) {
        this.totalPrescriptions = totalPrescriptions;
    }

}