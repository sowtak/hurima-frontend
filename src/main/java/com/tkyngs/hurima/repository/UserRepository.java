package com.tkyngs.hurima.repository;

import com.tkyngs.hurima.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/19/2021 5:18 AM
 */

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
    User findByUsernameOrEmail(String username, String email);
    User findByUsername(String username);
    User findWithAuthoritiesByEmail(String email);
    User findByActivationCode(String code);

    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

}
