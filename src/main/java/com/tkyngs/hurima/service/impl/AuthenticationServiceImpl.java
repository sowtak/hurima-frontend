package com.tkyngs.hurima.service.impl;

import com.tkyngs.hurima.model.domain.Role;
import com.tkyngs.hurima.model.entity.User;
import com.tkyngs.hurima.repository.UserRepository;
import com.tkyngs.hurima.security.jwt.JwtTokenProvider;
import com.tkyngs.hurima.service.AuthenticationService;
import com.tkyngs.hurima.service.email.MailSender;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

  private static final Logger log = LoggerFactory.getLogger(Logger.class);
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
    String template = "registration-template";
    Map<String, Object> attributes = new HashMap<>();
    attributes.put("username", user.getUsername());
    attributes.put("registrationUrl", "http://" + hostname + "/registration/activate/" + user.getActivationCode());
    try {
      log.info("Sending activation email...");
      mailSender.sendMessage(user.getEmail(), subject, template, attributes);
    } catch (MessagingException e) {
      e.printStackTrace();
    }
    return true;
  }

  @Override
  public boolean activateUser(String code) {
    log.info("ACTIVATING USER");
    User user = userRepository.findByActivationCode(code);
    if (user == null) {
      log.info("USER WITH THE ACTIVATION CODE NOT FOUND");
      return false;
    }
    user.setActivationCode(code);
    user.setActive(true);
    userRepository.save(user);
    log.info("USER ACTIVATED.");
    return true;
  }

  @Override
  public Map<String, String> login(String email) {
    log.info("LOGGING USER IN");
    User user = userRepository.findByEmail(email);
    System.out.println(user);
    String userRole = user.getRoles().iterator().next().name();
    String token = jwtTokenProvider.generateToken(email, userRole);

    Map<String, String> response = new HashMap<>();
    response.put("email", email);
    response.put("token", token);
    response.put("userRole", userRole);
    return response;
  }

  @Override
  public boolean sendPasswordResetCode(String email) {
    log.info("SENDING PASSWORD RESET CODE TO GIVEN EMAIL");
    User user = userRepository.findByEmail(email);
    if (user == null) return false;
    user.setPasswordResetCode(UUID.randomUUID().toString());
    userRepository.save(user);

    String subject = "Password Reset";
    String template = "password-reset-template";
    Map<String, Object> attributes = new HashMap<>();
    attributes.put("PasswordResetUrl", "http://" + hostname + "/reset-password" + user.getPasswordResetCode());
    try {
      mailSender.sendMessage(user.getEmail(), subject, template, attributes);
      return true;
    } catch (MessagingException e) {
      log.info(e.toString());
      e.printStackTrace();
      return false;
    }
  }

}
