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

    public Prescription savePrescription(Prescription p){
        return repository.save(p);
    }

    public List<Prescription> getAll(){
        return repository.findAll();
    }

    public void delete(Long id){
        repository.deleteById(id);
    }
}