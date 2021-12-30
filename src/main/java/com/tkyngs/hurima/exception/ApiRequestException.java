package com.tkyngs.hurima.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/30/2021 5:33 PM
 */

@Getter
public class ApiRequestException extends RuntimeException {
  private final HttpStatus status;

  public ApiRequestException(String message, HttpStatus status) {
    super(message);
    this.status = status;
  }
}
