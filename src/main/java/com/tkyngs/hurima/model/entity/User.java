package com.tkyngs.hurima.model.entity;

import com.tkyngs.hurima.model.domain.Role;
import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/18/2021 6:48 PM
 */

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "users_id_seq"
    )
    @SequenceGenerator(
            name = "users_id_seq",
            sequenceName = "users_id_seq",
            initialValue = 4,
            allocationSize = 1
    )
    private Long id;

    private String email;
    private String username;
    private String password;
    private String activationCode;
    private String passwordResetCode;
    private String imageUrl;
    private boolean isActive;
    private String domain;

    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @CollectionTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "user_id")
    )
    @Enumerated(EnumType.STRING)
    private Set<Role> roles;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        User user = (User) o;
        return id != null && Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
