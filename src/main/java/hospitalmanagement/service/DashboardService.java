package hospitalmanagement.service;

import hospitalmanagement.dto.DashboardResponse;
import hospitalmanagement.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private BillingRepository billingRepository;

    public DashboardResponse getDashboard() {

        long totalDoctors = doctorRepository.count();
        long totalPatients = patientRepository.count();
        long totalStaff = staffRepository.count();
        long totalAppointments = appointmentRepository.count();

        Double revenue = billingRepository.getTotalRevenue();
        if (revenue == null) {
            revenue = 0.0;
        }

        long paidBills = billingRepository.countByPaymentStatus("PAID");
        long unpaidBills = billingRepository.countByPaymentStatus("UNPAID");

        return new DashboardResponse(
                totalDoctors,
                totalPatients,
                totalStaff,
                totalAppointments,
                revenue,
                paidBills,
                unpaidBills
        );
    }
}