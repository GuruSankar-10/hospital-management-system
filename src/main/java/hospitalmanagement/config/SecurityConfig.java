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



    public SecurityConfig(
            JwtAuthenticationFilter jwtFilter,
            CustomUserDetailsService userDetailsService) {

        this.jwtFilter = jwtFilter;
        this.userDetailsService = userDetailsService;

    }



    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }




    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();

    }





    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {


        http

        .csrf(csrf -> csrf.disable())


        .sessionManagement(session ->
                session.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS
                ))


        .userDetailsService(userDetailsService)



        .authorizeHttpRequests(auth -> auth



                // =========================
                // Public HTML Pages
                // =========================

                .requestMatchers(

                        "/",
                        "/index.html",
                        "/login.html",


                        // Admin

                        "/admin-dashboard.html",
                        "/admin-doctors.html",
                        "/admin-staff.html",


                        // Doctor

                        "/doctor-dashboard.html",
                        "/doctor-patients.html",
                        "/doctor-appointments.html",
                        "/doctor-prescriptions.html",


                        // Staff

                        "/staff-dashboard.html",
                        "/staff-patients.html",
                        "/staff-appointments.html",
                        "/staff-profile.html"


                ).permitAll()



                // =========================
                // Static Files
                // =========================

                .requestMatchers(

                        "/css/**",
                        "/js/**",
                        "/images/**",
                        "/favicon.ico"

                ).permitAll()



                // =========================
                // Login/Register
                // =========================

                .requestMatchers("/auth/**")
                .permitAll()



                // =========================
                // REST APIs
                // =========================

                .requestMatchers("/staff/**")
                .permitAll()


                .requestMatchers("/doctors/**")
                .permitAll()


                .requestMatchers("/patients/**")
                .permitAll()


                .requestMatchers("/appointments/**")
                .permitAll()


                .requestMatchers("/billing/**")
                .permitAll()



                // =========================
                // Anything else
                // =========================

                .anyRequest()
                .permitAll()



        )



        .addFilterBefore(
                jwtFilter,
                UsernamePasswordAuthenticationFilter.class
        );



        return http.build();

    }

}