package com.tkyngs.hurima.model.dto.auth;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/19/2021 12:08 PM
 */

@Data
public class AuthResponse {

    private String accessToken;
    private String tokenType = "Bearer";
    private String userRole;
    private String email;
}
