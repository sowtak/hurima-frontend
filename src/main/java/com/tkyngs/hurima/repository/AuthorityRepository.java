package com.tkyngs.hurima.repository;

import com.tkyngs.hurima.model.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/19/2021 12:09 PM
 */

@Repository
public interface AuthorityRepository extends JpaRepository<Role, String> {
    Optional<Role> findByName(Role authority);
}
