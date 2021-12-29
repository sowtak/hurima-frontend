package com.tkyngs.hurima.model.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/20/2021 10:50 PM
 */

@Getter
@Setter
@AllArgsConstructor
public class ApiResponse {

    private Boolean success;

    private String message;
}
