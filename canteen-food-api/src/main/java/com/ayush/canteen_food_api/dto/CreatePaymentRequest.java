package com.ayush.canteen_food_api.dto;

public class CreatePaymentRequest {
    private long amountInRupees;
    private String connectedAccountId; // e.g., acct_1ABCxyz

    public long getAmountInRupees() {
        return amountInRupees;
    }

    public void setAmountInRupees(long amountInRupees) {
        this.amountInRupees = amountInRupees;
    }

    public String getConnectedAccountId() {
        return connectedAccountId;
    }

    public void setConnectedAccountId(String connectedAccountId) {
        this.connectedAccountId = connectedAccountId;
    }
}
