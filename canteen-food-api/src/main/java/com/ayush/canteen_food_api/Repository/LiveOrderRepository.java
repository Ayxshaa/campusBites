package com.ayush.canteen_food_api.Repository;

import com.ayush.canteen_food_api.Entity.LiveOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LiveOrderRepository extends JpaRepository<LiveOrder, Long> {
    List<LiveOrder> findByCustomerPhoneOrderByOrderDateDesc(String customerPhone);
}