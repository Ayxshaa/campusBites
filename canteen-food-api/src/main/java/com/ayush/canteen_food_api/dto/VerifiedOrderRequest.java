package com.ayush.canteen_food_api.dto;

import java.util.List;
import java.util.Map;

// This DTO captures the entire request from CheckoutPage.js
public class VerifiedOrderRequest {

    // Payment IDs
    private String razorpay_payment_id;
    private String razorpay_order_id;
    private String razorpay_signature;

    // Customer Info
    private Map<String, String> customerInfo;

    // Cart Items
    private List<Map<String, Object>> cartItems;
    
    // Total Price
    private Double totalPrice;

    // Getters and Setters
    public String getRazorpay_payment_id() {
        return razorpay_payment_id;
    }

    public void setRazorpay_payment_id(String razorpay_payment_id) {
        this.razorpay_payment_id = razorpay_payment_id;
    }

    public String getRazorpay_order_id() {
        return razorpay_order_id;
    }

    public void setRazorpay_order_id(String razorpay_order_id) {
        this.razorpay_order_id = razorpay_order_id;
    }

    public String getRazorpay_signature() {
        return razorpay_signature;
    }

    public void setRazorpay_signature(String razorpay_signature) {
        this.razorpay_signature = razorpay_signature;
    }

    public Map<String, String> getCustomerInfo() {
        return customerInfo;
    }

    public void setCustomerInfo(Map<String, String> customerInfo) {
        this.customerInfo = customerInfo;
    }

    public List<Map<String, Object>> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<Map<String, Object>> cartItems) {
        this.cartItems = cartItems;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }
}