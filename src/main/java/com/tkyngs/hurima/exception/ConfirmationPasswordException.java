package com.tkyngs.hurima.exception;

import lombok.Getter;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 1/3/2022 5:34 AM
 */

@Getter
public class ConfirmationPasswordException extends RuntimeException {
  private final String password2Error;

  public ConfirmationPasswordException(String password2Error) {
    this.password2Error = password2Error;
  }
}
