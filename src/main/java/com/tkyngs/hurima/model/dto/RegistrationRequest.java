package com.tkyngs.hurima.model.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/29/2021 5:28 AM
 */

@Data
public class RegistrationRequest {

  @NotBlank(message = "This field should not be blank")
  private String username;

  @NotBlank(message = "Incorrect email.")
  @NotBlank(message = "This field should not be blank")
  private String email;

  @Size(min = 8, max = 32, message = "Password should be 8 to 32 characters")
  private String password;

  @Size(min = 8, max = 32, message = "Password should be 8 to 32 characters")
  private String password2;
}
