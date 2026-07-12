package hospitalmanagement.controller;


import hospitalmanagement.entity.MedicalRecord;
import hospitalmanagement.service.MedicalRecordService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;



@RestController
@RequestMapping("/records")
@CrossOrigin(origins = "*")
public class MedicalRecordController {



    @Autowired
    private MedicalRecordService medicalRecordService;



    // Add Record

    @PostMapping
    public MedicalRecord addRecord(
            @RequestBody MedicalRecord record){

        return medicalRecordService.saveRecord(record);

    }




    // Get All Records

    @GetMapping
    public List<MedicalRecord> getAllRecords(){

        return medicalRecordService.getAllRecords();

    }




    // Get Record By ID

    @GetMapping("/{id}")
    public MedicalRecord getRecord(
            @PathVariable Long id){

        return medicalRecordService.getRecordById(id);

    }





    // Update Record

    @PutMapping("/{id}")
    public MedicalRecord updateRecord(
            @PathVariable Long id,
            @RequestBody MedicalRecord record){

        return medicalRecordService.updateRecord(id, record);

    }





    // Delete Record

    @DeleteMapping("/{id}")
    public String deleteRecord(
            @PathVariable Long id){


        medicalRecordService.deleteRecord(id);


        return "Medical Record Deleted Successfully";

    }


}