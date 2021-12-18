package com.tkyngs.hurima.model.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tkyngs.hurima.model.BaseModel;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.security.AuthProvider;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/18/2021 6:48 PM
 */

@Entity
@Table(name = "user")
@Getter
@Setter
public class User extends BaseModel {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Email
    @Size(min = 8, max = 128)
    @Column(length = 30, unique = true, nullable = false)
    private String email;

    @Size(min = 1, max = 30)
    @Column(name = "username", length = 30, nullable = false)
    private String userName;

    @JsonIgnore
    @Size(min = 8, max = 64)
    @Column(name = "password_hash", length = 60, nullable = true)
    private String password;

    private String imageUrl;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "name")})
    @BatchSize(size = 20)
    private Set<Authority> authorities = new HashSet<>();
}
