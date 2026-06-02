package com.namrata.authsystem.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.Customizer;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;

import org.springframework.web.cors.CorsConfigurationSource;

import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    // ✅ CORS CONFIGURATION
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.addAllowedOrigin(
                "http://localhost:3000"
        );

        configuration.addAllowedMethod("*");

        configuration.addAllowedHeader("*");

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }

    // ✅ JWT FILTER
    @Bean
    public JwtFilter jwtFilter() {
        return new JwtFilter();
    }

    // ✅ PASSWORD ENCODER
    @Bean
    public org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder passwordEncoder() {

        return new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
    }

    // ✅ MAIN SECURITY
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        return http

                // ✅ ENABLE CORS
                .cors(Customizer.withDefaults())

                // ✅ DISABLE CSRF
                .csrf(csrf -> csrf.disable())

                // ✅ JWT STATELESS SESSION
                .sessionManagement(session ->

                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                // ✅ AUTHORIZATION RULES
                .authorizeHttpRequests(auth -> auth

                        // PUBLIC APIs
                        .requestMatchers(
                                "/api/login",
                                "/api/register"
                        ).permitAll()

                        // EXPENSE APIs
                        .requestMatchers(
                                "/expenses/**"
                        ).permitAll()
                        .requestMatchers(
                                "/financial-goal/**"
                        ).permitAll()
                        // HTML PAGES
                        .requestMatchers(
                                "/",
                                "/login.html",
                                "/register.html",
                                "/profile.html"
                        ).permitAll()

                        // STATIC FILES
                        .requestMatchers(
                                "/css/**",
                                "/js/**",
                                "/images/**",
                                "/webjars/**"
                        ).permitAll()

                        // H2 CONSOLE
                        .requestMatchers(
                                "/h2-console/**"
                        ).permitAll()

                        // ADMIN ONLY
                        .requestMatchers(
                                "/api/users",
                                "/api/make-admin/**",
                                "/api/admin/**"
                        ).hasRole("ADMIN")

                        // EVERYTHING ELSE
                        .anyRequest().authenticated()
                )

                // H2 CONSOLE FIX
                .headers(headers ->

                        headers.frameOptions(frame ->
                                frame.disable()
                        )
                )

                // JWT FILTER
                .addFilterBefore(
                        jwtFilter(),
                        UsernamePasswordAuthenticationFilter.class
                )

                .build();
    }
}