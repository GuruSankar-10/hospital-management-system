package hospitalmanagement.dto;

public class DoctorDashboardDTO {

    private String doctorName;
    private long patientCount;
    private long appointmentCount;
    private long todayAppointmentCount;
    private long prescriptionCount;

    public DoctorDashboardDTO() {
    }

    public DoctorDashboardDTO(String doctorName,
                              long patientCount,
                              long appointmentCount,
                              long todayAppointmentCount,
                              long prescriptionCount) {

        this.doctorName = doctorName;
        this.patientCount = patientCount;
        this.appointmentCount = appointmentCount;
        this.todayAppointmentCount = todayAppointmentCount;
        this.prescriptionCount = prescriptionCount;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public long getPatientCount() {
        return patientCount;
    }

    public void setPatientCount(long patientCount) {
        this.patientCount = patientCount;
    }

    public long getAppointmentCount() {
        return appointmentCount;
    }

    public void setAppointmentCount(long appointmentCount) {
        this.todayAppointmentCount = appointmentCount;
    }

    public long getTodayAppointmentCount() {
        return todayAppointmentCount;
    }

    public void setTodayAppointmentCount(long todayAppointmentCount) {
        this.todayAppointmentCount = todayAppointmentCount;
    }

    public long getPrescriptionCount() {
        return prescriptionCount;
    }

    public void setPrescriptionCount(long prescriptionCount) {
        this.prescriptionCount = prescriptionCount;
    }
}