package com.tkyngs.hurima.model.dto.auth;

import lombok.Data;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/19/2021 12:08 PM
 */

@Data
public class AuthenticationResponse {
    private String email;
    private String token;
    private String userRole;
}
