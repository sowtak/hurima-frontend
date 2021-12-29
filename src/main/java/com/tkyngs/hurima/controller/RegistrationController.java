package com.tkyngs.hurima.controller;

import com.tkyngs.hurima.mapper.AuthenticationMapper;
import com.tkyngs.hurima.model.dto.RegistrationRequest;
import lombok.RequiredArgsConstructor;
import org.bouncycastle.openssl.PasswordException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/28/2021 7:28 PM
 */


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/registration")
public class RegistrationController {

  private final AuthenticationMapper authenticationMapper;

  @PostMapping
  public ResponseEntity<String> registration(@Valid @RequestBody RegistrationRequest request, BindingResult result) {
    String password = request.getPassword();
    String password2 = request.getPassword2();
    if (password != null && !password.equals(password2)) {
      throw new RuntimeException("パスワードが一致しません");
    }

    if (result.hasErrors()) {
      throw new RuntimeException(result);
    }


  }
}
