package com.tkyngs.hurima.service;

import com.tkyngs.hurima.model.entity.User;

import java.util.Map;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/28/2021 9:47 PM
 */

public interface AuthenticationService {

  Map<String, String> login(String email);

  boolean registerUser(User user);

  boolean activateUser(String code);
}
