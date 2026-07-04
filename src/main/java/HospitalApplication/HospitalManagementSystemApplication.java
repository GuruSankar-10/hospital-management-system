package HospitalApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "hospitalmanagement")
@EnableJpaRepositories(basePackages = "hospitalmanagement.repository")
@EntityScan(basePackages = "hospitalmanagement.entity")
public class HospitalManagementSystemApplication {
	
    public static void main(String[] args) {
        SpringApplication.run(HospitalManagementSystemApplication.class, args);
    }
}