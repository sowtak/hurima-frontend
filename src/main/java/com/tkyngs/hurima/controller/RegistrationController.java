package com.tkyngs.hurima.controller;

import com.tkyngs.hurima.exception.ApiRequestException;
import com.tkyngs.hurima.exception.EmailException;
import com.tkyngs.hurima.exception.InputFieldException;
import com.tkyngs.hurima.mapper.AuthenticationMapper;
import com.tkyngs.hurima.model.dto.RegistrationRequest;
import lombok.RequiredArgsConstructor;
import org.bouncycastle.openssl.PasswordException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

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
  public ResponseEntity<String> registration(@Valid @RequestBody RegistrationRequest request, BindingResult bindingResult) {

    String password = request.getPassword();
    String password2 = request.getPassword2();
    if (password != null && !password.equals(password2)) {
      throw new RuntimeException("パスワードが一致しません");
    }

    if (bindingResult.hasErrors()) {
      throw new InputFieldException(bindingResult);
    }

    if (!authenticationMapper.registerUser(request)) {
      throw new EmailException("メールアドレスが既に使用されています");
    }

    return ResponseEntity.ok("ユーザ登録に成功しました");
  }

  @GetMapping("/activate/{code}")
  public ResponseEntity<String> activateCode(@PathVariable String code) {
    if (!authenticationMapper.activateUser(code)) {
      throw new ApiRequestException("有効化コードが見つかりません", HttpStatus.NOT_FOUND);
    } else {
      return ResponseEntity.ok("ユーザが有効化されました");
    }
  }
}
