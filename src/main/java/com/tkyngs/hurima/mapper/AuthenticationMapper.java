package com.tkyngs.hurima.mapper;

import com.tkyngs.hurima.model.dto.RegistrationRequest;
import com.tkyngs.hurima.model.dto.auth.AuthenticationResponse;
import com.tkyngs.hurima.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/28/2021 7:42 PM
 */

@Component
@RequiredArgsConstructor
public class AuthenticationMapper {

  private final AuthenticationService authenticationService;
  private final UserMapper userMapper;

  public boolean registerUser(RegistrationRequest request) {
    return authenticationService.registerUser(userMapper.convertToEntity(request));
  }

  public boolean activateUser(String code) {
    return authenticationService.activateUser(code);
  }

  public AuthenticationResponse login(String email) {
    Map<String, String> result = authenticationService.login(email);
    AuthenticationResponse response = new AuthenticationResponse();
    response.setEmail(result.get("email"));
    response.setToken(result.get("token"));
    response.setUserRole(result.get("userRole"));
    return response;
  }
}
