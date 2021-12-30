package com.tkyngs.hurima.exception;

import lombok.Getter;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/29/2021 6:10 AM
 */

@Getter
public class InputFieldException extends RuntimeException{

  private BindingResult bindingResult;
  private final Map<String, String> errorsMap;

  public InputFieldException(BindingResult bindingResult) {
    this.bindingResult = bindingResult;
    this.errorsMap = bindingResult.getFieldErrors().stream().collect(collector);
  }

  Collector<FieldError, ?, Map<String, String>> collector = Collectors.toMap(
    fieldError -> fieldError.getField() + "Error",
    FieldError::getDefaultMessage
  );
}
