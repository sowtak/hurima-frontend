package com.tkyngs.hurima.model.dto.auth;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/20/2021 10:52 PM
 */

@Data
public class JwtAuthResponse {

    private String accessToken;
    private String tokenType = "Bearer";

}
