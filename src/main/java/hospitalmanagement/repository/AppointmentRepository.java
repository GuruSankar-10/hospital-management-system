package hospitalmanagement.repository;

import hospitalmanagement.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Get appointments of a doctor
    List<Appointment> findByDoctorId(Long doctorId);

    // Today's appointments of a doctor
    List<Appointment> findByDoctorIdAndAppointmentDate(Long doctorId,
                                                       LocalDate appointmentDate);

}