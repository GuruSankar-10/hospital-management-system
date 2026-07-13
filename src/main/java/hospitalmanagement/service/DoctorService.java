package hospitalmanagement.service;

import hospitalmanagement.dto.ChangePasswordRequest;
import hospitalmanagement.entity.Doctor;
import hospitalmanagement.entity.User;
import hospitalmanagement.repository.DoctorRepository;
import hospitalmanagement.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ======================================
    // Get All Doctors
    // ======================================

    public List<Doctor> getAllDoctors() {

        return doctorRepository.findAll();

    }

    // ======================================
    // Get Doctor By ID
    // ======================================

    public Doctor getDoctorById(Long id) {

        return doctorRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Doctor Not Found"));

    }

    // ======================================
    // Update Doctor (Admin)
    // ======================================

    public Doctor updateDoctor(Long id, Doctor updatedDoctor) {

        Doctor doctor = getDoctorById(id);

        doctor.setName(updatedDoctor.getName());
        doctor.setEmail(updatedDoctor.getEmail());
        doctor.setPhone(updatedDoctor.getPhone());
        doctor.setSpecialization(updatedDoctor.getSpecialization());
        doctor.setDepartment(updatedDoctor.getDepartment());
        doctor.setQualification(updatedDoctor.getQualification());
        doctor.setExperience(updatedDoctor.getExperience());
        doctor.setAbout(updatedDoctor.getAbout());
        doctor.setProfileImage(updatedDoctor.getProfileImage());

        return doctorRepository.save(doctor);

    }

    // ======================================
    // Update Doctor Profile
    // ======================================

    public Doctor updateDoctorProfile(Long id, Doctor updatedDoctor) {

        return updateDoctor(id, updatedDoctor);

    }

    // ======================================
    // Delete Doctor
    // ======================================

    public void deleteDoctor(Long id) {

        Doctor doctor = getDoctorById(id);

        doctorRepository.delete(doctor);

    }

    // ======================================
    // Change Password
    // ======================================

    public void changePassword(Long doctorId,
                               ChangePasswordRequest request) {

        Doctor doctor = getDoctorById(doctorId);

        User user = userRepository.findByEmail(doctor.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User Account Not Found"));

        if (!passwordEncoder.matches(
                request.getOldPassword(),
                user.getPassword())) {

            throw new RuntimeException("Old Password Incorrect");

        }

        user.setPassword(
                passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);

    }

}