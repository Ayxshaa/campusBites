package com.ayush.canteen_food_api.Controller;

import com.ayush.canteen_food_api.Service.OrderService;
import com.ayush.canteen_food_api.dto.Order;

import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/orders")
    public Order addItem(@RequestBody Order order) {
        return orderService.addOrder(order);
    }
}
