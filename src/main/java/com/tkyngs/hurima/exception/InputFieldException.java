package com.tkyngs.hurima.exception;

import org.springframework.validation.BindingResult;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/29/2021 6:10 AM
 */


public class InputFieldException extends RuntimeException{

  private BindingResult bindingResult;

  public InputFieldException(BindingResult bindingResult) {
    this.bindingResult = bindingResult;
  }
}
