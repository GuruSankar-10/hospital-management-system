package hospitalmanagement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
public class SecurityConfig {

    @Bean
    public UserDetailsService userDetailsService() {

        UserDetails admin = User.withUsername("admin")
                .password("admin123")
                .roles("ADMIN")
                .build();

        UserDetails doctor = User.withUsername("doctor")
                .password("doctor123")
                .roles("DOCTOR")
                .build();

        UserDetails staff = User.withUsername("staff")
                .password("staff123")
                .roles("STAFF")
                .build();

        return new InMemoryUserDetailsManager(admin, doctor, staff);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/", "/index.html", "/css/**", "/js/**").permitAll()
            .requestMatchers("/dashboard.html").hasAnyRole("ADMIN","STAFF")
            .requestMatchers("/doctors.html").hasRole("ADMIN")
            .requestMatchers("/patients.html").hasAnyRole("ADMIN","DOCTOR")
            .requestMatchers("/appointments.html").hasAnyRole("ADMIN","DOCTOR")
            .requestMatchers("/billing.html").hasAnyRole("ADMIN","STAFF")
            .anyRequest().authenticated()
        )
        .formLogin(form -> form
        	    .loginPage("/login.html")
        	    .loginProcessingUrl("/login")
        	    .defaultSuccessUrl("/dashboard.html", true)
        	    .permitAll()
        	)
        .logout(logout -> logout.permitAll());

        return http.build();
    }
}