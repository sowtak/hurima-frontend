package com.tkyngs.hurima.model.dto.payload.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/19/2021 12:07 PM
 */

@Getter
@Setter
public class SignUpRequest {

    @NotBlank
    @Size(min = 3, max = 30)
    private String username;

    @NotBlank
    @Email
    @Size(min = 8, max = 128)
    private String email;

    @NotBlank
    @Size(min = 8, max = 64)
    private String password;

}
