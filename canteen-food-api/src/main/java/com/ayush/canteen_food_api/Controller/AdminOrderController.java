package com.ayush.canteen_food_api.Controller;

import com.ayush.canteen_food_api.Entity.LiveOrder;
import com.ayush.canteen_food_api.Entity.PastOrder;
import com.ayush.canteen_food_api.Service.AdminOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {

    @Autowired
    private AdminOrderService adminOrderService;

    // --- Admin Endpoints ---

    @GetMapping("/live-orders")
    public ResponseEntity<List<LiveOrder>> getLiveOrders() {
        List<LiveOrder> orders = adminOrderService.getAllLiveOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/past-orders")
    public ResponseEntity<List<PastOrder>> getPastOrders() {
        List<PastOrder> orders = adminOrderService.getAllPastOrders();
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/complete/{id}")
    public ResponseEntity<PastOrder> markOrderCompleted(@PathVariable Long id) {
        PastOrder pastOrder = adminOrderService.moveOrderToPast(id, "COMPLETED");
        return ResponseEntity.ok(pastOrder);
    }

    @PostMapping("/reject/{id}")
    public ResponseEntity<PastOrder> markOrderRejected(@PathVariable Long id) {
        PastOrder pastOrder = adminOrderService.moveOrderToPast(id, "REJECTED");
        return ResponseEntity.ok(pastOrder);
    }

    // --- User-Facing Endpoint (for TrackOrdersPage) ---
    // Note: We place it in AdminController for simplicity, but it's for the user.
    // You can create a separate controller for this if you prefer.
    
    @GetMapping("/my-orders") // This is /api/admin/my-orders
    public ResponseEntity<Map<String, Object>> getMyOrders(@RequestParam String phone) {
        if (phone == null || phone.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Map<String, Object> myOrders = adminOrderService.getMyOrdersByPhone(phone);
        return ResponseEntity.ok(myOrders);
    }
}