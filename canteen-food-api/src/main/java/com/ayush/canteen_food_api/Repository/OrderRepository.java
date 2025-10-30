package com.ayush.canteen_food_api.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ayush.canteen_food_api.Entity.OrderEntity;

public interface OrderRepository extends JpaRepository<OrderEntity,Long> {
}
