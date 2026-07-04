package hospitalmanagement.service;

import hospitalmanagement.entity.Doctor;
import hospitalmanagement.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }

    public Doctor updateDoctor(Long id, Doctor newDoctor) {
        Doctor oldDoctor = doctorRepository.findById(id).orElseThrow();

        oldDoctor.setName(newDoctor.getName());
        oldDoctor.setSpecialization(newDoctor.getSpecialization());
        oldDoctor.setPhone(newDoctor.getPhone());

        return doctorRepository.save(oldDoctor);
    }
}