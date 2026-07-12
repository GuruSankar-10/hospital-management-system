package hospitalmanagement.controller;

import hospitalmanagement.dto.AuthResponse;
import hospitalmanagement.dto.LoginRequest;
import hospitalmanagement.dto.RegisterRequest;
import hospitalmanagement.dto.ResetPasswordRequest;
import hospitalmanagement.entity.Doctor;
import hospitalmanagement.entity.User;
import hospitalmanagement.repository.DoctorRepository;
import hospitalmanagement.repository.UserRepository;
import hospitalmanagement.security.JwtService;
import hospitalmanagement.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    // ==========================
    // Register
    // ==========================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        User user = userService.register(request);

        return ResponseEntity.ok(user);
    }

    // ==========================
    // Forgot Password
    // ==========================
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ResetPasswordRequest request) {

        String message = userService.resetPassword(request);

        return ResponseEntity.ok(message);
    }

    // ==========================
    // Login
    // ==========================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        System.out.println("==================================");
        System.out.println("LOGIN REQUEST");
        System.out.println("Email : " + request.getEmail());
        System.out.println("Password : " + request.getPassword());

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        System.out.println("DB Password : " + user.getPassword());

        boolean matches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword());

        System.out.println("Password Matches : " + matches);
        System.out.println("==================================");

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        String token = jwtService.generateToken(user.getEmail());

        Long doctorId = null;

        if (user.getRole().name().equals("DOCTOR")) {

            Doctor doctor = doctorRepository.findByEmail(user.getEmail())
                    .orElseThrow(() -> new RuntimeException(
                            "Doctor record not found. Please create doctor details."));

            doctorId = doctor.getId();
        }

        AuthResponse response = new AuthResponse(
                token,
                user.getRole().name(),
                user.getFullName(),
                user.getEmail(),
                doctorId);

        return ResponseEntity.ok(response);
    }
}