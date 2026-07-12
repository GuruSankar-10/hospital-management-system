package hospitalmanagement.service;

import hospitalmanagement.dto.RegisterRequest;

import hospitalmanagement.entity.User;
import hospitalmanagement.repository.UserRepository;
import hospitalmanagement.dto.ResetPasswordRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ===========================
    // Register User
    // ===========================
    public User register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        return userRepository.save(user);
    }

    // ===========================
    // Reset Password
    // ===========================
    public String resetPassword(ResetPasswordRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email not found"));

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);

        return "Password Updated Successfully";
    }
 // ===========================
 // Get All Users
 // ===========================

 public java.util.List<User> getAllUsers(){

     return userRepository.findAll();

 }


 // ===========================
 // Get User By ID
 // ===========================

 public User getUserById(Long id){

     return userRepository.findById(id)
             .orElseThrow(() ->
             new RuntimeException("User Not Found"));

 }



 // ===========================
 // Delete User
 // ===========================

 public void deleteUser(Long id){

     userRepository.deleteById(id);

 }



 // ===========================
 // Update User
 // ===========================

 public User updateUser(Long id, User newUser){


     User oldUser =
             userRepository.findById(id)
             .orElseThrow(() ->
             new RuntimeException("User Not Found"));



     oldUser.setFullName(
             newUser.getFullName()
     );


     oldUser.setEmail(
             newUser.getEmail()
     );


     oldUser.setRole(
             newUser.getRole()
     );


     return userRepository.save(oldUser);

 }
 public User saveUser(User user){

	    user.setPassword(
	        passwordEncoder.encode(user.getPassword())
	    );

	    return userRepository.save(user);

	}
}