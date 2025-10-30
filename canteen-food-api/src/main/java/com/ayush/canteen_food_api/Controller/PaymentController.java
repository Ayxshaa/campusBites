package com.ayush.canteen_food_api.Controller; // <-- Your package name might be different

import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class PaymentController {

    @Value("${razorpay.key.id}")
    private String keyId;

    @Value("${razorpay.key.secret}")
    private String keySecret;

    // === ENDPOINT 1: CREATE ORDER ===
    @PostMapping("/create-order")
    @ResponseBody
    public String createOrder(@RequestBody Map<String, Object> data) {
        System.out.println("--- Create Order API hit ---");
        try {
//            int amount = Integer.parseInt(data.get("amount").toString()) * 100;
        	int amount = (int) Math.round(Double.parseDouble(data.get("amount").toString()) * 100);
            String receipt = data.get("receipt").toString();

            RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount);
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", receipt);

            Order order = razorpayClient.orders.create(orderRequest);

            System.out.println("Order created: " + order.toString());
            return order.toString();

        } catch (RazorpayException e) {
            System.err.println("RazorpayException: " + e.getMessage());
            return "Error creating order: " + e.getMessage();
        }
    }
    
    // === ENDPOINT 2: VERIFY PAYMENT ===
    @PostMapping("/verify-payment")
    public ResponseEntity<String> verifyPayment(@RequestBody Map<String, String> paymentDetails) {
        
        System.out.println("--- Verify Payment API hit ---");
        
        String razorpayOrderId = paymentDetails.get("razorpay_order_id");
        String razorpayPaymentId = paymentDetails.get("razorpay_payment_id");
        String razorpaySignature = paymentDetails.get("razorpay_signature");
        
        try {
            // 1. Create a JSONObject with the payment details
            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", razorpayOrderId);
            options.put("razorpay_payment_id", razorpayPaymentId);
            options.put("razorpay_signature", razorpaySignature);

            // 2. Use the correct method signature
            // This method returns `void` and will throw an exception if the
            // signature verification fails.
            Utils.verifyPaymentSignature(options, keySecret);
            
            // 3. If no exception is thrown, the signature is valid.
            System.out.println("Payment Verified Successfully!");
            return ResponseEntity.ok("Payment verified successfully");

        } catch (RazorpayException e) {
            // 4. If an exception is thrown, the signature is invalid.
            System.err.println("Signature verification failed! " + e.getMessage());
            return ResponseEntity.status(400).body("Payment verification failed: Invalid signature");
        }
    }
}