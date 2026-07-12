package hospitalmanagement.dto;


public class DashboardResponse {


    private long doctors;

    private long staff;

    private long patients;

    private long appointments;


    public DashboardResponse() {

    }


    public DashboardResponse(long doctors,
                             long staff,
                             long patients,
                             long appointments) {

        this.doctors = doctors;
        this.staff = staff;
        this.patients = patients;
        this.appointments = appointments;

    }



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

}