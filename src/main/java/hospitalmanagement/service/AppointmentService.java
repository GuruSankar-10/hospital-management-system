package hospitalmanagement.service;

import hospitalmanagement.entity.Appointment;
import hospitalmanagement.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // Add Appointment
    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    // Get All Appointments
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    // Get Appointment By ID
    public Appointment getAppointmentById(Long id) {

        return appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment Not Found"));
    }

    // Update Appointment
    public Appointment updateAppointment(Long id, Appointment newAppointment) {

        Appointment oldAppointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment Not Found"));

        oldAppointment.setAppointmentDate(newAppointment.getAppointmentDate());
        oldAppointment.setAppointmentTime(newAppointment.getAppointmentTime());
        oldAppointment.setStatus(newAppointment.getStatus());
        oldAppointment.setDoctor(newAppointment.getDoctor());
        oldAppointment.setPatient(newAppointment.getPatient());

        return appointmentRepository.save(oldAppointment);
    }

    // Delete Appointment
    public void deleteAppointment(Long id) {

        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment Not Found"));

        appointmentRepository.delete(appointment);
    }
}