package com.tkyngs.hurima.controller;

import com.tkyngs.hurima.exception.ApiRequestException;
import com.tkyngs.hurima.mapper.AuthenticationMapper;
import com.tkyngs.hurima.model.dto.auth.AuthenticationResponse;
import com.tkyngs.hurima.model.dto.auth.AuthenticationRequest;
import com.tkyngs.hurima.model.dto.auth.PasswordResetRequest;
import com.tkyngs.hurima.service.impl.AuthenticationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;


/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/19/2021 5:09 AM
 */

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

  private final Logger log = LoggerFactory.getLogger(getClass());

  private final AuthenticationManager authenticationManager;
  private final AuthenticationMapper authenticationMapper;
  private final AuthenticationServiceImpl authenticationService;

  @PostMapping("/login")
  public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
    try {
      log.info("TRYING TO LOG IN");
      //System.out.println(request.getEmail() + request.getPassword());
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
      log.info("LOGIN SUCCESSFUL");
      return ResponseEntity.ok(authenticationMapper.login(request.getEmail()));
    } catch (BadCredentialsException e) {
      log.error("BAD CREDENTIALS");
      throw new BadCredentialsException("Bad Credentials", e);
    } catch (AuthenticationException e) {
      log.error("LOGIN FAILURE");
      System.out.println(e);
      throw new ApiRequestException("Email or Password is incorrect", HttpStatus.FORBIDDEN);
    }
  }

  @PostMapping("/forgot-password")
  public ResponseEntity<String> forgotPassword(@RequestBody PasswordResetRequest request) throws RuntimeException {
    log.info("RECEIVED REQUEST");
    if (!authenticationService.sendPasswordResetCode(request.getEmail())) {
      log.info("ERR");
      throw new ApiRequestException("Email not found", HttpStatus.BAD_REQUEST);
    }
    log.info("RESET");
    return ResponseEntity.ok("Password reset code is sent to your email.");
  }
}
