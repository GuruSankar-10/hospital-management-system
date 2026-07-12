package hospitalmanagement.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import hospitalmanagement.dto.StaffDTO;
import hospitalmanagement.entity.Role;
import hospitalmanagement.entity.Staff;
import hospitalmanagement.entity.User;
import hospitalmanagement.repository.StaffRepository;
import hospitalmanagement.repository.UserRepository;



@Service
public class StaffService {


    @Autowired
    private StaffRepository staffRepository;


    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;



    // ==========================
    // Register Staff
    // Creates User + Staff
    // ==========================

    public String registerStaff(StaffDTO dto) {


        if(userRepository.existsByEmail(dto.getEmail())) {

            return "Email already exists!";

        }



        // Save Login Details

        User user = new User();


        user.setFullName(dto.getFullName());

        user.setEmail(dto.getEmail());


        // Encrypt Password

        user.setPassword(
                passwordEncoder.encode(dto.getPassword())
        );


        user.setRole(Role.STAFF);



        userRepository.save(user);




        // Save Staff Details

        Staff staff = new Staff();


        staff.setName(dto.getFullName());

        staff.setPhone(dto.getPhone());

        staff.setDepartment(dto.getDepartment());



        staffRepository.save(staff);



        return "Staff Registered Successfully";

    }






    // ==========================
    // Get All Staff
    // ==========================

    public List<Staff> getAllStaff(){

        return staffRepository.findAll();

    }






    // ==========================
    // Get Staff By ID
    // ==========================

    public Staff getStaffById(Long id){


        return staffRepository
                .findById(id)
                .orElse(null);

    }







    // ==========================
    // Update Staff
    // ==========================

    public Staff updateStaff(Long id, Staff updatedStaff){



        Staff staff =
                staffRepository
                .findById(id)
                .orElse(null);



        if(staff == null){

            return null;

        }




        staff.setName(updatedStaff.getName());

        staff.setPhone(updatedStaff.getPhone());

        staff.setDepartment(updatedStaff.getDepartment());



        return staffRepository.save(staff);


    }







    // ==========================
    // Delete Staff
    // ==========================

    public void deleteStaff(Long id){


        staffRepository.deleteById(id);


    }

    public Staff getStaffByEmail(String email){

        User user = userRepository.findByEmail(email)
                .orElse(null);


        if(user == null){

            return null;

        }


        List<Staff> staffList = staffRepository.findAll();


        for(Staff staff : staffList){

            if(staff.getName()
                    .equals(user.getFullName())){

                return staff;

            }

        }


        return null;

    }
}