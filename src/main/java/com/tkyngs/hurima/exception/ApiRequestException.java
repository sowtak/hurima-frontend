package com.tkyngs.hurima.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/30/2021 5:33 PM
 */

@Getter
public class ApiRequestException extends AuthenticationException {
  private final HttpStatus status;

  public ApiRequestException(String message, HttpStatus status) {
    super(message);
    this.status = status;
  }
}
