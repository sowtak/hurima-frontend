package com.tkyngs.hurima.mapper;

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

  private User convertToEntity(UserReq)
}
