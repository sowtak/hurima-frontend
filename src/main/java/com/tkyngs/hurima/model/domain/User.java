package com.tkyngs.hurima.model.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tkyngs.hurima.model.DateAudit;
import com.tkyngs.hurima.model.entity.Authority;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/20/2021 4:59 PM
 */


public class User extends DateAudit {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Email
    @Size(min = 8, max = 128)
    private String email;

    @Size(min = 3, max = 30)
    private String userName;

    @JsonIgnore
    @Size(min = 8, max = 64)
    private String password;

    private Boolean isHokudaiStudent;

    private String imageUrl;

    @JsonIgnore
    @BatchSize(size = 20)
    private Set<Authority> authorities = new HashSet<>();
}
