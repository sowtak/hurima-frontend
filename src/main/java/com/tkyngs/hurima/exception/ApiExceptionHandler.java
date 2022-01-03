package com.tkyngs.hurima.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.IdentityHashMap;
import java.util.Map;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 1/3/2022 5:36 AM
 */

@ControllerAdvice
public class ApiExceptionHandler {

  @ExceptionHandler(ApiRequestException.class)
  public ResponseEntity<String> handleApiRequestException(ApiRequestException e) {
    return ResponseEntity.status(e.getStatus()).body(e.getMessage());
  }

  @ExceptionHandler(ConfirmationPasswordException.class)
  public ResponseEntity<ConfirmationPasswordException> handleConfirmationPasswordException(ConfirmationPasswordException e) {
    return ResponseEntity.badRequest().body(new ConfirmationPasswordException(e.getPassword2Error()));
  }

  @ExceptionHandler(PasswordException.class)
  public ResponseEntity<PasswordException> handlePasswordException(PasswordException e) {
    return ResponseEntity.badRequest().body(new PasswordException(e.getPasswordError()));
  }

  @ExceptionHandler(EmailException.class)
  public ResponseEntity<EmailException> handleEmailException(EmailException e) {
    return ResponseEntity.badRequest().body(new EmailException(e.getEmailError()));
  }

  @ExceptionHandler(InputFieldException.class)
  public ResponseEntity<Map<String, String>> handleInputFieldException(InputFieldException e) {
    InputFieldException inputFieldException = new InputFieldException(e.getBindingResult());
    return ResponseEntity.badRequest().body(inputFieldException.getErrorsMap());
  }


}
