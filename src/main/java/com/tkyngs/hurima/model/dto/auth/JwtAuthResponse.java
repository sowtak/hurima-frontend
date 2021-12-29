package com.tkyngs.hurima.model.dto.auth;

import lombok.Getter;
import lombok.Setter;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/20/2021 10:52 PM
 */

@Getter
@Setter
public class JwtAuthResponse {

    private String accessToken;

    private String tokenType = "Bearer";

    public JwtAuthResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}
