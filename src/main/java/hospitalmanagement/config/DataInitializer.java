package hospitalmanagement.config;

import hospitalmanagement.entity.Role;
import hospitalmanagement.entity.User;
import hospitalmanagement.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initAdmin(UserRepository userRepository,
                                PasswordEncoder passwordEncoder) {

        return args -> {

            if (!userRepository.existsByEmail("admin@gmail.com")) {

                User admin = new User();

                admin.setFullName("Administrator");
                admin.setEmail("admin@gmail.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(Role.ADMIN);

                userRepository.save(admin);

                System.out.println("====================================");
                System.out.println("DEFAULT ADMIN CREATED");
                System.out.println("Email : admin@gmail.com");
                System.out.println("Password : admin123");
                System.out.println("====================================");
            }
            else {

                System.out.println("Admin already exists.");
            }

        };
    }
}