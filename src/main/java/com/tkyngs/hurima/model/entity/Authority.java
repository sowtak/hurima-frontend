package com.tkyngs.hurima.model.entity;

import com.tkyngs.hurima.model.DateAudit;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Objects;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/18/2021 7:19 PM
 */
@Entity
@Table(name = "authority")
@Getter
@Setter
public class Authority extends DateAudit {

    private static final long serialVersionUID = 1L;

    @NotNull
    @Size(min = 0, max = 20)
    @Id
    @Column(length = 20)
    private String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Authority authority = (Authority) o;

        return Objects.equals(name, authority.name);
    }

    @Override
    public int hashCode() {
        return name != null ? name.hashCode() : 0;
    }
}
