package hospitalmanagement.controller;

import hospitalmanagement.entity.MedicalRecord;
import hospitalmanagement.service.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicalrecords")
public class MedicalRecordController {

    @Autowired
    private MedicalRecordService medicalRecordService;

    @PostMapping
    public MedicalRecord addRecord(@RequestBody MedicalRecord record) {
        return medicalRecordService.saveRecord(record);
    }

    @GetMapping
    public List<MedicalRecord> getAllRecords() {
        return medicalRecordService.getAllRecords();
    }
}