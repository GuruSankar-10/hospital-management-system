package hospitalmanagement.controller;

import hospitalmanagement.dto.AuthResponse;
import hospitalmanagement.dto.LoginRequest;
import hospitalmanagement.dto.RegisterRequest;
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
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        User user = userService.register(request);

        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        String token = jwtService.generateToken(user.getEmail());

        Long doctorId = null;

        if (user.getRole().name().equals("DOCTOR")) {

            Doctor doctor = doctorRepository.findByEmail(user.getEmail())
                    .orElseThrow(() -> new RuntimeException("Doctor record not found. Please create doctor details."));

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