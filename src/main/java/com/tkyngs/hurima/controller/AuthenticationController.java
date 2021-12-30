package com.tkyngs.hurima.controller;

import com.tkyngs.hurima.exception.ApiRequestException;
import com.tkyngs.hurima.mapper.AuthenticationMapper;
import com.tkyngs.hurima.model.domain.Role;
import com.tkyngs.hurima.model.dto.auth.AuthResponse;
import com.tkyngs.hurima.model.entity.User;
import com.tkyngs.hurima.model.dto.auth.LoginRequest;
import com.tkyngs.hurima.model.dto.auth.SignUpRequest;
import com.tkyngs.hurima.model.dto.auth.ApiResponse;
import com.tkyngs.hurima.model.dto.auth.JwtAuthResponse;
import com.tkyngs.hurima.repository.AuthorityRepository;
import com.tkyngs.hurima.repository.RoleRepository;
import com.tkyngs.hurima.repository.UserRepository;
import com.tkyngs.hurima.security.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContextException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
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
            throw new ApiRequestException("ユーザ名/メールアドレス、もしくはパスワードが間違っています", HttpStatus.FORBIDDEN);
        }
    }
}
