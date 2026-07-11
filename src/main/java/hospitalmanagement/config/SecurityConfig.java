package hospitalmanagement.config;

import hospitalmanagement.security.CustomUserDetailsService;
import hospitalmanagement.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;
    private final CustomUserDetailsService userDetailsService;

    public SecurityConfig(JwtAuthenticationFilter jwtFilter,
                          CustomUserDetailsService userDetailsService) {
        this.jwtFilter = jwtFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration)
            throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .userDetailsService(userDetailsService)

                .authorizeHttpRequests(auth -> auth

                        // Public Pages
                		.requestMatchers(
                		        "/",
                		        "/index.html",
                		        "/login.html",
                		        "/dashboard.html",
                		        "/doctors.html",
                		        "/patients.html",
                		        "/appointments.html",
                		        "/billing.html",
                		        "/records.html",
                		        "/prescriptions.html",

                		        "/doctor-dashboard.html",
                		        "/doctor-patients.html",
                		        "/doctor-appointments.html",
                		        "/doctor-prescriptions.html",

                		        "/staff-dashboard.html",

                		        "/css/**",
                		        "/js/**",
                		        "/images/**",
                		        "/favicon.ico"

                		).permitAll()

                        // Public APIs
                        .requestMatchers("/auth/**").permitAll()

                        // Temporarily allow all REST APIs while developing
                        .requestMatchers("/doctors/**").permitAll()
                        .requestMatchers("/patients/**").permitAll()
                        .requestMatchers("/appointments/**").permitAll()
                        .requestMatchers("/billing/**").permitAll()

                        .anyRequest().permitAll()
                )

                .addFilterBefore(jwtFilter,
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}