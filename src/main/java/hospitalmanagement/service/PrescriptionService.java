package hospitalmanagement.service;

import hospitalmanagement.entity.Prescription;
import hospitalmanagement.repository.PrescriptionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepository repository;

    // Save Prescription
    public Prescription save(Prescription prescription) {
        return repository.save(prescription);
    }

    // Get All Prescriptions
    public List<Prescription> getAll() {
        return repository.findAll();
    }

    // Get Prescription By ID
    public Prescription getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription Not Found"));
    }

    // Update Prescription
    public Prescription update(Long id, Prescription prescription) {

        Prescription old = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescription Not Found"));

        old.setMedicine(prescription.getMedicine());
        old.setNotes(prescription.getNotes());

        // NEW
        old.setDoctor(prescription.getDoctor());
        old.setPatient(prescription.getPatient());

        return repository.save(old);
    }

    // Delete Prescription
    public void delete(Long id) {
        repository.deleteById(id);
    }
    public List<Prescription> getPrescriptionsByDoctor(Long doctorId) {
        return repository.findByDoctorId(doctorId);
    }
}