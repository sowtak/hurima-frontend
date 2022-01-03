package com.tkyngs.hurima.exception;

import lombok.Getter;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 1/3/2022 5:33 AM
 */

@Getter
public class PasswordException extends RuntimeException {
  private final String passwordError;

  public PasswordException(String passwordError) {
    this.passwordError = passwordError;
  }
}
