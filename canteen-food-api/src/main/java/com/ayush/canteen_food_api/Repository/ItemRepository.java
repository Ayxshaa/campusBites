package com.ayush.canteen_food_api.Repository;

import com.ayush.canteen_food_api.Entity.ItemEntity;
import com.ayush.canteen_food_api.dto.Item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<ItemEntity , Long> {
    public List<ItemEntity> findByCategory(String category);
}
