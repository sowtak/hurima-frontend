package com.tkyngs.hurima.repository;

import com.tkyngs.hurima.model.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Sowa Takayanagi
 * @version 1.0.0
 * @since 1/9/2022 2:32 AM
 */

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

  List<Item> findAllItems(Long userId);
}
