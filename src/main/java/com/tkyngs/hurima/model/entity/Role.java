package com.tkyngs.hurima.model.entity;

import com.tkyngs.hurima.model.DateAudit;
import com.tkyngs.hurima.model.domain.RoleName;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/18/2021 7:19 PM
 */
@Entity
@Table(name = "roles")
@NoArgsConstructor
@Getter
@Setter
public class Role extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 20)
    private RoleName name;

    public Role(RoleName name) {
        this.name = name;
    }

}
