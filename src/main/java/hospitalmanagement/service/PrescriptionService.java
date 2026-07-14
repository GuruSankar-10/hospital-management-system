package hospitalmanagement.service;

import hospitalmanagement.entity.Prescription;
import hospitalmanagement.repository.PrescriptionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    // =====================================
    // Save Prescription
    // =====================================

    public Prescription save(Prescription prescription) {

        if (prescription.getCreatedAt() == null) {

            prescription.setCreatedAt(LocalDate.now());

        }

        return prescriptionRepository.save(prescription);

    }

    // =====================================
    // Get All Prescriptions
    // =====================================

    public List<Prescription> getAll() {

        return prescriptionRepository.findAll();

    }

    // =====================================
    // Get Prescription By Id
    // =====================================

    public Prescription getById(Long id) {

        return prescriptionRepository.findById(id)

                .orElseThrow(() ->
                        new RuntimeException(
                                "Prescription Not Found"));

    }

    // =====================================
    // Update Prescription
    // =====================================

    public Prescription update(Long id,
                               Prescription newPrescription) {

        Prescription oldPrescription =
                getById(id);

        oldPrescription.setMedicine(
                newPrescription.getMedicine());

        oldPrescription.setNotes(
                newPrescription.getNotes());

        oldPrescription.setDoctor(
                newPrescription.getDoctor());

        oldPrescription.setPatient(
                newPrescription.getPatient());

        return prescriptionRepository.save(
                oldPrescription);

    }

    // =====================================
    // Delete Prescription
    // =====================================

    public void delete(Long id) {

        Prescription prescription =
                getById(id);

        prescriptionRepository.delete(
                prescription);

    }

    // =====================================
    // Doctor Wise Prescriptions
    // =====================================

    public List<Prescription> getPrescriptionsByDoctor(
            Long doctorId) {

        return prescriptionRepository
                .findByDoctorId(doctorId);

    }

    // =====================================
    // Patient Wise Prescriptions
    // =====================================

    public List<Prescription> getPrescriptionsByPatient(
            Long patientId) {

        return prescriptionRepository
                .findByPatientId(patientId);

    }

}