package com.tkyngs.hurima.model.dto.user;

import com.tkyngs.hurima.model.domain.Role;
import lombok.Data;

import java.util.Set;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/30/2021 2:25 AM
 */

@Data
public class UserResponse {
  private Long id;
  private String username;
  private String email;
  private boolean isActive;
  private String activationCode;
  private Set<Role> roles;
}
