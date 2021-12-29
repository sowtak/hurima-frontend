package com.tkyngs.hurima.model.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/29/2021 5:28 AM
 */

@Data
public class RegistrationRequest {

  @NotBlank(message = "このフィールドは空にできません")
  private String username;

  @NotBlank(message = "メールアドレスが間違っています")
  @NotBlank(message = "このフィールドは空にできません")
  private String email;

  @Size(min = 8, max = 32, message = "8文字以上32文字以下のパスワードを入力してください")
  private String password;

  @Size(min = 8, max = 32, message = "8文字以上32文字以下の確認パスワードを入力してください")
  private String password2;

}
