package com.tkyngs.hurima.model.entity;

import lombok.*;

import javax.persistence.*;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 1/8/2022 7:52 AM
 */

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "items")
public class Item {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @SequenceGenerator(name = "items_id_seq", sequenceName = "items_id_seq", initialValue = 4, allocationSize = 1)
  private Long id;

  private String name;
  @ManyToOne
  @JoinColumn(name = "user_id")
  private User seller;
  private String sellerEmailDomain;
  private String condition;
  private String description;
  private String price;
}
