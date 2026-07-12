package hospitalmanagement.service;

import hospitalmanagement.entity.Doctor;
import hospitalmanagement.entity.User;
import hospitalmanagement.repository.DoctorRepository;
import hospitalmanagement.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserRepository userRepository;

    // ==========================
    // Save Doctor
    // ==========================
    public Doctor saveDoctor(Doctor doctor) {

        return doctorRepository.save(doctor);

    }

    // ==========================
    // Get All Doctors
    // ==========================
    public List<Doctor> getAllDoctors() {

        return doctorRepository.findAll();

    }

    // ==========================
    // Get Doctor By Id
    // ==========================
    public Doctor getDoctorById(Long id) {

        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor Not Found"));

    }

    // ==========================
    // Update Doctor
    // ==========================
    public Doctor updateDoctor(Long id, Doctor newDoctor) {

        Doctor oldDoctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor Not Found"));

        String oldEmail = oldDoctor.getEmail();

        oldDoctor.setName(newDoctor.getName());
        oldDoctor.setEmail(newDoctor.getEmail());
        oldDoctor.setSpecialization(newDoctor.getSpecialization());
        oldDoctor.setPhone(newDoctor.getPhone());

        Doctor updatedDoctor = doctorRepository.save(oldDoctor);

        User user = userRepository.findByEmail(oldEmail)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        user.setFullName(newDoctor.getName());
        user.setEmail(newDoctor.getEmail());

        userRepository.save(user);

        return updatedDoctor;

    }

    // ==========================
    // Delete Doctor
    // ==========================
    public void deleteDoctor(Long id) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor Not Found"));

        userRepository.findByEmail(doctor.getEmail())
                .ifPresent(userRepository::delete);

        doctorRepository.delete(doctor);

    }

}