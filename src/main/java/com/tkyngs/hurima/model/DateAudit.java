package com.tkyngs.hurima.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;
import java.time.Instant;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 12/18/2021 6:42 PM
 */

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@JsonSerialize
@JsonIgnoreProperties(
        allowGetters = true,
        value = {"created_at", "updated_at"})
@JsonAutoDetect
@Getter
@Setter
public abstract class DateAudit implements Serializable {

    @CreatedDate
    @Column(name = "created_at")
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private Instant updatedAt;

}
