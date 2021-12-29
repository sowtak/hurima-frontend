package com.tkyngs.hurima.service.impl;

import com.tkyngs.hurima.model.entity.User;
import com.tkyngs.hurima.repository.UserRepository;
import com.tkyngs.hurima.security.jwt.JwtTokenProvider;
import com.tkyngs.hurima.service.AuthenticationService;
import com.tkyngs.hurima.service.email.MailSender;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;
import java.util.Optional;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/29/2021 2:24 AM
 */


public class AuthenticationServiceImpl implements AuthenticationService {

  private final JwtTokenProvider tokenProvider;
  private final MailSender mailSender;
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;

  @Value("${hostname}")
  private String hostname;

  @Override
  public Map<String, String> login(String email) {
    Optional<User> user = userRepository.findByEmail(email).orElse(new User());
    String userRole = user.getRoles().iterator().next().name();
  }

  @Override
  public boolean registerUser(User user) {
    return false;
  }

  @Override
  public boolean activateUser(String code) {
    return false;
  }
}
