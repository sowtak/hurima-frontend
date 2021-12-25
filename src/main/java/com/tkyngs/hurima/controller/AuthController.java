package com.tkyngs.hurima.controller;

import com.tkyngs.hurima.model.domain.Role;
import com.tkyngs.hurima.model.dto.payload.response.AuthResponse;
import com.tkyngs.hurima.model.entity.User;
import com.tkyngs.hurima.model.dto.payload.request.LoginRequest;
import com.tkyngs.hurima.model.dto.payload.request.SignUpRequest;
import com.tkyngs.hurima.model.dto.payload.response.ApiResponse;
import com.tkyngs.hurima.model.dto.payload.response.JwtAuthResponse;
import com.tkyngs.hurima.repository.AuthorityRepository;
import com.tkyngs.hurima.repository.RoleRepository;
import com.tkyngs.hurima.repository.UserRepository;
import com.tkyngs.hurima.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.context.ApplicationContextException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/19/2021 5:09 AM
 */

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
@CrossOrigin
public class AuthController {

    private final Logger log = LoggerFactory.getLogger(getClass());

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final AuthorityRepository authorityRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> registerUser(@Valid @RequestBody SignUpRequest request) {
        if(userRepository.existsByUsername(request.getUsername())) {
            return new ResponseEntity(new ApiResponse(
                    false,
                    "Username is already taken."),
                    HttpStatus.BAD_REQUEST
                    );
        }

        if(userRepository.existsByEmail(request.getEmail())) {
            return new ResponseEntity(new ApiResponse(
                    false,
                    "Email is already taken."),
                    HttpStatus.BAD_REQUEST
            );
        }

        User user = new User(request.getUsername(), request.getEmail(),
                request.getPassword());

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole = roleRepository.findByName(Role.ROLE_USER)
                .orElseThrow(() -> new ApplicationContextException("User Role not set."));
        user.setRoles(Collections.singleton(userRole));
        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully."));
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JwtAuthResponse(jwt));
    }
}
