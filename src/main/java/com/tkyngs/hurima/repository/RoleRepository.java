package com.tkyngs.hurima.repository;

import com.tkyngs.hurima.model.domain.RoleName;
import com.tkyngs.hurima.model.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/22/2021 8:27 PM
 */

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
