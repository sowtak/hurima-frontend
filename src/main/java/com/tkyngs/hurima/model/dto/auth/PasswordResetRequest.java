package com.tkyngs.hurima.model.dto.auth;

import lombok.Data;

import javax.validation.constraints.Size;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 1/5/2022 9:12 AM
 */

@Data
public class PasswordResetRequest {
  private String email;

  @Size(min = 8, max = 40, message = "Password must be between 8 and 40 characters long")
  private String password;

  @Size(min = 8, max = 40, message = "Confirmation password must be between 8 and 40 characters long")
  private String password2;
}
