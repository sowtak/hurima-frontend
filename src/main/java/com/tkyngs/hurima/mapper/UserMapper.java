package com.tkyngs.hurima.mapper;

import com.tkyngs.hurima.model.dto.RegistrationRequest;
import com.tkyngs.hurima.model.dto.user.UserRequest;
import com.tkyngs.hurima.model.dto.user.UserResponse;
import com.tkyngs.hurima.model.entity.User;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/29/2021 3:39 AM
 */

@Component
@RequiredArgsConstructor
public class UserMapper {

  private final ModelMapper modelMapper;

  private final UserMapper userMapper;

  private User convertToEntity(UserRequest userRequest) {
    return modelMapper.map(userRequest, User.class);
  }

  User convertToEntity(RegistrationRequest registrationRequest) {
    return modelMapper.map(registrationRequest, User.class);
  }

  UserResponse convertToResponseDto(User user) {
    return modelMapper.map(user, UserResponse.class);
  }

  
}
