package hospitalmanagement.controller;


import hospitalmanagement.entity.User;
import hospitalmanagement.service.UserService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;



@RestController
@RequestMapping("/users")
@CrossOrigin(origins="*")
public class UserController {


    @Autowired
    private UserService userService;



    // Get All Users

    @GetMapping
    public List<User> getAllUsers(){

        return userService.getAllUsers();

    }



    // Get User By ID

    @GetMapping("/{id}")
    public User getUser(
            @PathVariable Long id){

        return userService.getUserById(id);

    }




    // Update User

    @PutMapping("/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User user){

        return userService.updateUser(id,user);

    }




    // Delete User

    @DeleteMapping("/{id}")
    public String deleteUser(
            @PathVariable Long id){


        userService.deleteUser(id);


        return "User Deleted Successfully";

    }
    @PostMapping
    public User createUser(@RequestBody User user){

        return userService.saveUser(user);

    }

}