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
	
	
	
	
	    // ===============================
	    // Password Encoder
	    // ===============================
	
	    @Bean
	    public PasswordEncoder passwordEncoder(){
	
	        return new BCryptPasswordEncoder();
	
	    }
	
	
	
	
	    // ===============================
	    // Authentication Manager
	    // ===============================
	
	    @Bean
	    public AuthenticationManager authenticationManager(
	            AuthenticationConfiguration configuration)
	            throws Exception {
	
	
	        return configuration.getAuthenticationManager();
	
	    }
	
	
	
	
	
	
	    // ===============================
	    // Security Filter Chain
	    // ===============================
	
	
	    @Bean
	    public SecurityFilterChain securityFilterChain(
	            HttpSecurity http) throws Exception {
	
	
	
	        http
	
	        // Disable CSRF
	        .csrf(csrf -> csrf.disable())
	
	
	        // Use CorsConfig.java
	        .cors(cors -> {})
	
	
	
	        // JWT Stateless
	        .sessionManagement(session ->
	
	            session.sessionCreationPolicy(
	                    SessionCreationPolicy.STATELESS
	            )
	
	        )
	
	
	
	        // Disable default Spring login page
	        .formLogin(form -> form.disable())
	
	
	        // Disable browser popup auth
	        .httpBasic(basic -> basic.disable())
	
	
	        .userDetailsService(userDetailsService)
	
	
	
	        .authorizeHttpRequests(auth -> auth
	
	
	
	            // ==========================
	            // Public HTML Pages
	            // ==========================
	
	            .requestMatchers(
	
	                    "/",
	                    "/index.html",
	                    "/login.html",
	                    "/register.html"
	
	            ).permitAll()
	
	
	
	
	
	            // ==========================
	            // Static Resources
	            // ==========================
	
	            .requestMatchers(
	
	                    "/css/**",
	                    "/js/**",
	                    "/images/**",
	                    "/favicon.ico"
	
	            ).permitAll()
	
	
	
	
	
	            // ==========================
	            // Authentication APIs
	            // ==========================
	
	            .requestMatchers(
	                    "/auth/**"
	            ).permitAll()
	
	
	
	
	
	            // ==========================
	            // HMS APIs
	            // ==========================
	
	            .requestMatchers(
	
	                    "/doctors/**",
	                    "/patients/**",
	                    "/staff/**",
	                    "/appointments/**",
	                    "/prescriptions/**",
	                    "/medical-records/**",
	                    "/billing/**",
	                    "/dashboard/**",
	                    "/admin/**",
	                    "/medicines/**"
	
	            ).permitAll()
	
	
	
	
	
	            // ==========================
	            // Admin Pages
	            // ==========================
	
	            .requestMatchers(
	
	                    "/admin-dashboard.html",
	                    "/admin-doctors.html",
	                    "/admin-staff.html",
	                    "/admin-medicines.html"
	
	
	            ).permitAll()
	
	
	
	
	
	
	            // ==========================
	            // Doctor Pages
	            // ==========================
	
	            .requestMatchers(
	
	                    "/doctor-dashboard.html",
	                    "/doctor-patients.html",
	                    "/doctor-appointments.html",
	                    "/doctor-prescriptions.html",
	                    "/doctor-medical-records.html",
	                    "/doctor-profile.html"
	
	            ).permitAll()
	
	
	
	
	
	            // ==========================
	            // Staff Pages
	            // ==========================
	
	            .requestMatchers(
	
	                    "/staff-dashboard.html",
	                    "/staff-patients.html",
	                    "/staff-appointments.html",
	                    "/staff-profile.html"
	
	            ).permitAll()
	
	
	
	
	
	            // Current project mode
	            .anyRequest().permitAll()
	
	        );
	
	
	
	
	
	        // JWT Filter
	
	        http.addFilterBefore(
	
	                jwtFilter,
	
	                UsernamePasswordAuthenticationFilter.class
	
	        );
	
	
	
	        return http.build();
	
	    }
	
	}