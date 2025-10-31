package com.ayush.canteen_food_api.Repository;

import com.ayush.canteen_food_api.Entity.PastOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PastOrderRepository extends JpaRepository<PastOrder, Long> {
    List<PastOrder> findByCustomerPhoneOrderByOrderDateDesc(String customerPhone);
}