package com.tkyngs.hurima.service;

import com.tkyngs.hurima.model.entity.User;

import java.util.List;
import java.util.Optional;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/29/2021 3:55 AM
 */

public interface UserService {

  Optional<User> findUserById(Long userId);

  Optional<User> findUserByEmail(String email);

  List<User> findAllUsers();

}
