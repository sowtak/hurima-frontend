package com.tkyngs.hurima.security.jwt;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;


/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/30/2021 5:16 PM
 */

@Getter
public class JwtAuthenticationException extends AuthenticationException {
  private HttpStatus httpStatus;

  public JwtAuthenticationException(String message) {
    super(message);
  }

  public JwtAuthenticationException(String message, HttpStatus httpStatus) {
    super(message);
    this.httpStatus = httpStatus;
  }
}
