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





    // =====================================
    // SAVE MEDICAL RECORD
    // =====================================


    public MedicalRecord saveMedicalRecord(MedicalRecord record) {


        return medicalRecordRepository.save(record);


    }









    // =====================================
    // GET ALL RECORDS
    // =====================================


    public List<MedicalRecord> getAllMedicalRecords(){


        return medicalRecordRepository.findAll();


    }









    // =====================================
    // GET RECORD BY ID
    // =====================================


    public MedicalRecord getMedicalRecordById(Long id){



        return medicalRecordRepository
                .findById(id)
                .orElseThrow(
                        () ->
                        new RuntimeException(
                                "Medical Record Not Found"
                        )
                );


    }









    // =====================================
    // PATIENT MEDICAL HISTORY
    // =====================================


    public List<MedicalRecord> getPatientRecords(Long patientId){


        return medicalRecordRepository
                .findByPatientId(patientId);


    }









    // =====================================
    // DOCTOR RECORDS
    // =====================================


    public List<MedicalRecord> getDoctorRecords(Long doctorId){


        return medicalRecordRepository
                .findByDoctorId(doctorId);


    }









    // =====================================
    // UPDATE RECORD
    // =====================================


    public MedicalRecord updateMedicalRecord(
            Long id,
            MedicalRecord newRecord){



        MedicalRecord oldRecord =
                getMedicalRecordById(id);




        if(newRecord.getDiagnosis()!=null){

            oldRecord.setDiagnosis(
                    newRecord.getDiagnosis()
            );

        }




        if(newRecord.getSymptoms()!=null){

            oldRecord.setSymptoms(
                    newRecord.getSymptoms()
            );

        }




        if(newRecord.getTreatment()!=null){

            oldRecord.setTreatment(
                    newRecord.getTreatment()
            );

        }




        if(newRecord.getNotes()!=null){

            oldRecord.setNotes(
                    newRecord.getNotes()
            );

        }




        if(newRecord.getVisitDate()!=null){

            oldRecord.setVisitDate(
                    newRecord.getVisitDate()
            );

        }





        if(newRecord.getPatient()!=null){

            oldRecord.setPatient(
                    newRecord.getPatient()
            );

        }





        if(newRecord.getDoctor()!=null){

            oldRecord.setDoctor(
                    newRecord.getDoctor()
            );

        }





        return medicalRecordRepository.save(oldRecord);



    }









    // =====================================
    // DELETE RECORD
    // =====================================


    public void deleteMedicalRecord(Long id){



        MedicalRecord record =
                getMedicalRecordById(id);



        medicalRecordRepository.delete(record);



    }



}