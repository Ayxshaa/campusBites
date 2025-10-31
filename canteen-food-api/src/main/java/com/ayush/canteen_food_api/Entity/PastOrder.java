package com.ayush.canteen_food_api.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "past_orders")
public class PastOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    // Original Live Order ID
    private long originalOrderId;

    // Razorpay IDs
    private String razorpayOrderId;
    private String razorpayPaymentId;

    // Customer Info
    private String customerName;
    private String customerEmail;
    private String customerPhone;

    // Order Info
    private Double totalAmount;
    private LocalDateTime orderDate;
    
    @Lob
    @Column(columnDefinition = "TEXT")
    private String itemsJson;

    // Status
    private String status; // "COMPLETED" or "REJECTED"
    private LocalDateTime completedDate;

    // Constructor to copy from LiveOrder
    public PastOrder(LiveOrder liveOrder) {
        this.originalOrderId = liveOrder.getId();
        this.razorpayOrderId = liveOrder.getRazorpayOrderId();
        this.razorpayPaymentId = liveOrder.getRazorpayPaymentId();
        this.customerName = liveOrder.getCustomerName();
        this.customerEmail = liveOrder.getCustomerEmail();
        this.customerPhone = liveOrder.getCustomerPhone();
        this.totalAmount = liveOrder.getTotalAmount();
        this.orderDate = liveOrder.getOrderDate();
        this.itemsJson = liveOrder.getItemsJson();
        this.completedDate = LocalDateTime.now();
    }
    
    public PastOrder() {
    }

    // Getters and Setters

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getOriginalOrderId() {
        return originalOrderId;
    }

    public void setOriginalOrderId(long originalOrderId) {
        this.originalOrderId = originalOrderId;
    }

    public String getRazorpayOrderId() {
        return razorpayOrderId;
    }

    public void setRazorpayOrderId(String razorpayOrderId) {
        this.razorpayOrderId = razorpayOrderId;
    }

    public String getRazorpayPaymentId() {
        return razorpayPaymentId;
    }

    public void setRazorpayPaymentId(String razorpayPaymentId) {
        this.razorpayPaymentId = razorpayPaymentId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public String getItemsJson() {
        return itemsJson;
    }

    public void setItemsJson(String itemsJson) {
        this.itemsJson = itemsJson;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCompletedDate() {
        return completedDate;
    }

    public void setCompletedDate(LocalDateTime completedDate) {
        this.completedDate = completedDate;
    }
}
