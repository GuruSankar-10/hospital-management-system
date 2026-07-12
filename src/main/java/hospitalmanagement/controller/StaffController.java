package hospitalmanagement.controller;

import hospitalmanagement.dto.StaffDTO;
import hospitalmanagement.entity.Staff;
import hospitalmanagement.service.StaffService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/staff")
@CrossOrigin(origins = "*")
public class StaffController {

    @Autowired
    private StaffService staffService;

    // Register Staff (Creates User + Staff)
    @PostMapping("/register")
    public String registerStaff(@RequestBody StaffDTO dto) {
        return staffService.registerStaff(dto);
    }

    // Get All Staff
    @GetMapping
    public List<Staff> getAllStaff() {
        return staffService.getAllStaff();
    }
    
    @GetMapping("/email/{email}")
    public Staff getStaffByEmail(@PathVariable String email){

        return staffService.getStaffByEmail(email);

    }

    // Get Staff By Id
    @GetMapping("/{id}")
    public Staff getStaff(@PathVariable Long id) {
        return staffService.getStaffById(id);
    }

    // Update Staff
    @PutMapping("/{id}")
    public Staff updateStaff(@PathVariable Long id,
                             @RequestBody Staff staff) {
        return staffService.updateStaff(id, staff);
    }

    // Delete Staff
    @DeleteMapping("/{id}")
    public String deleteStaff(@PathVariable Long id) {

        staffService.deleteStaff(id);

        return "Staff Deleted Successfully";
    }

}