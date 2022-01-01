package com.tkyngs.hurima.controller;

import com.tkyngs.hurima.exception.ApiRequestException;
import com.tkyngs.hurima.mapper.AuthenticationMapper;
import com.tkyngs.hurima.model.dto.auth.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/19/2021 5:09 AM
 */

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost")
public class AuthenticationController {

    private final Logger log = LoggerFactory.getLogger(getClass());

    private final AuthenticationManager authenticationManager;
    private final AuthenticationMapper authenticationMapper;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsernameOrEmail(), request.getPassword()));
            return ResponseEntity.ok(authenticationMapper.login(request.getUsernameOrEmail()));
        } catch (AuthenticationException e) {
            throw new ApiRequestException("username or email or password wrong", HttpStatus.FORBIDDEN);
        }
    }
}
