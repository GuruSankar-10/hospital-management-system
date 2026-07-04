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

    public Appointment saveAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public void deleteAppointment(Long id){
        appointmentRepository.deleteById(id);
    }

    public Appointment updateAppointment(Long id, Appointment newAppointment){
        Appointment old = appointmentRepository.findById(id).orElseThrow();

        old.setAppointmentDate(newAppointment.getAppointmentDate());
        old.setAppointmentTime(newAppointment.getAppointmentTime());
        old.setStatus(newAppointment.getStatus());
        old.setDoctor(newAppointment.getDoctor());
        old.setPatient(newAppointment.getPatient());

        return appointmentRepository.save(old);
    }
}