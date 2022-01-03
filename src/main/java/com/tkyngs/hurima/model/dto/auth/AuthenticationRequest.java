package com.tkyngs.hurima.model.dto.auth;

import lombok.Data;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/19/2021 5:29 AM
 */

@Data
public class AuthenticationRequest {
    private String email;
    private String password;
}
