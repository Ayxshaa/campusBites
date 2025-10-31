package com.ayush.canteen_food_api.Service;

import com.ayush.canteen_food_api.Entity.LiveOrder;
import com.ayush.canteen_food_api.Entity.PastOrder;
import com.ayush.canteen_food_api.dto.VerifiedOrderRequest;

import java.util.List;
import java.util.Map;

public interface AdminOrderService {

    LiveOrder saveLiveOrder(VerifiedOrderRequest request);

    List<LiveOrder> getAllLiveOrders();

    List<PastOrder> getAllPastOrders();

    PastOrder moveOrderToPast(Long liveOrderId, String status);
    
    Map<String, Object> getMyOrdersByPhone(String phone);
}