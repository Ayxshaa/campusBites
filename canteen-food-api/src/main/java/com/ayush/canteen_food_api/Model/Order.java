	package com.ayush.canteen_food_api.Model;

public class Order {
    private long id;
    private String fullName;
    private String email;
    private int phoneNo;
    private String itemName;
    private int itemQuantity;

    public Order(long id,String fullName, String email, int phoneNo, String itemName, int itemQuantity) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phoneNo = phoneNo;
        this.itemName = itemName;
        this.itemQuantity = itemQuantity;
    }

    public long getId(){
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(int phoneNo) {
        this.phoneNo = phoneNo;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public int getItemQuantity() {
        return itemQuantity;
    }

    public void setItemQuantity(int itemQuantity) {
        this.itemQuantity = itemQuantity;
    }
}
