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

    // =====================================
    // Save Doctor
    // =====================================

    public Doctor saveDoctor(Doctor doctor) {

        return doctorRepository.save(doctor);

    }

    // =====================================
    // Get All Doctors
    // =====================================

    public List<Doctor> getAllDoctors() {

        return doctorRepository.findAll();

    }

    // =====================================
    // Get Doctor By Id
    // =====================================

    public Doctor getDoctorById(Long id) {

        return doctorRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Doctor Not Found"));

    }

    // =====================================
    // Update Doctor
    // =====================================

    public Doctor updateDoctor(Long id, Doctor newDoctor) {

        Doctor oldDoctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Doctor Not Found"));

        String oldEmail = oldDoctor.getEmail();

        oldDoctor.setName(newDoctor.getName());
        oldDoctor.setEmail(newDoctor.getEmail());
        oldDoctor.setSpecialization(newDoctor.getSpecialization());
        oldDoctor.setPhone(newDoctor.getPhone());

        oldDoctor.setDepartment(newDoctor.getDepartment());
        oldDoctor.setQualification(newDoctor.getQualification());
        oldDoctor.setExperience(newDoctor.getExperience());
        oldDoctor.setAbout(newDoctor.getAbout());
        oldDoctor.setProfileImage(newDoctor.getProfileImage());

        Doctor savedDoctor = doctorRepository.save(oldDoctor);

        User user = userRepository.findByEmail(oldEmail)
                .orElseThrow(() ->
                        new RuntimeException("User Not Found"));

        user.setFullName(newDoctor.getName());
        user.setEmail(newDoctor.getEmail());

        userRepository.save(user);

        return savedDoctor;

    }

    // =====================================
    // Update Doctor Profile
    // =====================================

    public Doctor updateDoctorProfile(Long id, Doctor updatedDoctor) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Doctor Not Found"));

        String oldEmail = doctor.getEmail();

        doctor.setName(updatedDoctor.getName());
        doctor.setEmail(updatedDoctor.getEmail());
        doctor.setPhone(updatedDoctor.getPhone());
        doctor.setSpecialization(updatedDoctor.getSpecialization());

        doctor.setDepartment(updatedDoctor.getDepartment());
        doctor.setQualification(updatedDoctor.getQualification());
        doctor.setExperience(updatedDoctor.getExperience());
        doctor.setAbout(updatedDoctor.getAbout());
        doctor.setProfileImage(updatedDoctor.getProfileImage());

        Doctor savedDoctor = doctorRepository.save(doctor);

        User user = userRepository.findByEmail(oldEmail)
                .orElseThrow(() ->
                        new RuntimeException("User Not Found"));

        user.setFullName(updatedDoctor.getName());
        user.setEmail(updatedDoctor.getEmail());

        userRepository.save(user);

        return savedDoctor;

    }

    // =====================================
    // Delete Doctor
    // =====================================

    public void deleteDoctor(Long id) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Doctor Not Found"));

        userRepository.findByEmail(doctor.getEmail())
                .ifPresent(userRepository::delete);

        doctorRepository.delete(doctor);

    }

}