package hospitalmanagement.service;

import hospitalmanagement.dto.AdminDoctorRequest;
import hospitalmanagement.entity.Doctor;
import hospitalmanagement.entity.Role;
import hospitalmanagement.entity.User;
import hospitalmanagement.repository.DoctorRepository;
import hospitalmanagement.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public Doctor createDoctor(AdminDoctorRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setFullName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.DOCTOR);

        userRepository.save(user);

        Doctor doctor = new Doctor();

        doctor.setName(request.getName());
        doctor.setEmail(request.getEmail());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setPhone(request.getPhone());

        return doctorRepository.save(doctor);
    }

}