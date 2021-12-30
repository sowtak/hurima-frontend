package com.tkyngs.hurima.service.impl;

import com.tkyngs.hurima.model.entity.User;
import com.tkyngs.hurima.repository.UserRepository;
import com.tkyngs.hurima.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/29/2021 4:00 AM
 */

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  @Override
  public User findUserById(Long userId) {
    return userRepository.findById(userId);
  }

  @Override
  public User findUserByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  @Override
  public List<User> findAllUsers() {
    return userRepository.findAll();
  }
}
