package com.tkyngs.hurima.security;

import com.tkyngs.hurima.model.entity.User;
import com.tkyngs.hurima.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/31/2021 2:37 AM
 */

@Service("userDetailsServiceImpl")
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

  private final UserRepository userRepository;

  /**
   *
   * @param email (because token is set using email)
   * @return UserDetails
   * @throws UsernameNotFoundException ** email **
   */
  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    User user = userRepository.findByEmail(email);

    if (user == null) {
      throw new UsernameNotFoundException("User not found.");
    }

    if (user.getActivationCode() != null) {
      throw new LockedException("Email not activated.");
    }

    return UserPrincipal.create(user);
  }
}
