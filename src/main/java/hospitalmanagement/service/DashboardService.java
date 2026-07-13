package hospitalmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hospitalmanagement.dto.DashboardResponse;
import hospitalmanagement.repository.AppointmentRepository;
import hospitalmanagement.repository.BillingRepository;
import hospitalmanagement.repository.DoctorRepository;
import hospitalmanagement.repository.MedicineRepository;
import hospitalmanagement.repository.PatientRepository;
import hospitalmanagement.repository.StaffRepository;

@Service
public class DashboardService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private BillingRepository billingRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    public DashboardResponse getDashboardData() {

        long doctors = doctorRepository.count();

        long staff = staffRepository.count();

        long patients = patientRepository.count();

        long appointments = appointmentRepository.count();

        Double revenue = billingRepository.getTotalRevenue();

        if (revenue == null) {
            revenue = 0.0;
        }

        long paidBills =
                billingRepository.countByPaymentStatus("PAID");

        long unpaidBills =
                billingRepository.countByPaymentStatus("UNPAID");

        long medicines =
                medicineRepository.count();

        long lowStockMedicines =
                medicineRepository.countByStockLessThanEqual(10);

        return new DashboardResponse(
                doctors,
                staff,
                patients,
                appointments,
                revenue,
                paidBills,
                unpaidBills,
                medicines,
                lowStockMedicines
        );
    }
}