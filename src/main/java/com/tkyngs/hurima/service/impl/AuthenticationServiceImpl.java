package com.tkyngs.hurima.service.impl;

import com.tkyngs.hurima.model.domain.Role;
import com.tkyngs.hurima.model.entity.User;
import com.tkyngs.hurima.repository.UserRepository;
import com.tkyngs.hurima.security.jwt.JwtTokenProvider;
import com.tkyngs.hurima.service.AuthenticationService;
import com.tkyngs.hurima.service.email.MailSender;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.*;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/29/2021 2:24 AM
 */

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

  private final JwtTokenProvider jwtTokenProvider;
  private final MailSender mailSender;
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;

  @Value("${hostname}")
  private String hostname;


  /**
   *
   * @param user User Entity
   * @return If user already exists in db return false otherwise true.
   */
  @Override
  public boolean registerUser(User user) {
    User userFromDb = userRepository.findByEmail(user.getEmail());
    if (userFromDb != null) {
      return false;
    }
    user.setActive(false);
    user.setRoles(Collections.singleton(Role.USER));
    user.setActivationCode(UUID.randomUUID().toString());
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    userRepository.save(user);

    String subject = "Activation code";
    String template = "registrwation-template";
    Map<String, Object> attributes = new HashMap<>();
    attributes.put("username", user.getUsername());
    attributes.put("registrationUrl", "http://" + hostname + "/activate/" + user.getActivationCode());
    try {
      mailSender.sendMessage(user.getEmail(), subject, template, attributes);
    } catch (MessagingException ex) {
      System.out.println("Following exception occured: " + ex);
    }
    return true;
  }

  @Override
  public boolean activateUser(String code) {
    User user = userRepository.findByActivationCode(code);
    if (user == null) return false;
    user.setActivationCode(code);
    userRepository.save(user);
    return true;
  }

  @Override
  public Map<String, String> login(String email) {
    User user = userRepository.findByEmail(email);
    String userRole = user.getRoles().iterator().next().name();
    String token = jwtTokenProvider.generateToken(email, userRole);

    Map<String, String> response = new HashMap<>();
    response.put("email", email);
    response.put("token", token);
    response.put("userRole", userRole);
    return response;
  }
}
