package hospitalmanagement.service;


import hospitalmanagement.entity.MedicalRecord;
import hospitalmanagement.repository.MedicalRecordRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
public class MedicalRecordService {


    @Autowired
    private MedicalRecordRepository medicalRecordRepository;



    // Save Record

    public MedicalRecord saveRecord(MedicalRecord record){

        return medicalRecordRepository.save(record);

    }



    // Get All Records

    public List<MedicalRecord> getAllRecords(){

        return medicalRecordRepository.findAll();

    }



    // Get Record By ID

    public MedicalRecord getRecordById(Long id){

        return medicalRecordRepository.findById(id)
                .orElseThrow(() ->
                new RuntimeException("Medical Record Not Found"));

    }



    // Update Record

    public MedicalRecord updateRecord(Long id,
                                      MedicalRecord newRecord){


        MedicalRecord oldRecord =
                medicalRecordRepository.findById(id)
                .orElseThrow(() ->
                new RuntimeException("Medical Record Not Found"));



        oldRecord.setDiagnosis(
                newRecord.getDiagnosis()
        );


        oldRecord.setDoctorNotes(
                newRecord.getDoctorNotes()
        );


        oldRecord.setTestResults(
                newRecord.getTestResults()
        );


        oldRecord.setRecordDate(
                newRecord.getRecordDate()
        );


        oldRecord.setPatient(
                newRecord.getPatient()
        );


        oldRecord.setDoctor(
                newRecord.getDoctor()
        );


        return medicalRecordRepository.save(oldRecord);

    }




    // Delete Record

    public void deleteRecord(Long id){

        medicalRecordRepository.deleteById(id);

    }


}