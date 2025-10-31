package com.ayush.canteen_food_api.Service;

import com.ayush.canteen_food_api.Entity.ItemEntity;
import com.ayush.canteen_food_api.Entity.OrderEntity;
import com.ayush.canteen_food_api.Repository.OrderRepository;
import com.ayush.canteen_food_api.dto.Order;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService{

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Order addOrder(Order order) {
        OrderEntity orderEntity= new OrderEntity();
        BeanUtils.copyProperties(order , orderEntity);
        orderRepository.save(orderEntity);
        return order;
    }
}
