package com.tkyngs.hurima.exception;

import lombok.Getter;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/30/2021 5:29 PM
 */

@Getter
public class EmailException extends RuntimeException {
  private final String emailError;

  public EmailException(String emailError) {
    this.emailError = emailError;
  }
}





