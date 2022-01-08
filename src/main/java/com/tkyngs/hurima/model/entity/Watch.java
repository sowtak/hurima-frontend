package com.tkyngs.hurima.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 1/8/2022 10:05 AM
 */

@Entity
@Getter
@Setter
@Table
public class Watch {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "watch_date")
  private LocalDateTime watchDate;

  @ManyToOne
  @JoinColumn(name = "users_id")
  private User user;

  @OneToOne
  private Item item;

  public Watch() {
    this.watchDate = LocalDateTime.now().withNano(0);
  }
}
