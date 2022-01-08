package com.tkyngs.hurima.model.entity;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/18/2021 6:48 PM
 */

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "activation_code")
    private String activationCode;

    @Column(name = "password_reset_code")
    private String passwordResetCode;

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "email_domain")
    private String emailDomain;

    @Column(name = "role")
    private String role;

    @OneToMany(mappedBy = "seller")
    private List<Item> items;

    @OneToMany(mappedBy = "user")
    private List<Watch> watchlist;

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
