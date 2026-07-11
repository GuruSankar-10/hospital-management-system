package hospitalmanagement.controller;

import hospitalmanagement.dto.DoctorDashboardDTO;
import hospitalmanagement.entity.Doctor;
import hospitalmanagement.repository.AppointmentRepository;
import hospitalmanagement.repository.DoctorRepository;
import hospitalmanagement.repository.PatientRepository;
import hospitalmanagement.repository.PrescriptionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @GetMapping("/doctor/{doctorId}")
    public DoctorDashboardDTO getDashboard(@PathVariable Long doctorId) {

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor Not Found"));

        long patientCount =
                patientRepository.findByDoctorId(doctorId).size();

        long appointmentCount =
                appointmentRepository.findByDoctorId(doctorId).size();

        long todayAppointmentCount =
                appointmentRepository
                        .findByDoctorIdAndAppointmentDate(
                                doctorId,
                                LocalDate.now())
                        .size();

        long prescriptionCount =
                prescriptionRepository.findByDoctorId(doctorId).size();

        return new DoctorDashboardDTO(
                doctor.getName(),
                patientCount,
                appointmentCount,
                todayAppointmentCount,
                prescriptionCount);

    }

}