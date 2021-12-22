package com.tkyngs.hurima.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tkyngs.hurima.model.DateAudit;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/18/2021 6:48 PM
 */

@Data
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @SequenceGenerator(
            name = "user_id_seq",
            sequenceName = "user_id_seq",
            initialValue = 4,
            allocationSize = 3
    )
    private Long id;

    @Size(min = 8, max = 128)
    @Column(length = 30, unique = true, nullable = false)
    private String email;

    @Size(min = 1, max = 30)
    @Column(name = "username", length = 30, nullable = false)
    private String username;

    @JsonIgnore
    @Size(min = 8, max = 64)
    @Column(name = "password_hash", length = 60, nullable = false)
    private String password;

    @Column(name = "is_hokudai_student", nullable = false)
    private Boolean isHokudaiStudent;

    private String imageUrl;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "name")})
    @BatchSize(size = 20)
    private Set<Role> roles = new HashSet<>();

}
