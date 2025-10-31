package com.ayush.canteen_food_api.Service;

import com.ayush.canteen_food_api.Entity.LiveOrder;
import com.ayush.canteen_food_api.Entity.PastOrder;
import com.ayush.canteen_food_api.Repository.LiveOrderRepository;
import com.ayush.canteen_food_api.Repository.PastOrderRepository;
import com.ayush.canteen_food_api.dto.VerifiedOrderRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminOrderServiceImpl implements AdminOrderService {

    @Autowired
    private LiveOrderRepository liveOrderRepository;

    @Autowired
    private PastOrderRepository pastOrderRepository;

    @Autowired
    private ObjectMapper objectMapper; // Spring Boot automatically provides this

    @Override
    @Transactional
    public LiveOrder saveLiveOrder(VerifiedOrderRequest request) {
        LiveOrder liveOrder = new LiveOrder();

        liveOrder.setRazorpayOrderId(request.getRazorpay_order_id());
        liveOrder.setRazorpayPaymentId(request.getRazorpay_payment_id());

        liveOrder.setCustomerName(request.getCustomerInfo().get("name"));
        liveOrder.setCustomerEmail(request.getCustomerInfo().get("email"));
        liveOrder.setCustomerPhone(request.getCustomerInfo().get("phone"));
        
        liveOrder.setTotalAmount(request.getTotalPrice());
        liveOrder.setOrderDate(LocalDateTime.now());

        try {
            // Convert cart items list to JSON string
            String itemsJson = objectMapper.writeValueAsString(request.getCartItems());
            liveOrder.setItemsJson(itemsJson);
        } catch (Exception e) {
            System.err.println("Error converting cart items to JSON: " + e.getMessage());
            // Handle exception properly, maybe throw a custom exception
        }

        return liveOrderRepository.save(liveOrder);
    }

    @Override
    public List<LiveOrder> getAllLiveOrders() {
        // Return newest orders first
        return liveOrderRepository.findAll(org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "orderDate"));
    }

    @Override
    public List<PastOrder> getAllPastOrders() {
        // Return newest orders first
        return pastOrderRepository.findAll(org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "orderDate"));
    }

    @Override
    @Transactional
    public PastOrder moveOrderToPast(Long liveOrderId, String status) {
        // 1. Find the live order
        LiveOrder liveOrder = liveOrderRepository.findById(liveOrderId)
                .orElseThrow(() -> new RuntimeException("LiveOrder not found with id: " + liveOrderId));

        // 2. Create PastOrder from LiveOrder
        PastOrder pastOrder = new PastOrder(liveOrder);
        pastOrder.setStatus(status);

        // 3. Save the new PastOrder
        PastOrder savedPastOrder = pastOrderRepository.save(pastOrder);

        // 4. Delete the LiveOrder
        liveOrderRepository.delete(liveOrder);

        return savedPastOrder;
    }
    
    @Override
    public Map<String, Object> getMyOrdersByPhone(String phone) {
        List<LiveOrder> liveOrders = liveOrderRepository.findByCustomerPhoneOrderByOrderDateDesc(phone);
        List<PastOrder> pastOrders = pastOrderRepository.findByCustomerPhoneOrderByOrderDateDesc(phone);
        
        Map<String, Object> myOrders = new HashMap<>();
        myOrders.put("liveOrders", liveOrders);
        myOrders.put("pastOrders", pastOrders);
        
        return myOrders;
    }
}