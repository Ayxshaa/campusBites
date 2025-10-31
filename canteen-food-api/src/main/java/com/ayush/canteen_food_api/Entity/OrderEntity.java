package com.ayush.canteen_food_api.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "food_order")
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String fullName;
    private String email;
    private int phoneNo;
    private String itemName;
    private int itemQuantity;

    public OrderEntity(){

    }

    public OrderEntity(long id,String fullName, String email, int phoneNo, String itemName, int itemQuantity) {
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


//package com.ayush.canteen_food_api.dto;
//
//public class CreatePaymentRequest {
//  private long amountInRupees;
//  private String connectedAccountId; // e.g., acct_1ABCxyz
//
//  public long getAmountInRupees() {
//      return amountInRupees;
//  }
//
//  public void setAmountInRupees(long amountInRupees) {
//      this.amountInRupees = amountInRupees;
//  }
//
//  public String getConnectedAccountId() {
//      return connectedAccountId;
//  }
//
//  public void setConnectedAccountId(String connectedAccountId) {
//      this.connectedAccountId = connectedAccountId;
//  }
//}

